import type { Expense } from "../types/expense";
import ExpenseCard from "./ExpenseCard";

type ExpenseListProps = {
  expenses: Expense[];
  deleteExpense:(id:number)=>void;
  setEditExpense:(expense:Expense)=>void
};

function ExpenseList({ expenses,deleteExpense,setEditExpense }: ExpenseListProps) {
     console.log("ExpenseList:", expenses);
     if(expenses.length === 0){
      return (
        <div className="w-full max-w-4xl mx-auto p-4 ">
          <p className="text-center text-gray-400 text-xl">No expenses to display.</p>
        </div>
      );
    }

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto p-4 bg-blue-300">
      {expenses.map((expense) => (
        <ExpenseCard
         key={expense.id} 
         expense={expense}
           deleteExpense={deleteExpense}
           setEditExpense={setEditExpense}
          />
      ))}
    </div>
  );
}

export default ExpenseList;