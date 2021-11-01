import React, { useState } from "react";
import { FormGroup, Input, Col, Card, Row, Form, Button, Label } from "reactstrap";
import Response from "../../lib/Response";
import apiClient from "../../lib/apiClient";

export default function SignIn({ setIsRegisterPage }) {
  let [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");

  async function signInHandler(e) {
    e.preventDefault();
    setError("");
    const res = await apiClient("/admin/resetPassword", "POST", {
      email_id: resetEmail,
    });

    if (res.responseCode === Response.STATUS_OK) {
      forgotPassword();
    } else {
      setError(res.responseMessage);
    }
  }

    //function to handle forgot password, message will be shown for 1 second
    function forgotPassword() {
      setResetPassword(resetPassword ? '': `A password reset email has been sent to ${resetEmail}`)
      window.setTimeout(() => {
        setResetPassword('');
        setIsRegisterPage();
      }, 2000);
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
         {resetPassword && <p className="mt-2 text-danger text-center">{resetPassword}</p>}
         <h3 className="text-center" style={{'fontWeight': 'bold', color: "rgb(95, 186, 183)"}}>TEENPATTI GOLD</h3>
        </div>
        <Card body style={{ margin: '0 0 0 1.5rem',  'backgroundColor': 'rgba(32, 52, 69, 0.4)' }}>
          <Form
            onSubmit={signInHandler}
          >
            <div className="text-center pb-4">
              <h3 className="text-center" style={{color: "white"}}>ENTER REGISTERED EMAIL</h3>
            </div>
            <hr />
            <FormGroup>
              <Label style={{color: "white"}} for="name">{"Registered Email"}</Label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                onChange={(e) => { setResetEmail(e.target.value); }}
              />
            </FormGroup>
            <hr />
            <Button style={{'backgroundImage': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} type="submit" size="lg" block color="primary" className="border-0">
              Send Reset Email
            </Button>
            <Button style={{'backgroundImage': 'linear-gradient(to right, #25aae1, #6afacb, #30dd8a, #2bb673)', color: "black"}} onClick={(e) => {e.preventDefault();setIsRegisterPage()}} size="lg" block color="primary" className="border-0">
              Login
            </Button>
            {error && <p className="mt-2 text-danger text-center">{error}</p>}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}