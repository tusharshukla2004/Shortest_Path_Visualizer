function dijkstra(graph, start, end) {
  const distances = {};
  const paths = {};
  const visited = new Set();
  const nodes = new Set(Object.keys(graph));

  for (let node of nodes) {
    distances[node] = Infinity;
    paths[node] = [];
  }
  distances[start] = 0;
  paths[start] = [[start]];

  while (nodes.size) {
    let minNode = [...nodes].reduce((a, b) => distances[a] < distances[b] ? a : b);
    nodes.delete(minNode);
    visited.add(minNode);

    for (let [neighbor, weight] of graph[minNode]) {
      if (visited.has(neighbor)) continue;
      const newDist = distances[minNode] + weight;

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        paths[neighbor] = paths[minNode].map(p => [...p, neighbor]);
      } else if (newDist === distances[neighbor]) {
        paths[neighbor].push(...paths[minNode].map(p => [...p, neighbor]));
      }
    }
  }

  return {
    paths: paths[end],
    distance: distances[end] === Infinity ? -1 : distances[end],
  };
}

module.exports = dijkstra;
