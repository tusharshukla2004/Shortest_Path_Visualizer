function GraphInput({ graph, setGraph }) {
  return (
    <>
      <label>Enter Graph (JSON Format):</label>
      <textarea
        value={graph}
        onChange={(e) => setGraph(e.target.value)}
        placeholder='{"A":{"B":1,"C":4},"B":{"C":2,"D":5},"C":{"D":1},"D":{}}'
      />
    </>
  )
}

export default GraphInput
