import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import OwnerPage from "./Components/OwnerPage";
import CostumerPage from "./Components/CostumerPage";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/owner" component={OwnerPage} />
            <Route path="/costumer" component={CostumerPage} />
            <Redirect to="/owner" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
