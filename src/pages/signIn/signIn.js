import React, { useState } from "react";
import { FormGroup, Input, Col, Card, Row, Form, Button, Label } from "reactstrap";
import Response from "../../lib/Response";
import apiClient from "../../lib/apiClient";
import { ACCESS_TOKEN_KEY, BASE_PATH, USER_ID_KEY } from "../../config/settings";

export default function SignIn({ onAccessTokenUpdate }) {
  let [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInHandler(e) {
    e.preventDefault();
    setError("");

    //making the api call for login
    const res = await apiClient("/adminLogin", "POST", {
      admin_name: email,
      password: password,
    });

    if (res.responseCode === Response.STATUS_OK) {
      //storing the accessToken in localStorage and react variable and redirect the route to main page
      onAccessTokenUpdate(res.responseData.access_token, res.responseData.admin_id);
      localStorage.setItem(ACCESS_TOKEN_KEY, res.responseData.access_token);
      localStorage.setItem(USER_ID_KEY, res.responseData.admin_id);
      window.location.href = BASE_PATH;
    } else {
      setError(res.responseMessage);
    }
  }

  return (
    <Row
      style={{
        height: '100vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgb(18, 59, 92)'
      }}>
      <Col md={6} lg={4}>
        <div className="text-center pb-4">
         <h3 className="text-center" style={{'fontWeight': 'bold', color: "rgb(95, 186, 183)"}}>TEENPATTI GOLD</h3>
        </div>
        <Card body style={{ margin: '0 0 0 1.5rem',  'backgroundColor': 'rgba(32, 52, 69, 0.4)' }}>
          <Form
            onSubmit={signInHandler}
          >
            <div className="text-center pb-4">
              <h3 className="text-center" style={{color: "white"}}>LOGIN</h3>
            </div>
            <hr />
            <FormGroup>
              <Label style={{color: "white"}} for="email">{"Email Id"}</Label>
              <Input
                name="email"
                type="text"
                placeholder="your@email.com"
                onChange={(e) => { setEmail(e.target.value); }}
              />
            </FormGroup>
            <FormGroup>
              <Label style={{color: "white"}} for="password">{"Password"}</Label>
              <Input name="password" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value); }} />
            </FormGroup>
            <hr />
            <Button style={{'backgroundImage': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} type="submit" size="lg" block color="primary" className="border-0">
              Login
            </Button>
            {error && <p className="mt-2 text-danger text-center">{error}</p>}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}