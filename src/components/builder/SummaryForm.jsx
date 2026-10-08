export default function SummaryForm({ summary, dispatch }) {
  return (
    <>
      <label className="label" htmlFor="summary">Summary</label>
      <textarea
        id="summary" className="input" rows={4} value={summary}
        placeholder="Results-driven product manager with 7+ years of experience leading cross-functional teams..."
        onChange={(e) => dispatch({ type: 'summary', value: e.target.value })}
      />
      <div className="help">Two to four sentences: years of experience, specialty and one key achievement.</div>
    </>
  );
}
