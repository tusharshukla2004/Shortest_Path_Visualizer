import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function GraphVisualizer({ nodes, edges }) {
  const [elements, setElements] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    setElements({ nodes, edges });
  }, [nodes, edges]);

  return (
    <div style={{ height: 500, border: '1px solid #ccc', marginTop: '20px' }}>
      <ReactFlow
        nodes={elements.nodes}
        edges={elements.edges}
        fitView
        attributionPosition="top-right"
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default GraphVisualizer;
