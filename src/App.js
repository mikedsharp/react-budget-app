import React from "react";
import DashboardView from "./DashboardView";
import BudgetHistoryView from "./BudgetHistoryView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/budgets">Past Budgets</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/budgets">
              <BudgetHistoryView />
            </Route>
            <Route path="/">
              <DashboardView />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
