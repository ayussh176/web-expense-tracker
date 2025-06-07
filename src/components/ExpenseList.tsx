
import React from "react";
import { useExpenses } from "@/contexts/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense } = useExpenses();

  return (
    <Card className="bg-expense-light dark:bg-slate-800 border-none shadow-md">
      <CardHeader className="bg-expense-header dark:bg-slate-700 text-white">
        <CardTitle className="text-xl font-bold">Expense List</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-expense-dark/20 dark:bg-slate-700/60">
                <th className="py-2 px-4 text-left">Expense name</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left w-16">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr 
                    key={expense.id} 
                    className="border-b border-expense-dark/10 dark:border-gray-700"
                  >
                    <td className="py-3 px-4">{expense.name}</td>
                    <td className="py-3 px-4">₹{expense.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{expense.category}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense(expense.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No expenses added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
