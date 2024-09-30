import { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/expenseList';

function App() {
  // State hooks for managing input fields and expense data
  const [expenseName, setExpenseName] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [expenseData, setExpenseData] = useState([]);

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

    setExpenseName("");
    setExpenseDate("");
    setExpenseAmt("");

    if (response.ok) {
      console.log('Expense added:', await response.json());
      fetchExpenses();
    } else {
      console.error('Failed to add expense');
    }
  };

  // Function to fetch expense data
  const fetchExpenses = async () => {
    const response = await fetch('http://localhost:4000/');
    if (response.ok) {
      const data = await response.json();
      setExpenseData(data);
    } else {
      console.error('Failed to fetch expenses');
    }
  };

  // Function to delete an expense
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Expense with id ${id} deleted.`);
      fetchExpenses(); // Refresh the list after deletion
    } else {
      console.error('Failed to delete expense');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="w-full bg-[#181C14] h-screen font-[Raleway] flex justify-center items-center flex-col gap-5 md:p-0 p-2">
      <form className="form bg-[#3C3D37] h-[40vh] md:w-[30vw] w-full flex flex-col items-center justify-center rounded-2xl" onSubmit={handleSubmit}>
        <div className="mb-3 w-[88%] h-14 flex flex-col">
          <label className="form-label text-[#ECDFCC]">Expense Name</label>
          <input
            type="text"
            className="form-control rounded-lg h-[65%] px-3 bg-[#d5b98f] outline-none"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 w-[88%] h-14 flex flex-col">
          <label className="form-label text-[#ECDFCC]">Expense Date</label>
          <input
            type="date"
            className="form-control rounded-lg h-[65%] px-3 bg-[#d5b98f] outline-none placeholder:select-none"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 w-[88%] h-14 flex flex-col">
          <label className="form-label text-[#ECDFCC]">Expense Amount</label>
          <input
            type="number"
            className="form-control rounded-lg h-[75%] px-3 bg-[#d5b98f] outline-none appearance-none "
            value={expenseAmt}
            onChange={(e) => setExpenseAmt(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='px-4 py-2 bg-[#ECDFCC] rounded-xl hover:bg-[#d5b98f] font-semibold'>Add expense</button>
      </form>
      <ExpenseList expenseData={expenseData} onDelete={handleDelete} />
    </div>
  );
}

export default App;
