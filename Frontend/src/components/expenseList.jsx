import React from 'react';

const ExpenseList = ({ expenseData, onDelete }) => {
    return (
        <div className='h-1/2 md:w-[30vw] w-full bg-[#3f3b35] p-4 rounded-2xl'>
            <h2 className="text-white text-lg mb-4">All Expenses</h2>
            {expenseData.length > 0 ? (
                <ul className="text-white">
                    {expenseData.map((expense) => (
                        <li key={expense._id} className="mb-2 flex justify-between items-center">
                            <p>{expense.expenseName}</p>
                            <p>{expense.expenseDate}</p>
                            <p>₹ {expense.expenseAmt}</p>
                            <button 
                                onClick={() => onDelete(expense._id)} 
                                className="ml-1 bg-red-600 px-[5px] rounded-lg">
                                Delete
                            </button>
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
