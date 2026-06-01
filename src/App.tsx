import { NavLink, Route, Routes } from 'react-router-dom'
import { Plus } from 'lucide-react'
import './App.css'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Creatorverse home">
          <span className="brand-mark">CV</span>
          <span>
            <strong>Creatorverse</strong>
            <small>Five voices worth following</small>
          </span>
        </NavLink>

        <nav className="nav-actions" aria-label="Primary navigation">
          <NavLink to="/" end>
            Directory
          </NavLink>
          <NavLink to="/new" className="primary-link">
            <Plus size={18} aria-hidden="true" />
            Add creator
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ShowCreators />} />
          <Route path="/new" element={<AddCreator />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
          <Route path="/creator/:id/edit" element={<EditCreator />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
