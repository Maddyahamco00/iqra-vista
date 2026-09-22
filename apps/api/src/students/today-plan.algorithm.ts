export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type PlannerLesson = {
  id: string;
  title: string;
  skillId: string;
  skillName: string;
  level: Level;
  order: number;
  estimatedMinutes: number;
};

export type WeakArea = { skillId: string; skillName: string; score: number };

export type LastCompleted = { id: string; title: string; order: number } | null;

export type PlannerInput = {
  studentId: string;
  date: string;
  level: Level | number | string | null;
  weakAreas: WeakArea[];
  lastCompletedLesson: LastCompleted;
  lessons: PlannerLesson[];
  completedLessonIds: string[];
};

export type PlanItemType = 'REVIEW' | 'CONTINUE' | 'PRACTICE';

export type GeneratedPlanItem = {
  id: string;
  type: PlanItemType;
  title: string;
  skillId: string;
  skillName: string;
  level: Level;
  estimatedMinutes: number;
  reason: string;
};

export type GeneratedTodayPlan = {
  studentId: string;
  date: string;
  level: Level;
  weakAreas: WeakArea[];
  lastCompletedLesson: LastCompleted;
  items: GeneratedPlanItem[];
  summary: {
    itemCount: number;
    reviewCount: number;
    continueCount: number;
    practiceCount: number;
    totalMinutes: number;
  };
};

const LEVEL_RANK: Record<Level, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
};

const DAILY_CAP: Record<Level, number> = {
  BEGINNER: 3,
  INTERMEDIATE: 4,
  ADVANCED: 5,
};

const WEAK_THRESHOLD = 70;

export function normalizeLevel(raw: PlannerInput['level']): Level {
  if (raw === 'BEGINNER' || raw === 'INTERMEDIATE' || raw === 'ADVANCED') return raw;
  const n = typeof raw === 'number' ? raw : Number(raw);
  if (Number.isFinite(n)) {
    if (n <= 4) return 'BEGINNER';
    if (n <= 8) return 'INTERMEDIATE';
    return 'ADVANCED';
  }
  return 'BEGINNER';
}

export function selectWeakAreas(areas: WeakArea[]): WeakArea[] {
  return areas
    .filter((a) => a.score < WEAK_THRESHOLD)
    .sort((a, b) => a.score - b.score || a.skillName.localeCompare(b.skillName))
    .slice(0, 3);
}

function eligibleLessons(lessons: PlannerLesson[], level: Level): PlannerLesson[] {
  const max = LEVEL_RANK[level];
  return [...lessons]
    .filter((l) => LEVEL_RANK[l.level] <= max)
    .sort(
      (a, b) =>
        LEVEL_RANK[a.level] - LEVEL_RANK[b.level] ||
        a.order - b.order ||
        a.title.localeCompare(b.title),
    );
}

function toItem(lesson: PlannerLesson, type: PlanItemType, reason: string): GeneratedPlanItem {
  return {
    id: lesson.id,
    type,
    title: lesson.title,
    skillId: lesson.skillId,
    skillName: lesson.skillName,
    level: lesson.level,
    estimatedMinutes: lesson.estimatedMinutes,
    reason,
  };
}

function pickReviewLesson(
  skillId: string,
  eligible: PlannerLesson[],
  completedIds: Set<string>,
): PlannerLesson | undefined {
  const forSkill = eligible.filter((l) => l.skillId === skillId);
  return forSkill.find((l) => completedIds.has(l.id)) ?? forSkill[0];
}

function pickPracticeLesson(
  skillId: string,
  eligible: PlannerLesson[],
  completedIds: Set<string>,
  used: Set<string>,
): PlannerLesson | undefined {
  const forSkill = eligible.filter((l) => l.skillId === skillId);
  const incomplete = forSkill.find((l) => !completedIds.has(l.id) && !used.has(l.id));
  if (incomplete) return incomplete;
  return forSkill.find((l) => !used.has(l.id));
}

export function generateTodayPlan(input: PlannerInput): GeneratedTodayPlan {
  const level = normalizeLevel(input.level);
  const weakAreas = selectWeakAreas(input.weakAreas);
  const eligible = eligibleLessons(input.lessons, level);
  const completedIds = new Set(input.completedLessonIds);
  const used = new Set<string>();
  const items: GeneratedPlanItem[] = [];
  const cap = DAILY_CAP[level];

  const push = (lesson: PlannerLesson | undefined, type: PlanItemType, reason: string) => {
    if (!lesson || used.has(lesson.id) || items.length >= cap) return;
    used.add(lesson.id);
    items.push(toItem(lesson, type, reason));
  };

  // Slot A — REVIEW
  if (weakAreas[0]) {
    const review = pickReviewLesson(weakAreas[0].skillId, eligible, completedIds);
    push(
      review,
      'REVIEW',
      `Weak area: ${weakAreas[0].skillName} (score ${weakAreas[0].score})`,
    );
  }

  // Slot B — CONTINUE
  const incomplete = eligible.filter((l) => !completedIds.has(l.id));
  const last = input.lastCompletedLesson;
  const next = last
    ? incomplete.find((l) => l.order > last.order)
    : incomplete[0];
  push(
    next,
    'CONTINUE',
    last ? `Next after "${last.title}"` : 'First lesson at your level',
  );

  // Slot C+ — PRACTICE remaining weak skills
  for (const area of weakAreas.slice(1)) {
    if (items.length >= cap) break;
    const practice = pickPracticeLesson(area.skillId, eligible, completedIds, used);
    push(practice, 'PRACTICE', `Practice: ${area.skillName} (score ${area.score})`);
  }

  // Fill remaining cap with further CONTINUE lessons
  for (const lesson of incomplete) {
    if (items.length >= cap) break;
    push(lesson, 'CONTINUE', last ? `Next after "${last.title}"` : 'First lesson at your level');
  }

  return {
    studentId: input.studentId,
    date: input.date,
    level,
    weakAreas,
    lastCompletedLesson: input.lastCompletedLesson,
    items,
    summary: {
      itemCount: items.length,
      reviewCount: items.filter((i) => i.type === 'REVIEW').length,
      continueCount: items.filter((i) => i.type === 'CONTINUE').length,
      practiceCount: items.filter((i) => i.type === 'PRACTICE').length,
      totalMinutes: items.reduce((sum, i) => sum + i.estimatedMinutes, 0),
    },
  };
}
