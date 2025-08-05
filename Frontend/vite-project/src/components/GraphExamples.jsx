import React from "react";

const staticExamples = [
  {
    name: " Directed Graph 1",
    graph: {
  "A": [
    ["B", 1],
    ["C", 4]
  ],
  "B": [
    ["C", 2],
    ["D", 5]
  ],
  "C": [
    ["E", 1]
  ],
  "D": [
    ["E", 2]
  ],
  "E": []
}

  },
  {
    name: "Directed Graph 2",
    graph: {
  "A": [
    ["B", 1],
    ["C", 1],
    ["D", 1]
  ],
  "B": [
    ["E", 1]
  ],
  "C": [
    ["E", 1]
  ],
  "D": [
    ["E", 1]
  ],
  "E": [
    ["F", 1]
  ],
  "F": [
    ["G", 1]
  ],
  "G": [
    ["H", 1]
  ],
  "H": []
}

  },
  {
    name:"Undirected Graph",
    graph: {
  "A": [
    ["B", 1],
    ["C", 2]
  ],
  "B": [
    ["A", 1],
    ["C", 1]
  ],
  "C": [
    ["A", 2],
    ["B", 1]
  ]
}

  }
  
];

const GraphExamples = ({ onExampleSelect }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="exampleSelect"><strong>Choose a Graph Example:</strong></label>
      <select
        id="exampleSelect"
        onChange={(e) => {
          const selected = staticExamples[e.target.value];
          if (selected) onExampleSelect(selected);
        }}
      >
        <option value="">-- Select Example --</option>
        {staticExamples.map((example, index) => (
          <option key={index} value={index}>
            {example.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GraphExamples;