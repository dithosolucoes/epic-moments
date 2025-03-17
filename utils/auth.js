async function login(email, password) {
    try {
        const response = await trickleCreateObject('auth-session', { email, password });
        if (response?.objectId) {
            localStorage.setItem('token', response.objectId);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Failed to login');
    }
}

async function register(email, password, name) {
    try {
        const response = await trickleCreateObject('user', { email, password, name });
        if (response?.objectId) {
            return await login(email, password);
        }
        return false;
    } catch (error) {
        console.error('Register error:', error);
        throw new Error('Failed to register');
    }
}

function isAuthenticated() {
    return !!localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}
