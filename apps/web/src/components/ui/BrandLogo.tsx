import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** 'full' shows wordmark+tagline image; 'icon' shows brand mark only */
  type?: 'full' | 'icon';
}

const iconSizes = { sm: 28, md: 36, lg: 52 };

export function BrandLogo({ variant = 'dark', size = 'md', type = 'full' }: BrandLogoProps) {
  const dim = iconSizes[size];

  if (type === 'icon') {
    return (
      <Image
        src="/images/iqra-vista-icon.svg"
        alt="Iqra Vista"
        width={dim}
        height={dim}
        className="object-contain"
        priority
      />
    );
  }

  if (size === 'sm') {
    // Compact: icon + text inline (no tagline)
    const textColor = variant === 'light' ? '#FFFFFF' : '#061B4F';
    return (
      <div className="flex items-center gap-2">
        <Image
          src="/images/iqra-vista-icon.svg"
          alt=""
          width={dim}
          height={dim}
          className="object-contain"
          aria-hidden="true"
          priority
        />
        <span
          className="font-bold tracking-tight"
          style={{ color: textColor, fontSize: 14 }}
        >
          IQRA VISTA
        </span>
      </div>
    );
  }

  // Full logo image (md / lg)
  const logoHeight = size === 'lg' ? 64 : 44;
  const logoWidth = size === 'lg' ? 256 : 176;

  // On dark backgrounds wrap in a subtle container so the logo remains readable
  if (variant === 'light') {
    return (
      <div className="rounded-xl px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <Image
          src="/images/iqra-vista-logo.svg"
          alt="Iqra Vista"
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <Image
      src="/images/iqra-vista-logo.svg"
      alt="Iqra Vista"
      width={logoWidth}
      height={logoHeight}
      className="object-contain"
      priority
    />
  );
}
