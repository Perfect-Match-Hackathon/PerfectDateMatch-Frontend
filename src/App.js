import { Fragment, useContext } from "react";
import { UserContext } from "./utils";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Container from "./components/Container";
import LandingPage from "./pages/landingpage/LandingPage";
import { default as Application } from "./pages/app/App";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Fragment>
      <Router>
        <Container>
          <Switch>
            <Route path="/app">
              {isLoggedIn ? <Application /> : <Redirect push to="/" />}
            </Route>
            <Route path="/login">
              <LandingPage isLogin={true} />
            </Route>
            <Route path="/register">
              <LandingPage isLogin={false} />
            </Route>
            <Route path="/app">
              <p>pog</p>
            </Route>
            <Route exact path="/">
              <LandingPage isLogin={true} />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
}

export default App;
