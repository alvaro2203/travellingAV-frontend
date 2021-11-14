import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Login from './pages/Login'

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
  );
}

export default App;
