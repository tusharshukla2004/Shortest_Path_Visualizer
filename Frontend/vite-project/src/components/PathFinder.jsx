import { useState } from 'react'
import axios from 'axios'
import GraphInput from './GraphInput'
import NodeSelector from './NodeSelector'
import ResultBox from './ResultBox'
import './PathFinder.css'

function PathFinder() {
  const [graph, setGraph] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const parsedGraph = JSON.parse(graph)
      const res = await axios.post('http://localhost:5000/shortest-path', {
        graph: parsedGraph,
        startNode: start,
        endNode: end,
      })
      setResult(res.data)
    } catch (err) {
      alert('Invalid Graph JSON or Server Error')
    }
  }

  return (
    <div className="form-wrapper">
      <form className="input-form" onSubmit={handleSubmit}>
        <GraphInput graph={graph} setGraph={setGraph} />
        <NodeSelector start={start} setStart={setStart} end={end} setEnd={setEnd} />
        <button type="submit">🔍 Find Shortest Path</button>
      </form>
      {result && <ResultBox path={result.path} distance={result.distance} />}
    </div>
  )
}

export default PathFinder
