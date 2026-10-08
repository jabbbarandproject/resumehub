export default function Segmented({ label, value, options, onChange }) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((o) => {
        const Icon = o.icon;
        return (
          <button
            key={o.value} type="button" role="radio" aria-checked={value === o.value}
            className={value === o.value ? 'is-active' : ''} onClick={() => onChange(o.value)}
          >
            {Icon && <Icon aria-hidden="true" />} {o.label}
          </button>
        );
      })}
    </div>
  );
}
