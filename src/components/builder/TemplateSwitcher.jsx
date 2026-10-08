import { BsPalette, BsShieldCheck, BsTextCenter, BsTextLeft, BsTextRight, BsArrowCounterclockwise } from 'react-icons/bs';
import Segmented from './Segmented.jsx';
import TemplateThumb from '../common/TemplateThumb.jsx';
import { ACCENTS, DEFAULT_SETTINGS, FONTS, TEMPLATES } from '../../data/layoutSpec';

const Control = ({ label, value, children }) => (
  <div className="control">
    <div className="control-head"><span className="label">{label}</span>{value && <span className="small muted">{value}</span>}</div>
    {children}
  </div>
);

export default function CustomizePanel({ resume, dispatch }) {
  const s = resume.settings;
  const set = (key) => (value) => dispatch({ type: 'setting', key, value });

  return (
    <div className="card">
      <h2 className="card-title"><BsPalette aria-hidden="true" /> Template and design</h2>

      <Control label={`Template (${TEMPLATES.length})`}>
        <div className="tpl-grid" role="radiogroup" aria-label="Resume template">
          {TEMPLATES.map((t) => (
            <button
              key={t.id} type="button" role="radio" aria-checked={resume.template === t.id}
              className={`tpl-card ${resume.template === t.id ? 'is-active' : ''}`}
              onClick={() => dispatch({ type: 'template', value: t.id })}
            >
              <TemplateThumb settings={{ ...DEFAULT_SETTINGS, ...t.settings }} />
              <strong>{t.name}</strong>
              <span className="muted small">{t.note}</span>
            </button>
          ))}
        </div>
        <div className="help ats-note">
          <BsShieldCheck aria-hidden="true" /> Every template is ATS-friendly: one column, real text, standard fonts, no tables, images or icons.
        </div>
      </Control>

      <Control label="Accent color" value={s.accent.toUpperCase()}>
        <div className="swatches">
          {ACCENTS.map((a) => (
            <button
              key={a.value} type="button" title={a.name} aria-label={a.name}
              className={`swatch ${s.accent.toLowerCase() === a.value ? 'is-active' : ''}`}
              style={{ background: a.value }} onClick={() => set('accent')(a.value)}
            />
          ))}
          <label className="swatch-custom" title="Custom color">
            <input type="color" value={s.accent} aria-label="Custom accent color" onChange={(e) => set('accent')(e.target.value)} />
            <span>Custom</span>
          </label>
        </div>
      </Control>

      <Control label="Font">
        <Segmented
          label="Font family" value={s.fontFamily} onChange={set('fontFamily')}
          options={Object.entries(FONTS).map(([value, f]) => ({ value, label: f.label }))}
        />
        <div className="help">{FONTS[s.fontFamily].sample}. Built into every PDF reader, so ATS software can always read it.</div>
      </Control>

      <div className="grid-12">
        <div className="span-6">
          <Control label="Font size" value={`${s.fontSize} pt`}>
            <input type="range" className="range" min="9" max="12" step="0.5" value={s.fontSize} aria-label="Font size" onChange={(e) => set('fontSize')(Number(e.target.value))} />
          </Control>
        </div>
        <div className="span-6">
          <Control label="Line spacing" value={s.lineHeight.toFixed(2)}>
            <input type="range" className="range" min="1.15" max="1.6" step="0.05" value={s.lineHeight} aria-label="Line spacing" onChange={(e) => set('lineHeight')(Number(e.target.value))} />
          </Control>
        </div>
      </div>

      <Control label="Header alignment (name and contact)">
        <Segmented label="Header alignment" value={s.headerAlign} onChange={set('headerAlign')} options={[
          { value: 'left', label: 'Left', icon: BsTextLeft }, { value: 'center', label: 'Center', icon: BsTextCenter }, { value: 'right', label: 'Right', icon: BsTextRight },
        ]} />
      </Control>

      <div className="grid-12">
        <div className="span-6">
          <Control label="Name">
            <Segmented label="Name case" value={s.nameUpper ? 'upper' : 'normal'} onChange={(v) => set('nameUpper')(v === 'upper')} options={[
              { value: 'normal', label: 'Aa' }, { value: 'upper', label: 'AA' },
            ]} />
          </Control>
        </div>
        <div className="span-6">
          <Control label="Line under header">
            <Segmented label="Header line" value={s.headerRule ? 'on' : 'off'} onChange={(v) => set('headerRule')(v === 'on')} options={[
              { value: 'on', label: 'On' }, { value: 'off', label: 'Off' },
            ]} />
          </Control>
        </div>
      </div>

      <Control label="Section heading style">
        <Segmented label="Heading style" value={s.headingStyle} onChange={set('headingStyle')} options={[
          { value: 'rule', label: 'Line' }, { value: 'none', label: 'Plain' }, { value: 'band', label: 'Band' }, { value: 'bar', label: 'Side bar' },
        ]} />
      </Control>

      <Control label="Section heading alignment">
        <Segmented label="Section heading alignment" value={s.headingAlign} onChange={set('headingAlign')} options={[
          { value: 'left', label: 'Left', icon: BsTextLeft }, { value: 'center', label: 'Center', icon: BsTextCenter },
        ]} />
      </Control>

      <div className="grid-12">
        <div className="span-6">
          <Control label="Margins">
            <Segmented label="Margins" value={s.margin} onChange={set('margin')} options={[
              { value: 'narrow', label: 'Narrow' }, { value: 'normal', label: 'Normal' }, { value: 'wide', label: 'Wide' },
            ]} />
          </Control>
        </div>
        <div className="span-6">
          <Control label="Page size">
            <Segmented label="Page size" value={s.pageSize} onChange={set('pageSize')} options={[
              { value: 'a4', label: 'A4' }, { value: 'letter', label: 'Letter' },
            ]} />
          </Control>
        </div>
      </div>

      <Control label="Section order">
        <Segmented label="Section order" value={s.sectionOrder} onChange={set('sectionOrder')} options={[
          { value: 'standard', label: 'Standard' }, { value: 'graduate', label: 'Education first' },
        ]} />
        <div className="help">Education first suits graduates and career changers with limited experience.</div>
      </Control>

      <button type="button" className="btn btn-soft btn-sm" onClick={() => dispatch({ type: 'resetSettings' })}>
        <BsArrowCounterclockwise aria-hidden="true" /> Reset design to template
      </button>
    </div>
  );
}
