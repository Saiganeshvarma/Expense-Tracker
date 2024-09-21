let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let totalIncome = 0;
let totalExpense = 0;

const form = document.getElementById('transaction-form');
const transactionTable = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
const balanceAmount = document.getElementById('balance-amount');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateUI() {
    transactionTable.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = transactionTable.insertRow();
        row.insertCell(0).innerText = transaction.name;
        row.insertCell(1).innerText = `$${transaction.amount}`;
        row.insertCell(2).innerText = transaction.category;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.onclick = () => deleteTransaction(index);
        row.insertCell(3).appendChild(deleteBtn);
    });
    calculateTotals();
}

function calculateTotals() {
    totalIncome = transactions.reduce((acc, curr) => curr.amount > 0 ? acc + curr.amount : acc, 0);
    totalExpense = transactions.reduce((acc, curr) => curr.amount < 0 ? acc + curr.amount : acc, 0);
    const currentBalance = totalIncome + totalExpense;

    balanceAmount.innerText = `$${currentBalance.toFixed(2)}`;
    totalIncomeEl.innerText = `$${totalIncome.toFixed(2)}`;
    totalExpenseEl.innerText = `$${Math.abs(totalExpense).toFixed(2)}`; // Show positive value
}

function addTransaction(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const type = document.querySelector('input[name="type"]:checked').value; // Get transaction type

    // Set amount as negative for expenses
    const adjustedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);
    transactions.push({ name, amount: adjustedAmount, category });
    updateLocalStorage();
    updateUI();
    form.reset();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateLocalStorage();
    updateUI();
}

form.addEventListener('submit', addTransaction);

document.querySelector('.toggle-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

updateUI();
