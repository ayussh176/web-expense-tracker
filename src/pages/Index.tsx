
import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseChart from "@/components/ExpenseChart";
import ThemeToggle from "@/components/ThemeToggle";

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="container mx-auto px-4 py-6 md:py-12">
            <header className="flex justify-between items-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                Expense Tracker
              </h1>
              <ThemeToggle />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-6">
                <ExpenseForm />
                <ExpenseList />
              </div>
              <div className="h-[500px] md:h-[600px]">
                <ExpenseChart />
              </div>
            </div>
          </div>
        </div>
      </ExpenseProvider>
    </ThemeProvider>
  );
};

export default Index;
