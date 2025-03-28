
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from "sonner";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export type CategoryTotal = {
  category: string;
  total: number;
};

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: string) => void;
  categoryTotals: CategoryTotal[];
  totalExpenses: number;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const EXPENSE_CATEGORIES = [
  'Food', 
  'Transportation', 
  'Housing', 
  'Entertainment', 
  'Utilities',
  'Healthcare',
  'Education',
  'Personal',
  'Other'
];

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotal[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Calculate totals by category
    const totals = EXPENSE_CATEGORIES.map(category => {
      const total = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return { category, total };
    }).filter(item => item.total > 0);
    
    setCategoryTotals(totals);
    
    // Calculate overall total
    const overall = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(overall);
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    toast.success("Expense added successfully!");
  };

  const deleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    toast.success("Expense deleted successfully!");
  };

  return (
    <ExpenseContext.Provider value={{ 
      expenses, 
      addExpense, 
      deleteExpense,
      categoryTotals,
      totalExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
