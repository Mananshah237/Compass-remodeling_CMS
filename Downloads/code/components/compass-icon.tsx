export function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="50" cy="50" r="5" fill="currentColor" />
      <path d="M50 10 L55 40 L50 35 L45 40 Z" fill="currentColor" />
      <path d="M50 90 L45 60 L50 65 L55 60 Z" fill="currentColor" opacity="0.5" />
      <path d="M10 50 L40 45 L35 50 L40 55 Z" fill="currentColor" opacity="0.5" />
      <path d="M90 50 L60 55 L65 50 L60 45 Z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}
