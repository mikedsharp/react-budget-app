import React from "react";
import DashboardView from "./DashboardView";
import BudgetHistoryView from "./BudgetHistoryView";
import BudgetFormView from "./BudgetFormView";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BudgetDetailView from "./BudgetDetailView";

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="p-2 flex bg-black text-white flex-row items-center justify-between">
          <Link className="block" to="/">
            {" "}
            <h3>Mikes&apos; Money Manager</h3>
          </Link>
          <ul className="block">
            <li className="inline p-2">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="inline p-2">
              <Link to="/budget/create">Create Budget</Link>
            </li>
            <li className="inline p-2">
              <Link to="/budgets">Past Budgets</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/budget/create">
            <BudgetFormView />
          </Route>
          <BudgetDetailView path="/budget/:id" />
          <Route path="/budgets">
            <BudgetHistoryView />
          </Route>
          <Route path="/">
            <DashboardView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
