import "./card.scss";
// import { calculateSum } from "./budgetHelpers";
import React, { useState, useEffect } from "react";

const BudgetHistoryView = () => {
  const [budgetList, setBudgetList] = useState(null);

  // function getCashflowStatus(cashflow) {
  //   const inflows = calculateSum(cashflow.inflows);
  //   const outflows = calculateSum([
  //     ...cashflow.expenses.fixed,
  //     ...cashflow.expenses.variable,
  //   ]);
  //   return outflows > inflows ? "Negative" : "Positive";
  // }
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
            key={budget.name}
            className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
          >
            <b>Budget from:</b> {budget.name}
          </div>
        );
      })}
    </div>
  );
};

export default BudgetHistoryView;
