function Login() {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: ''
        });
        const [error, setError] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(false);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setIsLoading(true);

            try {
                const success = await login(formData.email, formData.password);
                if (success) {
                    window.location.href = '/dashboard';
                } else {
                    setError('Invalid email or password');
                }
            } catch (error) {
                setError('Failed to login. Please try again.');
                console.error('Login error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="auth-container" data-name="login">
                <div className="auth-card">
                    <h1 className="auth-title" data-name="login-title">Welcome Back</h1>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-name="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} data-name="login-form">
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />

                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={isLoading}
                            data-name="submit-button"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-gray-600" data-name="register-link">
                        Don't have an account?{' '}
                        <a href="/register" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login page error:', error);
        reportError(error);
        return null;
    }
}
