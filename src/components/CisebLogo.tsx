import React from 'react';

interface CisebLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
}

export const CisebLogo: React.FC<CisebLogoProps> = ({
  className = "h-14 w-auto",
  variant = 'light',
}) => {
  const isLight = variant === 'light';

  // Dynamic color palette tailored for contrast and elegance
  const strokeColor = isLight ? '#38BDF8' : '#000000';
  const subtitleColor = isLight ? '#E0F2FE' : '#000000';
  const starColor = isLight ? '#BAE6FD' : '#000000';
  const dividerColor = isLight ? 'rgba(186, 230, 253, 0.6)' : 'rgba(0, 0, 0, 0.75)';

  const brigendsFont = "'Brigends Expanded', 'Brigends', 'Syne', 'Orbitron', 'Montserrat', sans-serif";
  const arialFont = "Arial, Helvetica, sans-serif";

  const gradId = `cisebTextGrad_${variant}`;
  const glowId = `cisebLogoGlow_${variant}`;
  const textColor = isLight ? `url(#${gradId})` : '#000000';

  return (
    <svg
      viewBox="0 0 640 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo CISEB - Centro de Inovação e Sustentabilidade da Educação Básica"
    >
      <defs>
        {isLight && (
          <>
            {/* Soft drop shadow filter for crisp text definition */}
            <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2.5"
                floodColor="#0284C7"
                floodOpacity="0.45"
              />
            </filter>

            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
          </>
        )}
      </defs>

      {/* Main Title: CISEB in Brigends Expanded */}
      <g filter={isLight ? `url(#${glowId})` : undefined}>
        {/* Solid fill */}
        <text
          x="315"
          y="114"
          textAnchor="middle"
          fill={textColor}
          fontFamily={brigendsFont}
          fontSize="106"
          fontWeight="900"
          letterSpacing="6"
        >
          CISEB
        </text>
      </g>

      {/* Divider with central Star */}
      <g transform="translate(0, 138)">
        {/* Left Horizontal Line */}
        <line
          x1="60"
          y1="0"
          x2="295"
          y2="0"
          stroke={dividerColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* 5-pointed Star in center */}
        <polygon
          points="315,-7 317.5,-1.5 323.5,-1.5 318.5,2 320.5,7.5 315,4 309.5,7.5 311.5,2 306.5,-1.5 312.5,-1.5"
          fill={starColor}
          stroke={strokeColor}
          strokeWidth="0.75"
        />

        {/* Right Horizontal Line */}
        <line
          x1="335"
          y1="0"
          x2="570"
          y2="0"
          stroke={dividerColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* Subtitles in ARIAL as requested */}
      {/* Subtitle Line 1: CENTRO DE INOVAÇÃO E SUSTENTABILIDADE */}
      <text
        x="315"
        y="168"
        textAnchor="middle"
        fill={subtitleColor}
        fontFamily={arialFont}
        fontSize="20.5"
        fontWeight="700"
        letterSpacing="2.8"
      >
        CENTRO DE INOVAÇÃO E SUSTENTABILIDADE
      </text>

      {/* Subtitle Line 2: DA EDUCAÇÃO BÁSICA */}
      <text
        x="315"
        y="196"
        textAnchor="middle"
        fill={subtitleColor}
        fontFamily={arialFont}
        fontSize="20.5"
        fontWeight="700"
        letterSpacing="4.2"
      >
        DA EDUCAÇÃO BÁSICA
      </text>
    </svg>
  );
};
