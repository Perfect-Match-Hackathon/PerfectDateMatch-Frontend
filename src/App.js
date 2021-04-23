import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/account/Login";
import Cards from "./pages/cards/Cards";
import LandingPage from "./pages/landingpage/LandingPage";
import Test from "./pages/Test";
import UserProvider from "./components/UserContext";

function App() {
  return (
    <Fragment>
      <Router>
        <NavigationBar />
        <Container>
          <Switch>
            <Route path="/cards">
              <Cards />
            </Route>
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
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
