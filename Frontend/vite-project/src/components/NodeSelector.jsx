import './NodeSelector.css';
function NodeSelector({ start, setStart, end, setEnd }) {
  return (
    <div className="inputs">
      <input
        type="text"
        placeholder="Start Node"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Node"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
    </div>
  )
}

export default NodeSelector
