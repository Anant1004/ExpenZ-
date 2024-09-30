import React from 'react';

const ExpenseList = ({ expenseData }) => {
    return (
        <div className='h-1/2 md:w-[30vw] w-full bg-gray-600 p-4 rounded-2xl'>
            <h2 className="text-white text-lg mb-4">All Expenses</h2>
            {expenseData.length > 0 ? (
                <ul className="text-white">
                    {expenseData.map((expense, index) => (
                        <li key={index} className="mb-2">
                            <strong>Expense:</strong> {expense.expenseName} 
                            <strong>Date:</strong> {expense.expenseDate} 
                            <strong>₹:</strong> {expense.expenseAmt}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-white">No expenses found.</p>
            )}
        </div>
    );
};

export default ExpenseList;
