function dijkstra(graph, start, end) {
  const distances = {};
  const prev = {};
  const visited = new Set();
  const nodes = new Set(Object.keys(graph));

  for (let node of nodes) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (nodes.size) {
    let minNode = [...nodes].reduce((a, b) => distances[a] < distances[b] ? a : b);
    nodes.delete(minNode);

    if (minNode === end) break;
    visited.add(minNode);

    for (let neighbor in graph[minNode]) {
      if (visited.has(neighbor)) continue;
      let newDist = distances[minNode] + graph[minNode][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = minNode;
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return {
    path,
    distance: distances[end] === Infinity ? -1 : distances[end],
  };
}

module.exports = dijkstra;
