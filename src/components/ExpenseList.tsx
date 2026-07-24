import type { Expense } from "../types/expense";
import ExpenseCard from "./ExpenseCard";

type ExpenseListProps = {
  expenses: Expense[];
};

function ExpenseList({ expenses }: ExpenseListProps) {
     console.log("ExpenseList:", expenses);
  return (
    <div>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
        />
      ))}
    </div>
  );
}

export default ExpenseList;