import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import React, { useState } from 'react';

function UserSearchWithPlayerName({ onParamChange, toggleSearchBar }) {
  const [searchText, setSearchText] = useState("");

  return (
    <Row >
      <Col xl={3} />
      <Col xl={9}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col md={9}>
              <FormGroup>
                <Input
                  onChange={(e) => { setSearchText(e.target.value); onParamChange(e); }}
                  name="search_text"
                  type="text"
                  value={searchText}
                  placeholder="ENTER PLAYER NAME YOU WANT TO FIND"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup xs="auto" className="ml-2">
                <Button onClick={(e) => {setSearchText(""); toggleSearchBar(e); }} color="primary">
                  X
              </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col md={2} />
    </Row>
  );
}

export default UserSearchWithPlayerName
