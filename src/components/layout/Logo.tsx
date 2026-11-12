type LogoProps = { className?: string };

export function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`font-display text-xl font-extrabold tracking-tight text-brand ${className}`}>
      Ryze Coffee
    </span>
  );
}
