import React from "react";
import { calculateSum } from "./budgetHelpers";
const SumComponent = (label, values) => {
  return (
    <h4>
      {label}: £{calculateSum(values)}
    </h4>
  );
};

export default SumComponent;
