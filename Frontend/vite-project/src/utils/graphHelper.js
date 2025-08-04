// src/utils/graphHelper.js

const COLORS = ['#f00', '#00f', '#0a0', '#a0a', '#0aa', '#fa0', '#999']; // Extend if needed

export const prepareGraphData = (graph, allPaths, startNode, endNode) => {
  const nodeSet = new Set(Object.keys(graph));

  Object.values(graph).forEach((neighbors) => {
    if (Array.isArray(neighbors)) {
      neighbors.forEach((edge) => {
        if (Array.isArray(edge) && edge.length > 0) {
          const [node] = edge;
          nodeSet.add(node);
        }
      });
    }
  });

  const visualNodes = Array.from(nodeSet).map((id) => ({
    id,
    data: {
      label: id,
      style: {
        backgroundColor:
          id === startNode ? '#4CAF50' : id === endNode ? '#F44336' : '#fff',
        color: id === startNode || id === endNode ? '#fff' : '#000',
        padding: 10,
        borderRadius: 6,
        border: '2px solid #555',
      },
    },
    position: { x: 0, y: 0 },
    style: {
      background:
        id === startNode ? '#4CAF50' : id === endNode ? '#F44336' : '#eee',
      color: id === startNode || id === endNode ? '#fff' : '#000',
      border: '2px solid #000',
    },
  }));

  const visualEdges = [];
  for (const [from, neighbors] of Object.entries(graph)) {
    if (!Array.isArray(neighbors)) continue;

    neighbors.forEach((edge) => {
      if (!Array.isArray(edge) || edge.length < 2) return;
      const [to] = edge;

      const edgeObj = {
        id: `${from}-${to}`,
        source: from,
        target: to,
        style: { stroke: 'black', strokeWidth: 1 },
        animated: false,
      };

      allPaths.forEach((path, index) => {
        for (let i = 0; i < path.length - 1; i++) {
          if (path[i] === from && path[i + 1] === to) {
            edgeObj.style = {
              stroke: COLORS[index % COLORS.length],
              strokeWidth: 2,
            };
            edgeObj.animated = true;
          }
        }
      });

      visualEdges.push(edgeObj);
    });
  }

  return { visualNodes, visualEdges };
};
