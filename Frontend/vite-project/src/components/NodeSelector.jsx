import React from 'react';
import './NodeSelector.css';

const NodeSelector = ({ startNode, setStartNode, endNode, setEndNode }) => {
  return (
    <div className="node-selector-container">
      <div className="node-field">
        <label>Start Node:</label>
        <input
          type="text"
          value={startNode}
          onChange={(e) => setStartNode(e.target.value)}
          placeholder="e.g., A"
        />
      </div>
      <div className="node-field">
        <label>End Node:</label>
        <input
          type="text"
          value={endNode}
          onChange={(e) => setEndNode(e.target.value)}
          placeholder="e.g., D"
        />
      </div>
    </div>
  );
};

export default NodeSelector;
