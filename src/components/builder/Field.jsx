export default function Field({ field, value, onChange }) {
  const { type, placeholder, label, rows, help } = field;

  if (type === 'checkbox') {
    return (
      <label className="check">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <span>{label}</span>
      </label>
    );
  }
  if (type === 'textarea') {
    return (
      <>
        <textarea
          className="input" rows={rows || 3} value={value || ''} placeholder={placeholder}
          aria-label={placeholder.split('\n')[0]} onChange={(e) => onChange(e.target.value)}
        />
        {help && <div className="help">{help}</div>}
      </>
    );
  }
  return (
    <input
      type="text" className="input" value={value || ''} placeholder={placeholder}
      aria-label={placeholder} onChange={(e) => onChange(e.target.value)}
    />
  );
}
