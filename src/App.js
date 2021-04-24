import { Fragment } from "react";
import Container from "./components/Container";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/account/Login";

function App() {
  return (
    <Fragment>
      <Router>
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <p>pog</p>
            </Route>
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
}

export default App;
