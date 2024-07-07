import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
export default class CreateUser extends Component {
  render() {
    return (
      <div className="container mt-3">
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Job</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            readonly
          />
        </InputGroup>
      </div>
    );
  }
}
