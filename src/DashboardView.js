import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./DashboardView.scss";
const DashboardView = () => {
  const [currentBudget] = useState({
    name: "October 2020",
    expenses: {
      fixed: [
        {
          name: "Rent",
          amount: 500,
          category: "",
        },
      ],
      variable: [
        {
          name: "New monitor",
          amount: 444.44,
          category: "purchase",
        },
      ],
    },
    inflows: [
      {
        name: "pay",
        amount: 666.66,
      },
      {
        name: "carry over from last month",
        amount: 55.23,
      },
    ],
  });
  const history = useHistory();
  const [now] = useState(new Date());

  function calulateTotalFixedInflows(inflows) {
    if (inflows.length === 1) {
      return inflows[0].amount;
    }
    return inflows.reduce((prev, curr) => prev.amount + curr.amount);
  }
  function calulateTotalFixedOutflows(outflows) {
    if (outflows.length === 1) {
      return outflows[0].amount;
    }
    return outflows.reduce((prev, curr) => prev.amount + curr.amount);
  }
  function calulateTotalSpendingOutflows(outflows) {
    if (outflows.length === 1) {
      return outflows[0].amount;
    }
    return outflows.reduce((prev, curr) => prev.amount + curr.amount);
  }
  function calculateTotalOutflows(expenseObject) {
    return (
      calulateTotalSpendingOutflows(expenseObject.variable) +
      calulateTotalFixedOutflows(expenseObject.fixed)
    );
  }
  function calculateCashFlow(budget) {
    const fixedExpenses = calulateTotalFixedOutflows(budget.expenses.fixed);
    const variableExpenses = calulateTotalSpendingOutflows(
      budget.expenses.variable
    );
    const inflows = calulateTotalFixedInflows(budget.inflows);

    return Number(inflows - fixedExpenses - variableExpenses);
  }
  function goToBudgetDetail(budgetId) {
    history.push(`/budget/${budgetId}`);
  }

  // useEffect(() => {
  //   let loadedBudget = null;
  //   const budgets = JSON.parse(localStorage.getItem("budgets"));
  //   if (budgets) {
  //     loadedBudget = budgets[`${now.getMonth() + 1}-${now.getFullYear()}`];
  //     setBudget(loadedBudget);
  //   }
  // }, [now]);

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
      <h4>
        Total inflows: £{calulateTotalFixedInflows(currentBudget.inflows)}
      </h4>
      <h2>Outgoings</h2>
      <h4>
        Total fixed outflows: £
        {calulateTotalFixedOutflows(currentBudget.expenses.fixed)}
      </h4>
      <h4>
        Total spending outflows : £
        {calulateTotalSpendingOutflows(currentBudget.expenses.variable)}
      </h4>
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
