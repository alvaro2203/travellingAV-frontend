import { Switch, Route, Redirect } from "react-router-dom";

import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProfileHousehold from './pages/profile/ProfileHousehold'
import Household from "./pages/HouseholdInfo";
import Profile from "./pages/profile/Profile";

function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/myHousehold" component={ProfileHousehold} />
        <Route exact path="/profile/:profileId" component={Profile} />
        <Route exact path="/households/:householdId" component={Household} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
