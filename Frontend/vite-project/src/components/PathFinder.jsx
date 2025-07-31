import { useState } from 'react';
import axios from 'axios';
import ResultBox from './ResultBox';
import GraphVisualizer from './GraphVisualizer';
import { getLayoutedElements } from '../utils/layoutHelper'; // 🆕 Import layout function

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

  const COLORS = ['#f00', '#00f', '#0a0', '#a0a', '#0aa', '#fa0', '#999']; // extend as needed

const prepareGraphData = (graph, allPaths) => {
  const nodeSet = new Set(Object.keys(graph));
  Object.values(graph).forEach(neighbors => {
    neighbors.forEach(([node]) => nodeSet.add(node));
  });

  const visualNodes = Array.from(nodeSet).map((id) => ({
    id,
    data: { label: id },
    position: { x: 0, y: 0 },
  }));

  const visualEdges = [];
  for (const [from, neighbors] of Object.entries(graph)) {
    neighbors.forEach(([to]) => {
      const edge = {
        id: `${from}-${to}`,
        source: from,
        target: to,
        style: { stroke: '#aaa' }, // default gray
        animated: false,
      };

      allPaths.forEach((path, index) => {
        for (let i = 0; i < path.length - 1; i++) {
          if (path[i] === from && path[i + 1] === to) {
            edge.style = { stroke: COLORS[index % COLORS.length], strokeWidth: 2 };
            edge.animated = true;
          }
        }
      });

      visualEdges.push(edge);
    });
  }

  return { visualNodes, visualEdges };
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
      endNode,
    });

    const { paths, distance } = res.data;
    setPathResult({ paths, distance });

    const { visualNodes, visualEdges } = prepareGraphData(graph, paths);
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
        <label>Graph (JSON format):</label>
        <textarea
          value={graphInput}
          onChange={(e) => setGraphInput(e.target.value)}
          rows={6}
          cols={50}
          placeholder='{"A": [["B", 1], ["C", 4]], "B": [["C", 2], ["D", 5]], "C": [["D", 1]], "D": []}'
        />

        <br />
        <label>Start Node:</label>
        <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)} required />
        <br />
        <label>End Node:</label>
        <input type="text" value={endNode} onChange={(e) => setEndNode(e.target.value)} required />
        <br />
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
