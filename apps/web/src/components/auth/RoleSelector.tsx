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
            className={`auth-role-card-dark${selected ? ' selected' : ''}`}
          >
            <Icon className="role-icon" />
            <p className="role-label">{label}</p>
            <p className="role-desc">{description}</p>
          </button>
        );
      })}
    </div>
  );
}
