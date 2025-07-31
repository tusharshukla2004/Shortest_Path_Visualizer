function ResultBox({ path = [], distance }) {
  if (!Array.isArray(path) || path.length === 0) {
    return <div className="result-box">No path found.</div>;
  }

  return (
    <div className="result-box">
      <h3>✅ Shortest Paths</h3>
      {path.map((p, idx) => (
        <p key={idx}><strong>Path {idx + 1}:</strong> {p.join(' → ')}</p>
      ))}
      <p><strong>Total Distance:</strong> {distance}</p>
    </div>
  );
}

export default ResultBox;
