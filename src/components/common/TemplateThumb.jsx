// Tiny CSS illustration of a template, drawn from its real settings.
export default function TemplateThumb({ settings }) {
  const s = settings;
  return (
    <div className="thumb" style={{ '--a': s.accent }} aria-hidden="true">
      <div className={`t-name align-${s.headerAlign}`} />
      <div className={`t-sub align-${s.headerAlign}`} />
      {s.headerRule && <div className="t-rule" />}
      {[0, 1].map((i) => (
        <div key={i} className="t-block">
          <div className={`t-head ${s.headingStyle} align-${s.headingAlign}`} />
          <div className="t-line" />
          <div className="t-line short" />
        </div>
      ))}
    </div>
  );
}
