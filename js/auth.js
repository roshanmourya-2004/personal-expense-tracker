// Default categories seed data
const DEFAULT_CATEGORIES = [
    { id: 1, name: 'Salary', type: 'Income' },
    { id: 2, name: 'Freelancing', type: 'Income' },
    { id: 3, name: 'Scholarship', type: 'Income' },
    { id: 4, name: 'Business', type: 'Income' },
    { id: 5, name: 'Investment', type: 'Income' },
    { id: 6, name: 'Other Income', type: 'Income' },
    { id: 7, name: 'Food', type: 'Expense' },
    { id: 8, name: 'Travel', type: 'Expense' },
    { id: 9, name: 'Education', type: 'Expense' },
    { id: 10, name: 'Shopping', type: 'Expense' },
    { id: 11, name: 'Mobile Recharge', type: 'Expense' },
    { id: 12, name: 'Electricity Bill', type: 'Expense' },
    { id: 13, name: 'Entertainment', type: 'Expense' },
    { id: 14, name: 'Medical', type: 'Expense' },
    { id: 15, name: 'Rent', type: 'Expense' },
    { id: 16, name: 'Other Expense', type: 'Expense' }
];

// Initialize Storage Databases if missing
function initStorage() {
    if (!localStorage.getItem('et_users')) {
        localStorage.setItem('et_users', JSON.stringify([]));
    }
    if (!localStorage.getItem('et_transactions')) {
        localStorage.setItem('et_transactions', JSON.stringify([]));
    }
    if (!localStorage.getItem('et_categories')) {
        localStorage.setItem('et_categories', JSON.stringify(DEFAULT_CATEGORIES));
    }
}

initStorage();

// Register User
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('et_users'));
    if (users.some(u => u.email === email)) {
        return { success: false, message: 'Email address is already registered.' };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('et_users', JSON.stringify(users));
    return { success: true };
}

// Login User
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('et_users'));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('et_session', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
        return { success: true };
    }
    return { success: false, message: 'Invalid email or password.' };
}

// Get Logged In User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('et_session'));
}

// Logout
function logoutUser() {
    localStorage.removeItem('et_session');
    window.location.href = 'login.html';
}

// Auth Guard Middleware
function checkAuth() {
    const user = getCurrentUser();
    if (!user && !window.location.pathname.endsWith('login.html') && !window.location.pathname.endsWith('register.html') && !window.location.pathname.endsWith('index.html')) {
        window.location.href = 'login.html';
    }
}