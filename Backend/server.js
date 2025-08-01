const express = require('express');
const cors = require('cors');
const dijkstra = require('./dijkstra');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/shortest-path', (req, res) => {
  const { graph, startNode, endNode } = req.body;

  if (!graph || !startNode || !endNode) {
    return res.status(400).json({ error: "Missing graph, startNode or endNode" });
  }

  try {
    const result = dijkstra(graph, startNode, endNode);
    res.json({
      paths: result.paths,
      distance: result.distance
    });

  } catch (err) {
    res.status(500).json({ error: "Error processing graph" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});