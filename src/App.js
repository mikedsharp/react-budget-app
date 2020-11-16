/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import React, { useRef, useState, useEffect } from "react";
import DashboardView from "./DashboardView";
import BudgetHistoryView from "./BudgetHistoryView";
import BudgetFormView from "./BudgetFormView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import "./navbar.scss";
import BudgetDetailView from "./BudgetDetailView";

const Child = React.forwardRef((props, ref) => (
  <div style={{ border: "1px solid blue", margin: "10px" }}>
    <h1>This is the child</h1>
    <input type="text" />
    <img
      ref={ref}
      src="https://s3-eu-west-1.amazonaws.com/michaeldsharp.com/assets/profile-pic.jpg"
    />
  </div>
));

const Parent = React.forwardRef((props, ref) => (
  <div style={{ border: "1px solid green", margin: "10px" }}>
    <h1>This is the parent</h1>
    <Child ref={ref} />
  </div>
));

const Grandparent = () => {
  const imgRef = useRef();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (imgRef?.current?.complete) {
      console.log("image load completed");
      setImageLoading(false);
    }
  }, [imgRef?.current?.complete]);
  return (
    <div style={{ border: "1px solid red", margin: "10px" }}>
      <h1>This is the grandparent</h1>
      <h2>Image loading?: {`${imageLoading}`}</h2>
      <Parent ref={imgRef} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Grandparent />
      <Router>
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
