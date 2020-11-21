import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { calculateSum } from "./budgetHelpers";
import SumComponent from "./SumComponent";

const DashboardView = () => {
  const [currentBudget, setBudget] = useState();
  const history = useHistory();
  const [now] = useState(new Date());

  function createBlankBudget() {
    let budgets = JSON.parse(localStorage.getItem("budgets"));
    if (!Array.isArray(budgets)) {
      budgets = {};
    }
    budgets[`${now.getMonth() + 1}-${now.getFullYear()}`] = {
      name: `${now.getMonth() + 1}-${now.getFullYear()}`,
      expenses: {
        fixed: [],
        variable: [],
      },
      inflows: [],
    };
    localStorage.setItem("budgets", JSON.stringify(budgets));
    const loadedBudget = budgets[`${now.getMonth() + 1}-${now.getFullYear()}`];
    setBudget(loadedBudget);
  }

  function calculateTotalOutflows(expenseObject) {
    return (
      calculateSum(expenseObject.variable) + calculateSum(expenseObject.fixed)
    );
  }

  function calculateCashFlow(budget) {
    const fixedExpenses = calculateSum(budget.expenses.fixed);
    const variableExpenses = calculateSum(budget.expenses.variable);
    const inflows = calculateSum(budget.inflows);
    return Number(inflows - fixedExpenses - variableExpenses);
  }

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
          <button onClick={() => createBlankBudget()}>Create one?</button>
        </h1>
      </div>
    );
  }
  return (
    <div className="DashboardView">
      <h1>Budget summary for {currentBudget.name}</h1>
      <h2>Income</h2>
      {SumComponent("Total inflows", currentBudget.inflows)}
      <h2>Outgoings</h2>
      {SumComponent("Total fixed outflows", currentBudget.expenses.fixed)}
      {SumComponent("Total spending outflows", currentBudget.expenses.variable)}
      <h4>Total outflows: £{calculateTotalOutflows(currentBudget.expenses)}</h4>
      <h2>Cash flow status</h2>
      <h4>
        {calculateCashFlow(currentBudget) > 0 ? "Positive" : "Negative"} (£
        {calculateCashFlow(currentBudget)})
      </h4>
      <button type="button" onClick={() => goToBudgetDetail("foo")}>
        Budget Detail
      </button>
      <button type="button">Edit</button>
    </div>
  );
};

export default DashboardView;
