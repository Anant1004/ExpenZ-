import React from 'react';

const ExpenseList = ({ expenseData }) => {
    return (
        <div className='h-1/2 w-1/2 bg-gray-600 p-4'>
            <h2 className="text-white text-lg mb-4">Expense List</h2>
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
