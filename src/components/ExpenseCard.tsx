import type { Expense } from "../types/expense";
type ExpenseCardProps={
    expense:Expense
}
 function ExpenseCard({expense}:ExpenseCardProps){
    console.log(expense);
    return(
        <>
        {/* making ui for expenses  */}
        <div className="border rounded-lg  p-4 shadow-md mb-3 bg-blue-300">
            <h3>{expense.title} </h3>
            <p>Rs{expense.amount} </p>
            <p>{expense.category} </p>
            <p>{expense.date} </p>
        </div>

        
        
        </>
    )
}
export default ExpenseCard;