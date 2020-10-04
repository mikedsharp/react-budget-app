import React, { useEffect, useState } from "react";
const BudgetDetailView = (props) => {
  const [selectedBudget, setBudget] = useState(null);
  useEffect(() => {
    if (!selectedBudget) {
      setBudget({
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
    }
  }, [selectedBudget, setBudget]);

  if (!selectedBudget) {
    return null;
  }
  return (
    <div>
      <div>Budget detail view for {props.computedMatch.params.id} </div>
      <h1>{selectedBudget.name}</h1>
      <pre>{JSON.stringify(selectedBudget)}</pre>
    </div>
  );
};

export default BudgetDetailView;
