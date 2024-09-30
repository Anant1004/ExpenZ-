import { useState } from 'react';
import './App.css';
import ExpenseList from './components/expenseList';

function App() {
  // State hooks for managing input fields and expense data
  const [expenseName, setExpenseName] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [expenseData, setExpenseData] = useState([]); // State for updating expense data

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addExpense = { expenseName, expenseDate, expenseAmt };
    
    // Send data to the server
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addExpense),
    });

    // Reset input fields after submission
    setExpenseName("");
    setExpenseDate("");
    setExpenseAmt("");

    if (response.ok) {
      const result = await response.json();
      console.log('Expense added:', result);

      // Update the expenseData state with the new expense
      setExpenseData((prevData) => [...prevData, result]);
    } else {
      console.error('Failed to add expense');
    }
  };

  return (
    <div className="w-full bg-red-500 h-screen font-[Raleway]">
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Expense Name</label>
          <input
            type="text"
            className="form-control"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expense Date</label>
          <input
            type="date"
            className="form-control"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expense Amount</label>
          <input
            type="number"
            className="form-control"
            value={expenseAmt}
            onChange={(e) => setExpenseAmt(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='px-2 py-3 bg-yellow-300'>Add expense</button>
      </form>
      {/* Pass expenseData to ExpenseList */}
      <ExpenseList expenseData={expenseData} />
    </div>
  );
}

export default App;
