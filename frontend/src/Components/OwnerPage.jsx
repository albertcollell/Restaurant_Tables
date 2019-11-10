import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class OwnerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableNumber: 0,
      chairsTable: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTables = this.handleChangeTables.bind(this);
    this.handleChangeChairs = this.handleChangeChairs.bind(this);
  }

  handleChangeTables(event) {
    this.setState({ tableNumber: event.target.value });
  }

  handleChangeChairs(event) {
    this.setState({ chairsTable: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const url = "http://localhost:3000/tables/addtables";
    if (data.tableNumber > 0 && data.chairsTable > 0) {
      fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => console.log("Succes", JSON.stringify(response)))
        .then(() => this.props.history.push("/costumer"));
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ margin: "5%" }}>HELLO OWNER</h1>
        <h4 style={{ margin: "5%" }}>
          Please introduce the size of the restaurant
        </h4>
        <div className="card w-75" style={{ margin: "auto" }}>
          <div className="card-body" style={{ margin: "auto" }}>
            <Form
              noValidate
              validated={this.state.validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Row>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label>TABLES</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="number"
                    onChange={this.handleChangeTables}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                  <Form.Label>CHAIRS</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="number"
                    onChange={this.handleChangeChairs}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button className="btn btn-primary" type="submit">
                Create Tables
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerPage;
