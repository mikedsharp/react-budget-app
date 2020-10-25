import "./card.scss";

import React, { useState, useEffect } from "react";

const BudgetHistoryView = () => {
  const [budgetList, setBudgetList] = useState(null);
  useEffect(() => {
    if (!budgetList) {
      const budgets = Object.values(JSON.parse(localStorage.budgets));
      setBudgetList(budgets);
    }
  }, [budgetList, setBudgetList]);
  if (!budgetList) {
    return <div>No budgets to show</div>;
  }
  return (
    <div className="BudgetHistory">
      {budgetList.map((budget) => {
        return (
          <div className="card" key={budget.name}>
            {budget.name}
          </div>
        );
      })}
    </div>
  );
};

export default BudgetHistoryView;
