import React from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  href,
  target,
  rel,
  className = '',
  disabled = false
}) => {
  const buttonClasses = `
    bg-white text-black rounded-full text-sm font-semibold px-5 py-2.5
    cursor-pointer transition-all duration-300 ease-in-out
    border border-black shadow-none
    hover:transform hover:-translate-y-1 hover:-translate-x-0.5
    hover:shadow-[2px_5px_0_0_black]
    active:transform active:translate-y-0.5 active:translate-x-0.5
    active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:transform-none disabled:hover:shadow-none
    ${className}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
