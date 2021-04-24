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
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
}

export default App;
