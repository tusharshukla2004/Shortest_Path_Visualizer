import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Finder from './pages/Finder'
import About from './pages/About'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/">🏠 Home</Link>
        <Link to="/finder">🔍 Find Path</Link>
        <Link to="/about">ℹ️ About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
