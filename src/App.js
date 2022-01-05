import { Switch, Route, Redirect } from "react-router-dom";

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import ResetPassword from "./pages/ResetPassword";
import Register from './pages/Register'
import ProfileHousehold from './pages/profile/ProfileHousehold'
import Household from "./pages/HouseholdInfoDos";
import Profile from "./pages/profile/Profile";
import Contact from "./components/Contact";
import Communities from "./pages/Communities";

function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rstPassword" component={ResetPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/myHousehold" component={ProfileHousehold} />
        <Route exact path="/profile/:profileId" component={Profile} />
        <Route exact path="/households/:householdId" component={Household} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/communities" component={Communities} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
