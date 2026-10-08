import Accordion from './Accordion.jsx';

export default function FaqList({ items, defaultOpen = -1 }) {
  return <Accordion defaultOpen={defaultOpen} items={items.map((f) => ({ id: f.q, title: f.q, content: <p className="muted">{f.a}</p> }))} />;
}
