function ResultBox({ path, distance }) {
  return (
    <div className="result-box">
      <h3>✅ Shortest Path</h3>
      <p><strong>Path:</strong> {path.join(' → ')}</p>
      <p><strong>Total Distance:</strong> {distance}</p>
    </div>
  )
}

export default ResultBox
