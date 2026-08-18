import { GraduationCap, Users } from 'lucide-react';
import type { UserRole } from '@/types/auth';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string; description: string; Icon: typeof GraduationCap }[] = [
  { value: 'student', label: 'Student', description: 'I want to learn Quran', Icon: GraduationCap },
  { value: 'parent', label: 'Parent', description: 'I want to track my child', Icon: Users },
];

export function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map(({ value: roleValue, label, description, Icon }) => {
        const selected = value === roleValue;
        return (
          <button
            key={roleValue}
            type="button"
            onClick={() => onChange(roleValue)}
            className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              selected
                ? 'border-iqra-primary bg-iqra-primary/5'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <Icon
              className={`w-8 h-8 mb-2 ${selected ? 'text-iqra-primary' : 'text-slate-400'}`}
            />
            <p className={`font-semibold text-sm ${selected ? 'text-iqra-primary' : 'text-slate-700'}`}>
              {label}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{description}</p>
          </button>
        );
      })}
    </div>
  );
}
