import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Welcome to Dijkstra Path Finder 🚀</h1>
      <p>This app finds the shortest path between two nodes using Dijkstra's Algorithm.</p>
      <Link to="/finder"><button>Try It Now</button></Link>
    </div>
  )
}

export default Home
