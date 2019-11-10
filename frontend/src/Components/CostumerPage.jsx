import React, { Component } from "react";
import { Button, Form, Row } from "react-bootstrap";

class CostumerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      costumerNumber: 0,
      tables: [],
      waitinglist: [],
      WaitingListNumber: 0,
      selectedTables: [],
      tablesNew: []
    };
    this.handleCostumers = this.handleCostumers.bind(this);
    this.handleSubmitTest = this.handleSubmitTest.bind(this);
    this.handleEraseWaitinglist = this.handleEraseWaitinglist.bind(this);
    this.handleEraseTables = this.handleEraseTables.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const url = "http://localhost:3000/tables/get";
    fetch(url)
      .then(res => res.json())
      .then(tablesAPI => this.setState({ tables: tablesAPI }))
      .then(console.log(this.state));
    const urlWaitingList = "http://localhost:3000/tables/getwaitinglist";
    fetch(urlWaitingList)
      .then(res => res.json())
      .then(tablesAPICostumers =>
        this.setState({ waitinglist: tablesAPICostumers })
      )
      .then(console.log(this.state));
  }

  handleCostumers(event) {
    this.setState({ costumerNumber: { quantity: event.target.value } });
  }

  handleEraseWaitinglist() {
    const url = "http://localhost:3000/tables/deletewaitinglist";
    fetch(url, {
      method: "delete"
    }).then(res => res.json());
    this.setState({ waitinglist: [] });
  }

  handleEraseTables() {
    const url = "http://localhost:3000/tables/delete";
    fetch(url, {
      method: "delete"
    })
      .then(res => res.json())
      .then(() => this.props.history.push("/owner"));
  }

  handleSubmitTest(event) {
    event.preventDefault();
    let tablesAvailable = this.state.tables.filter(x => x.onUse === false);
    let costumers = this.state.costumerNumber.quantity;
    let costumerWaitingList = this.state.costumerNumber;
    if (tablesAvailable.length == 0) {
      this.setState(x => ({
        waitinglist: [...x.waitinglist, costumerWaitingList]
      }));
      const urlWaitingListadd = "http://localhost:3000/tables/addwaitinglist";
      fetch(urlWaitingListadd, {
        method: "post",
        body: JSON.stringify(
          this.state.waitinglist[this.state.waitinglist.length - 1]
        ),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(response => console.log("Succes", JSON.stringify(response)));
    } else {
      const chairs = this.state.tables[0].chairs;
      if (Math.ceil(costumers / chairs) > this.state.tables.length) {
        this.setState(x => ({
          waitinglist: [...x.waitinglist, costumerWaitingList]
        }));
        const urlWaitingListadd = "http://localhost:3000/tables/addwaitinglist";
        fetch(urlWaitingListadd, {
          method: "post",
          body: JSON.stringify(
            this.state.waitinglist[this.state.waitinglist.length - 1]
          ),
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(response => console.log("Succes", JSON.stringify(response)));
      } else {
        let idTable = [];
        while (costumers - chairs > 0) {
          idTable.push(this.state.tables.find(x => x.onUse === false).id); // finds me the ID of the first available table
          const index = this.state.tables.findIndex(x => x.onUse === false); // finds me the index of the first available table
          let tablesNew = this.state.tables.map((x, y) =>
            y === index ? { ...x, onUse: true } : x
          ); // changes the "onUse" from the index found veb
          this.state.tables = tablesNew;
          costumers -= chairs;
        }
        if (costumers - chairs <= 0) {
          idTable.push(this.state.tables.find(x => x.onUse === false).id);
          const index = this.state.tables.findIndex(x => x.onUse === false);
          let tablesNew = this.state.tables.map((x, y) =>
            y === index ? { ...x, onUse: true } : x
          );
          this.state.tables = tablesNew;
        }
        this.setState({ selectedTables: idTable });
        const datatables = this.state.tables;
        const urltables = "http://localhost:3000/tables/update";
        fetch(urltables, {
          method: "put",
          body: JSON.stringify(datatables),
          headers: { "Content-Type": "application/json" }
        }).then(response => console.log("Succes", JSON.stringify(response)));
      }
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ margin: "5%" }}>HELLO COSTUMER</h1>
        <h4 style={{ margin: "5%" }}>How many people?</h4>
        <div className="card w-75" style={{ margin: "auto" }}>
          <div className="card-body" style={{ margin: "auto" }}>
            <Form onSubmit={this.handleSubmitTest}>
              <Form.Row>
                <Form.Group md="4" controlId="validationCustom01">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Costumer"
                    onChange={this.handleCostumers}
                  />
                </Form.Group>
              </Form.Row>
              <Button className="btn btn-primary" type="submit">
                Key In
              </Button>
            </Form>
          </div>
        </div>
        <h4 style={{ margin: "5%" }}>
          {" "}
          GO TO:{" "}
          {this.state.selectedTables.map(x => (
            <h5 key={x}>Table {x}</h5>
          ))}{" "}
        </h4>
        <h4 style={{ margin: "5%" }}>
          Your waiting List number is {this.state.waitinglist.length}
        </h4>
        <Row style={{ display: "block" }}>
          <Button
            style={{ margin: "10px" }}
            className="btn btn-primary"
            onClick={this.handleEraseTables}
          >
            Reset Tables
          </Button>
          <Button
            style={{ margin: "10px" }}
            className="btn btn-primary"
            onClick={this.handleEraseWaitinglist}
          >
            Reset Waiting List
          </Button>
        </Row>
      </div>
    );
  }
}

export default CostumerPage;
