document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');<p></p>
if (expenseForm) {
    expenseForm.addEventListener('submit', async (e) =&gt; {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        const response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, amount }),
        });

        if (response.ok) {
            loadExpenses();
            expenseForm.reset();
        }
    });
}

async function loadExpenses() {
    const response = await fetch('/expenses');
    const expenses = await response.json();
    expenseList.innerHTML = expenses.map(expense =&gt; `
        &lt;li&gt;${expense.description} - $${expense.amount}&lt;/li&gt;`).join('');
}

if (expenseList) {
    loadExpenses();
}
