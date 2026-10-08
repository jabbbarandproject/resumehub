import { BsPlusCircle, BsTrash3 } from 'react-icons/bs';
import Field from './Field.jsx';

export default function EntryList({ section, items, fields, label, addLabel, dispatch }) {
  return (
    <div>
      {items.map((item, i) => (
        <div className="entry" key={item.id}>
          <div className="entry-head">
            <span className="chip">{label} {i + 1}</span>
            <button
              type="button" className="icon-btn danger" aria-label={`Remove ${label} ${i + 1}`}
              onClick={() => dispatch({ type: 'remove', section, id: item.id })}
            >
              <BsTrash3 aria-hidden="true" />
            </button>
          </div>
          <div className="grid-12">
            {fields.map((f) => (
              <div key={f.key} className={`span-${f.span}`}>
                <Field
                  field={f} value={item[f.key]}
                  onChange={(value) => dispatch({ type: 'update', section, id: item.id, key: f.key, value })}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-soft btn-sm" onClick={() => dispatch({ type: 'add', section })}>
        <BsPlusCircle aria-hidden="true" /> {addLabel}
      </button>
    </div>
  );
}
