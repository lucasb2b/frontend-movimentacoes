import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import PainelConta from './components/PainelConta'

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">🏦 Coder Bank</Link>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conta/:idConta" element={<PainelConta />} />
        </Routes>
      </div>
    </div>
  )
}

export default App