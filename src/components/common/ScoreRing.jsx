export default function ScoreRing({ value, size = 96, label = 'score' }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const tone = value >= 80 ? 'good' : value >= 50 ? 'mid' : 'low';
  return (
    <div className={`score-ring tone-${tone}`} style={{ width: size, height: size }} role="img" aria-label={`ATS ${label} ${value} percent`}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} className="ring-bg" />
        <circle
          cx="50" cy="50" r={r} className="ring-fg"
          strokeDasharray={c} strokeDashoffset={c - (c * value) / 100}
        />
      </svg>
      <span className="ring-value">{value}</span>
    </div>
  );
}
