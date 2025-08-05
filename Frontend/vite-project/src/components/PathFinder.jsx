import { useState } from 'react';
import axios from 'axios';
import './PathFinder.css';
import GraphExamples from "./GraphExamples";
import GraphInput from './GraphInput';
import NodeSelector from './NodeSelector';
import ResultBox from './ResultBox';
import GraphVisualizer from './GraphVisualizer';
import { getLayoutedElements } from '../utils/layoutHelper';
import { prepareGraphData } from '../utils/graphHelper'; // 🆕 Import layout function

function PathFinder() {
  const [graphInput, setGraphInput] = useState('');
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [pathResult, setPathResult] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  

  


  const parseGraph = (input) => {
    const parsed = JSON.parse(input);
    return parsed;
  };
 const handleExampleSelect = (example) => {
  const graph = example.graph;


  // 1. Set GraphInput with example data
  const graphString = JSON.stringify(graph, null, 2);
  setGraphInput(graphString);

  
  // 3. Reset start/end nodes to let NodeSelector handle manually
  setStartNode('');
  setEndNode('');

  // 4. Reset visualization and result
  setNodes([]);
  setEdges([]);
  setPathResult(null);
};

 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent default form reload

  if (!startNode || !endNode || !graphInput) {
    alert("Please fill in the graph, start node, and end node.");
    return;
  }

  let graph;
  try {
    graph = parseGraph(graphInput);
  } catch (err) {
    alert("Invalid graph input. Please use proper JSON format.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/shortest-path", {
  graph,
  startNode,
  endNode
});


    const { paths, distance } = res.data;
    setPathResult({ paths, distance });

    const { visualNodes, visualEdges } = prepareGraphData(graph, paths, startNode, endNode);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(visualNodes, visualEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  } catch (err) {
    console.error("Error fetching shortest path:", err);
    alert("Something went wrong. Please check your graph input.");
  }
};


  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div className="graph-top-container">
      <GraphExamples onExampleSelect={handleExampleSelect} />
      <GraphInput graphInput={graphInput} setGraphInput={setGraphInput} />
    </div>

    <NodeSelector
      startNode={startNode}
      setStartNode={setStartNode}
      endNode={endNode}
      setEndNode={setEndNode}
    />

    <button type="submit">Find Shortest Path</button>
  </form>

  {pathResult && pathResult.paths && (
    <ResultBox path={pathResult.paths} distance={pathResult.distance} />
  )}

  {nodes.length > 0 && edges.length > 0 && <GraphVisualizer nodes={nodes} edges={edges} />}
</div>

  );
}

export default PathFinder;
