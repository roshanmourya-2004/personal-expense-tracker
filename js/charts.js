function renderDashboardCharts() {
    const txs = getUserTransactions();

    // 1. Category Breakdown (Expenses)
    const expTxs = txs.filter(t => t.type === 'Expense');
    const catMap = {};
    expTxs.forEach(t => {
        catMap[t.categoryName] = (catMap[t.categoryName] || 0) + t.amount;
    });

    const ctxCat = document.getElementById('categoryChart')?.getContext('2d');
    if (ctxCat) {
        new Chart(ctxCat, {
            type: 'doughnut',
            data: {
                labels: Object.keys(catMap),
                datasets: [{
                    data: Object.values(catMap),
                    backgroundColor: ['#e74c3c', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#1abc9c', '#34495e']
                }]
            }
        });
    }

    // 2. Ratio Chart
    const summary = calculateSummary();
    const ctxRatio = document.getElementById('ratioChart')?.getContext('2d');
    if (ctxRatio) {
        new Chart(ctxRatio, {
            type: 'bar',
            data: {
                labels: ['Overview'],
                datasets: [
                    { label: 'Income', data: [summary.income], backgroundColor: '#2ecc71' },
                    { label: 'Expense', data: [summary.expense], backgroundColor: '#e74c3c' }
                ]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
    }
}