export default function Seal({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#1B3F8F" />
      <circle cx="32" cy="32" r="25.5" fill="none" stroke="#FBF8EF" strokeWidth="1.5" strokeDasharray="2 3" />
      <text
        x="32"
        y="41"
        textAnchor="middle"
        fontFamily="var(--font-display), Impact, sans-serif"
        fontWeight="700"
        fontSize="25"
        letterSpacing="1"
        fill="#FBF8EF"
      >
        ETS
      </text>
    </svg>
  );
}
