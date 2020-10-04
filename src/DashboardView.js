import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DashboardView.scss";
const DashboardView = () => {
  const [currentBudget, setBudget] = useState(null);
  const history = useHistory();
  const [now] = useState(new Date());
  const cashFlow = 555;

  function goToBudgetDetail(budgetId) {
    history.push(`/budget/${budgetId}`);
  }

  useEffect(() => {
    let loadedBudget = null;
    const budgets = JSON.parse(localStorage.getItem("budgets"));
    if (budgets) {
      loadedBudget = budgets[`${now.getMonth() + 1}-${now.getFullYear()}`];
      setBudget(loadedBudget);
    }
  }, [now]);

  if (!currentBudget) {
    return (
      <div>
        <h1>
          No budget has been create for this month,{" "}
          <Link to="/budget/create">Create one?</Link>
        </h1>
      </div>
    );
  }
  return (
    <div className="DashboardView">
      <h1>Budget summary for {`${now.getMonth() + 1}-${now.getFullYear()}`}</h1>
      <h2>Income</h2>
      <h4>Total inflows: £2000</h4>
      <h2>Outgoings</h2>
      <h4>Total fixed outflows: £500</h4>
      <h4>Total spending outflows : £1000</h4>
      <h4>Total outflows: £1500</h4>
      <h2>Cash flow status</h2>
      <h4>
        {cashFlow > 0 ? "Positive" : "Negative"} (£{cashFlow})
      </h4>
      <button type="button" onClick={() => goToBudgetDetail("foo")}>
        Budget Detail
      </button>
      <button type="button">Edit</button>
    </div>
  );
};

export default DashboardView;
