import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const Icon = item.icon;
        return (
          <section key={item.id || i} className={`acc-item ${isOpen ? 'is-open' : ''}`}>
            <h3>
              <button
                type="button"
                className="acc-btn"
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {Icon && <Icon aria-hidden="true" className="acc-icon" />}
                <span>{item.title}</span>
                <BsChevronDown aria-hidden="true" className="acc-chevron" />
              </button>
            </h3>
            {isOpen && (
              <div id={`acc-panel-${i}`} className="acc-body">
                {item.content}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
