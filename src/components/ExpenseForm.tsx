import React, { useState, useEffect, type ChangeEvent } from "react";
import type { Expense } from "../types/expense";
type ExpnseFormProps = {
  addExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
  setEditExpense: (expense: Expense) => void;
  updateExpense: (expense: Expense) => void;
};
export default function ExpenseForm({
  addExpense,
  editingExpense,
  setEditExpense,
  updateExpense,
}: ExpnseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
  const handleTitleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrors({
      ...errors,
      title: "",
    });
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    if (editingExpense) {
      const updatedExpense: Expense = {
        id: editingExpense.id,
        title,
        amount: Number(amount),
        category,
        date,
      };
      updateExpense(updatedExpense);
      setEditExpense(null);
    } else {
      const newExpense: Expense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date,
      };
      addExpense(newExpense);
    }
  };

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    }
  }, [editingExpense]);

  const validateForm = () => {
    let isValid = true;

    const newErrors = {
      title: "",
      amount: "",
      category: "",
      date: "",
    };

    // validations...
    if (!title.trim()) {
      newErrors.title = "Please enter a title";
      isValid = false;
    }
    if (!amount.trim()) {
      newErrors.amount = "Please enter an amount";
      isValid = false;
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than zero";
      isValid = false;
    }
    if (!category.trim()) {
      newErrors.category = "please enter a category";
      isValid = false;
    }
    if (!date.trim()) {
      newErrors.date = "please enter a date";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  //calculationg total expenses
  
  return (
    <>
      <div
        className="main flex flex-col justify-center gap-2 items-center 
   "
      >
        <div className="bg-gray-300 p-2 font-bold text-gray-700 ">
          ExpenseForm
        </div>

        <div className="expenses flex gap-4">
          {/* Title input value  */}
          <input
            type="text"
            placeholder="type expenses"
            value={title}
            onChange={handleTitleEvent}
            className="border-1 rounded p-1"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          {/* //Amount input value  */}
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);

              setErrors({
                ...errors,
                amount: "",
              });
            }}
            className="border-1 rounded p-1"
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          {/* Category input value  */}
          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);

              setErrors({
                ...errors,
                category: "",
              });
            }}
            className="border-1 rounded p-1"
          />
          {errors.category && <p className="text-red-500">{errors.category}</p>}
          {/* Date input value  */}
          <input
            type="text"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);

              setErrors({
                ...errors,
                date: "",
              });
            }}
            className="border-1 rounded p-1"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 p-2 font-bold text-gray-800 hover:bg-blue-500"
        >
          {editingExpense ? "Save Expense" : "Add Expense"}
        </button>

        <p>{title} </p>
      </div>
    </>
  );
}
