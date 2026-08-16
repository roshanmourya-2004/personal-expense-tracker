// Fetch user-specific transactions
function getUserTransactions() {
    const user = getCurrentUser();
    if (!user) return [];
    const all = JSON.parse(localStorage.getItem('et_transactions')) || [];
    return all.filter(t => t.userId === user.id);
}

// Fetch Categories
function getCategories() {
    return JSON.parse(localStorage.getItem('et_categories')) || [];
}

// Add Transaction
function addTransaction(type, categoryId, amount, description, date) {
    const user = getCurrentUser();
    const transactions = JSON.parse(localStorage.getItem('et_transactions')) || [];
    const categories = getCategories();
    const category = categories.find(c => c.id == categoryId);

    const newTx = {
        id: Date.now(),
        userId: user.id,
        type: type,
        categoryId: parseInt(categoryId),
        categoryName: category ? category.name : 'Uncategorized',
        amount: parseFloat(amount),
        description: description,
        date: date
    };

    transactions.push(newTx);
    localStorage.setItem('et_transactions', JSON.stringify(transactions));
}

// Delete Transaction
function deleteTransaction(id) {
    let transactions = JSON.parse(localStorage.getItem('et_transactions')) || [];
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('et_transactions', JSON.stringify(transactions));
}

// Update Transaction
function updateTransaction(id, type, categoryId, amount, description, date) {
    let transactions = JSON.parse(localStorage.getItem('et_transactions')) || [];
    const index = transactions.findIndex(t => t.id == id);
    if (index !== -1) {
        const categories = getCategories();
        const category = categories.find(c => c.id == categoryId);
        transactions[index] = {
            ...transactions[index],
            type,
            categoryId: parseInt(categoryId),
            categoryName: category ? category.name : 'Uncategorized',
            amount: parseFloat(amount),
            description,
            date
        };
        localStorage.setItem('et_transactions', JSON.stringify(transactions));
    }
}

// Calculate Dashboard Summary Metrics
function calculateSummary() {
    const txs = getUserTransactions();
    let totalIncome = 0;
    let totalExpense = 0;

    txs.forEach(t => {
        if (t.type === 'Income') totalIncome += t.amount;
        if (t.type === 'Expense') totalExpense += t.amount;
    });

    return {
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
        count: txs.length
    };
}