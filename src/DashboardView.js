import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DashboardView = () => {
  const [currentBudget, setBudget] = useState(null);
  useEffect(() => {
    let loadedBudget = null;
    const budgets = JSON.parse(localStorage.getItem("budgets"));
    if (budgets) {
      const now = new Date();
      loadedBudget = budgets[`${now.getMonth() + 1}-${now.getFullYear()}`];
      setBudget(loadedBudget);
    }
  }, []);

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
  return <div>Current budget found {JSON.stringify(currentBudget)}</div>;
};

export default DashboardView;
