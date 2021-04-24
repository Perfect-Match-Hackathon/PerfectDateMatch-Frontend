import { Fragment } from "react";
import Container from "./components/Container";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  return (
    <Fragment>
      <Router>
        <Container>
          <Switch>
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
