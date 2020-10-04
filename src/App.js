import React from "react";
import DashboardView from "./DashboardView";
import BudgetHistoryView from "./BudgetHistoryView";
import BudgetCreateView from "./BudgetCreateView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import "./navbar.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Link to="/">
              {" "}
              <h3>Mikes&apos; Money Manager</h3>
            </Link>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/budget/create">Create Budget</Link>
              </li>
              <li>
                <Link to="/budgets">Past Budgets</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/budget/create">
              <BudgetCreateView />
            </Route>
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
