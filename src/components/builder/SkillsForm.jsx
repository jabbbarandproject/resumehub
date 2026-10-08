import { useState } from 'react';
import { BsPlus, BsXCircleFill } from 'react-icons/bs';

export default function SkillsForm({ skills, dispatch }) {
  const [value, setValue] = useState('');

  const add = () => {
    const v = value.trim();
    if (v) dispatch({ type: 'addSkill', value: v });
    setValue('');
  };

  return (
    <>
      <label className="label" htmlFor="skillInput">Add a skill and press Enter</label>
      <div className="inline-add">
        <input
          id="skillInput" className="input" value={value} placeholder="e.g. SQL, Agile, Figma, Python"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button type="button" className="btn btn-soft" onClick={add} aria-label="Add skill"><BsPlus /></button>
      </div>
      <div className="tags">
        {skills.map((s) => (
          <span className="tag" key={s}>
            {s}
            <button type="button" aria-label={`Remove ${s}`} onClick={() => dispatch({ type: 'removeSkill', value: s })}>
              <BsXCircleFill aria-hidden="true" />
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
