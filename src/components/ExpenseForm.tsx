
import React, { useState } from "react";
import { useExpenses, EXPENSE_CATEGORIES } from "@/contexts/ExpenseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    addExpense({
      name: name.trim(),
      amount: amountValue,
      category,
    });

    // Reset form
    setName("");
    setAmount("");
  };

  return (
    <Card className="bg-expense-light dark:bg-slate-800 border-none shadow-md">
      <CardHeader className="bg-expense-header dark:bg-slate-700 text-white">
        <CardTitle className="text-xl font-bold">Add Expense</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Expense Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/70 dark:bg-slate-700"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-white/70 dark:bg-slate-700"
            />
          </div>
          <div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/70 dark:bg-slate-700">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-expense-dark hover:bg-pink-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
