import {
  generateTodayPlan,
  normalizeLevel,
  selectWeakAreas,
  PlannerLesson,
  PlannerInput,
  WeakArea,
  Level,
} from './today-plan.algorithm';

const L = (
  partial: Partial<PlannerLesson> & Pick<PlannerLesson, 'id' | 'title' | 'skillId' | 'order'>,
): PlannerLesson => ({
  skillName: partial.skillId,
  level: 'BEGINNER',
  estimatedMinutes: 15,
  ...partial,
});

describe('Today Plan Algorithm', () => {
  describe('normalizeLevel', () => {
    it('normalizes various inputs correctly', () => {
      expect(normalizeLevel(3)).toBe('BEGINNER');
      expect(normalizeLevel(6)).toBe('INTERMEDIATE');
      expect(normalizeLevel(10)).toBe('ADVANCED');
      expect(normalizeLevel(null)).toBe('BEGINNER');
      expect(normalizeLevel('ADVANCED')).toBe('ADVANCED');
    });
  });

  describe('selectWeakAreas', () => {
    it('filters weak areas (< 70), sorts by score, and caps at 3', () => {
      const input: WeakArea[] = [
        { skillId: 's1', skillName: 'S1', score: 70 }, // Not weak
        { skillId: 's2', skillName: 'S2', score: 69 }, // Weak
        { skillId: 's3', skillName: 'S3', score: 30 }, // Very weak
        { skillId: 's4', skillName: 'S4', score: 50 }, // Weak
        { skillId: 's5', skillName: 'S5', score: 40 }, // Weak
      ];
      const output = selectWeakAreas(input);
      expect(output).toHaveLength(3);
      expect(output[0].skillId).toBe('s3'); // score 30
      expect(output[1].skillId).toBe('s5'); // score 40
      expect(output[2].skillId).toBe('s4'); // score 50
    });
  });

  describe('generateTodayPlan', () => {
    const baseInput: PlannerInput = {
      studentId: '1',
      date: '2026-09-22',
      level: 'BEGINNER',
      weakAreas: [],
      lastCompletedLesson: null,
      lessons: [],
      completedLessonIds: [],
    };

    it('New student (no last lesson, no weak areas)', () => {
      const input: PlannerInput = {
        ...baseInput,
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
          L({ id: 'l2', title: 'L2', skillId: 's1', order: 2 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items[0]).toMatchObject({
        id: 'l1',
        type: 'CONTINUE',
        reason: 'First lesson at your level',
      });
      // BEGINNER cap fills with CONTINUE up to 3
      expect(plan.items).toHaveLength(2);
      expect(plan.items[1].id).toBe('l2');
    });

    it('After completing lesson order=2', () => {
      const input: PlannerInput = {
        ...baseInput,
        completedLessonIds: ['l1', 'l2'],
        lastCompletedLesson: { id: 'l2', title: 'L2', order: 2 },
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
          L({ id: 'l2', title: 'L2', skillId: 's1', order: 2 }),
          L({ id: 'l3', title: 'L3', skillId: 's1', order: 3 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items[0]).toMatchObject({
        id: 'l3',
        type: 'CONTINUE',
        reason: 'Next after "L2"',
      });
    });

    it('One weak area (Fractions 40) + last lesson', () => {
      const input: PlannerInput = {
        ...baseInput,
        completedLessonIds: ['l1'],
        lastCompletedLesson: { id: 'l1', title: 'L1', order: 1 },
        weakAreas: [{ skillId: 'Fractions', skillName: 'Fractions', score: 40 }],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 'Fractions', order: 1 }),
          L({ id: 'l2', title: 'L2', skillId: 'Geometry', order: 2 }),
          L({ id: 'l3', title: 'L3', skillId: 'Geometry', order: 3 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items[0]).toMatchObject({
        id: 'l1',
        type: 'REVIEW',
        reason: 'Weak area: Fractions (score 40)',
      });
      expect(plan.items[1]).toMatchObject({
        id: 'l2',
        type: 'CONTINUE',
        reason: 'Next after "L1"',
      });
    });

    it('Two weak areas: REVIEW weakest, CONTINUE next, PRACTICE second-weakest', () => {
      const input: PlannerInput = {
        ...baseInput,
        completedLessonIds: ['l1'],
        lastCompletedLesson: { id: 'l1', title: 'L1', order: 1 },
        weakAreas: [
          { skillId: 'S1', skillName: 'Skill 1', score: 30 },
          { skillId: 'S3', skillName: 'Skill 3', score: 50 },
        ],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 'S1', order: 1 }), // REVIEW
          L({ id: 'l2', title: 'L2', skillId: 'S2', order: 2 }), // CONTINUE
          L({ id: 'l3', title: 'L3', skillId: 'S3', order: 3 }), // PRACTICE
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items[0]).toMatchObject({ id: 'l1', type: 'REVIEW' });
      expect(plan.items[1]).toMatchObject({ id: 'l2', type: 'CONTINUE' });
      expect(plan.items[2]).toMatchObject({ id: 'l3', type: 'PRACTICE' });
    });

    it('BEGINNER cap: never more than 3 items even if 5 weak areas + many lessons', () => {
      const input: PlannerInput = {
        ...baseInput,
        level: 'BEGINNER',
        weakAreas: [
          { skillId: 's1', skillName: 's1', score: 10 },
          { skillId: 's2', skillName: 's2', score: 20 },
          { skillId: 's3', skillName: 's3', score: 30 },
        ],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
          L({ id: 'l2', title: 'L2', skillId: 's2', order: 2 }),
          L({ id: 'l3', title: 'L3', skillId: 's3', order: 3 }),
          L({ id: 'l4', title: 'L4', skillId: 's4', order: 4 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items).toHaveLength(3);
    });

    it('ADVANCED cap: 5 items when enough candidates exist', () => {
      const input: PlannerInput = {
        ...baseInput,
        level: 'ADVANCED',
        lessons: [
          L({ id: '1', title: '1', skillId: 's1', order: 1 }),
          L({ id: '2', title: '2', skillId: 's1', order: 2 }),
          L({ id: '3', title: '3', skillId: 's1', order: 3 }),
          L({ id: '4', title: '4', skillId: 's1', order: 4 }),
          L({ id: '5', title: '5', skillId: 's1', order: 5 }),
          L({ id: '6', title: '6', skillId: 's1', order: 6 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items).toHaveLength(5);
    });

    it('Lesson above student level is never assigned', () => {
      const input: PlannerInput = {
        ...baseInput,
        level: 'BEGINNER',
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1, level: 'ADVANCED' }),
          L({ id: 'l2', title: 'L2', skillId: 's1', order: 2, level: 'BEGINNER' }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].id).toBe('l2');
    });

    it('Same lesson id never appears twice', () => {
      const input: PlannerInput = {
        ...baseInput,
        weakAreas: [{ skillId: 's1', skillName: 's1', score: 40 }],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items).toHaveLength(1);
      expect(plan.items[0].type).toBe('REVIEW');
    });

    it('Completed-all-lessons + no weak areas: items []', () => {
      const input: PlannerInput = {
        ...baseInput,
        completedLessonIds: ['l1'],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
        ],
      };
      const plan = generateTodayPlan(input);
      expect(plan.items).toHaveLength(0);
    });

    it('Same PlannerInput twice -> deep-equal output (determinism)', () => {
      const input: PlannerInput = {
        ...baseInput,
        level: 'INTERMEDIATE',
        weakAreas: [{ skillId: 's1', skillName: 's1', score: 50 }],
        lessons: [
          L({ id: 'l1', title: 'L1', skillId: 's1', order: 1 }),
          L({ id: 'l2', title: 'L2', skillId: 's2', order: 2 }),
          L({ id: 'l3', title: 'L3', skillId: 's3', order: 3 }),
        ],
      };
      const plan1 = generateTodayPlan(input);
      const plan2 = generateTodayPlan(input);
      expect(plan1).toEqual(plan2);
    });
  });
});
