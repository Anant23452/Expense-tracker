import { Expense } from "../types/expense";
type ExpnseFormProps={
    expense:Expense
}
 export function ExpenseCard({expense}:ExpnseFormProps){
    return(
        <>
        {/* making ui for expenses  */}
        <div className="border rounded-lg  p-4 shadow-md mb-3">
            <h3>{expense.title} </h3>
            <p>Rs{expense.amount} </p>
            <p>{expense.category} </p>
            
        </div>

        
        
        </>
    )
}