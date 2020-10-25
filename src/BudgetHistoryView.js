import "./card.scss";
import { calculateSum } from "./budgetHelpers";
import React, { useState, useEffect } from "react";

const BudgetHistoryView = () => {
  const [budgetList, setBudgetList] = useState(null);

  function getCashflowStatus(cashflow) {
    const inflows = calculateSum(cashflow.inflows);
    const outflows = calculateSum([
      ...cashflow.expenses.fixed,
      ...cashflow.expenses.variable,
    ]);
    return outflows > inflows ? "Negative" : "Positive";
  }
  useEffect(() => {
    if (!budgetList) {
      if (JSON.parse(localStorage.getItem("budgets"))) {
        const budgets = Object.values(JSON.parse(localStorage.budgets));
        setBudgetList(budgets);
      }
    }
  }, [budgetList, setBudgetList]);
  if (!budgetList) {
    return <div className="BudgetHistory no-budgets">No budgets to show</div>;
  }
  return (
    <div className="BudgetHistory">
      {budgetList.map((budget) => {
        return (
          <div
            className={`card ${getCashflowStatus(budget)}`}
            key={budget.name}
          ></div>
        );
      })}
    </div>
  );
};

export default BudgetHistoryView;
