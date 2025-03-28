
import React from "react";
import { useExpenses } from "@/contexts/ExpenseContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Array of colors to use for different categories
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", 
  "#82CA9D", "#F44236", "#E91E63", "#9C27B0"
];

const ExpenseChart: React.FC = () => {
  const { categoryTotals, totalExpenses } = useExpenses();

  const formatData = () => {
    return categoryTotals.map(item => ({
      name: item.category,
      value: item.total
    }));
  };

  const chartData = formatData();

  return (
    <Card className="bg-gray-100 dark:bg-slate-800 border-none shadow-md h-full">
      <CardHeader className="bg-gray-200 dark:bg-slate-700">
        <CardTitle className="text-xl font-bold">Expense Chart</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 h-[calc(100%-4rem)] flex flex-col">
        {totalExpenses > 0 ? (
          <>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</div>
              <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Add expenses to see chart data
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
