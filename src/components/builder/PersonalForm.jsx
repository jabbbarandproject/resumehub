const FIELDS = [
  { key: 'fullName', label: 'Full name', placeholder: 'Jane Doe' },
  { key: 'jobTitle', label: 'Target job title', placeholder: 'Senior Product Manager' },
  { key: 'email', label: 'Email', placeholder: 'jane.doe@email.com', type: 'email' },
  { key: 'phone', label: 'Phone', placeholder: '+1 555 123 4567' },
  { key: 'location', label: 'Location', placeholder: 'Austin, TX' },
  { key: 'linkedin', label: 'LinkedIn or portfolio URL', placeholder: 'linkedin.com/in/janedoe' },
];

export default function PersonalForm({ personal, dispatch }) {
  return (
    <div className="grid-12">
      {FIELDS.map((f) => (
        <div className="span-6" key={f.key}>
          <label className="label" htmlFor={f.key}>{f.label}</label>
          <input
            id={f.key} type={f.type || 'text'} className="input" placeholder={f.placeholder}
            value={personal[f.key]} autoComplete="off"
            onChange={(e) => dispatch({ type: 'personal', key: f.key, value: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
