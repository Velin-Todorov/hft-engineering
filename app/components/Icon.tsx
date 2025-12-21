interface IconProps {
  className?: string;
  children: React.ReactNode;
}

export const Icon = ({ className = "w-4 h-4", children }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    {children}
  </svg>
);