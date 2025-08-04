import React from 'react';
import './GraphInput.css'; // Add your styling here

const GraphInput = ({ graphInput, setGraphInput }) => {
  return (
    <div className="graph-input-container">
      <label htmlFor="graph-input">Graph (JSON format):</label>
      <textarea
        id="graph-input"
        value={graphInput}
        onChange={(e) => setGraphInput(e.target.value)}
        rows={6}
        cols={50}
        placeholder='{"A": [["B", 1], ["C", 4]], "B": [["C", 2], ["D", 5]], "C": [["D", 1]], "D": []}'
        className="graph-textarea"
      />
    </div>
  );
};

export default GraphInput;
