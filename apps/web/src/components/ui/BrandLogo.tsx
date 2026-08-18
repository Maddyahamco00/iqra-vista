interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 28, md: 36, lg: 48 };

export function BrandLogo({ variant = 'dark', size = 'md' }: BrandLogoProps) {
  const dim = sizes[size];
  const textColor = variant === 'light' ? '#FFFFFF' : '#0A192F';
  const accentColor = '#D4AF37';
  const primaryColor = '#0F766E';

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Octagon base */}
        <polygon
          points="17,4 31,4 44,17 44,31 31,44 17,44 4,31 4,17"
          fill={primaryColor}
        />
        {/* Inner star accent */}
        <polygon
          points="24,10 26.5,20 36,18 29,25 36,32 26.5,30 24,40 21.5,30 12,32 19,25 12,18 21.5,20"
          fill={accentColor}
          opacity="0.9"
        />
        {/* Center dot */}
        <circle cx="24" cy="25" r="3" fill="white" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className="font-heading font-bold tracking-tight"
          style={{ color: textColor, fontSize: size === 'sm' ? 14 : size === 'md' ? 18 : 24 }}
        >
          IQRA VISTA
        </span>
        {size !== 'sm' && (
          <span
            className="font-sans tracking-widest uppercase"
            style={{ color: accentColor, fontSize: size === 'md' ? 8 : 10 }}
          >
            Qur&apos;an Learning
          </span>
        )}
      </div>
    </div>
  );
}
