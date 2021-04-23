import { useState } from "react";
import { Button, Form, Jumbotron } from "react-bootstrap";
import "./login.css";
import fire from "../../fire.js";

const Login = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isRegisterForm, setRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  const updateForm = (e) => {
    e.persist();
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isRegisterForm) {
      await fire
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          console.log(user);
          fire.firestore.collection("createdUsers").doc(user.user.uid).set({
            firstName: form.firstName,
            lastName: form.lastName,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("Error Signing up with email and password");
        });
    } else {
      await fire
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .catch((error) => {
          console.log(error);
          console.log("Error Logging In with email and password");
        });
    }
  };

  const logOut = async (e) => {
    e.preventDefault();
    await fire.auth().signOut();
  };
  return (
    <div className="login__page">
      <Jumbotron>
        {isLoggedIn ? (
          <>
            <h1>Logged In</h1>
            <Form onSubmit={logOut}>
              <Button variant="primary" type="submit">
                Log out
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h1>{isRegisterForm ? "Register" : "Log In"}</h1>
            <Form onSubmit={onSubmit}>
              {isRegisterForm && (
                <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={updateForm}
                  />
                </Form.Group>
              )}
              {isRegisterForm && (
                <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={updateForm}
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={updateForm}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {isRegisterForm ? "Register" : "Log In"}
              </Button>
              <Form.Text className="text-muted">
                {isRegisterForm ? "Already a member?" : "New here?"}
              </Form.Text>
              <Button
                variant="primary"
                onClick={(e) => setRegisterForm(!isRegisterForm)}
              >
                {isRegisterForm ? "Log In" : "Sign Up"}
              </Button>
            </Form>
          </>
        )}
      </Jumbotron>
    </div>
  );
};
export default Login;
