import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import MyHousehold from './pages/MyHousehold'

function App() {

  return (
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myHousehold" element={<MyHousehold />} />
        </Routes>
      </div>
  );
}

export default App;
