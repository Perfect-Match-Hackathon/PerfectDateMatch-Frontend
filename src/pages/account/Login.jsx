import { useContext, useState } from "react";
import { Button, Form, Jumbotron, Row, Col } from "react-bootstrap";
import "./login.css";
import fire from "../../fire.js";
import { UserContext } from "../../components/UserContext";

const Login = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isRegisterForm, setRegisterForm] = useState(false);
  const { currentUser, isLoggedIn } = useContext(UserContext);

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
          console.log("Signed up");
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
        .then((user) => {
          console.log("Signed in");
          console.log(user);
        })
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
                <>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicFirstName">
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          value={form.firstName}
                          onChange={updateForm}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group controlId="formBasicLastName">
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={form.lastName}
                          onChange={updateForm}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={form.email}
                  onChange={updateForm}
                />
                {isRegisterForm && (
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={updateForm}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Button variant="primary" type="submit">
                    {isRegisterForm ? "Register" : "Log In"}
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    onClick={(e) => setRegisterForm(!isRegisterForm)}
                  >
                    {isRegisterForm ? "Log In" : "Sign Up"}
                  </Button>
                  <Form.Text className="text-muted">
                    {isRegisterForm ? "Already a member?" : "New here?"}
                  </Form.Text>
                </Col>
              </Row>
            </Form>
          </>
        )}
      </Jumbotron>
    </div>
  );
};
export default Login;
