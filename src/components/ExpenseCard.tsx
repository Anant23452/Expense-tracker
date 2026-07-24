import type { Expense } from "../types/expense";
type ExpenseCardProps={
    expense:Expense
}
 function ExpenseCard({expense}:ExpenseCardProps){
    console.log(expense);
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto p-4">
        {/* making ui for expenses  */}
       <div className="group relative flex flex-col justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
      
      {/* Top Header: Title & Category Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-semibold text-slate-800 text-base leading-tight tracking-tight capitalize group-hover:text-indigo-600 transition-colors">
          {expense.title}
        </h3>
        <span className="shrink-0 px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full capitalize">
          {expense.category}
        </span>
      </div>

      {/* Bottom Footer: Amount & Date */}
      <div className="flex items-baseline justify-between pt-3 border-t border-slate-100/80">
        <div>
          <span className="text-xs font-medium text-slate-400 block uppercase tracking-wider mb-0.5">
            Amount
          </span>
          <p className="text-xl font-bold text-slate-900 tracking-tight">
            <span className="text-sm font-semibold text-slate-500 mr-0.5">₹</span>
            {expense.amount}
          </p>
        </div>

        <time className="text-xs font-medium text-slate-400">
          {expense.date}
        </time>
      </div>

    </div>

        
        
        </div>
    )
}
export default ExpenseCard;