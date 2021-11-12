import { Route, Routes } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Header from './components/Header'

function App() {
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </div>
  );
}

export default App;
