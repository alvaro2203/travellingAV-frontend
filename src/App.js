import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
