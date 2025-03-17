function Register() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
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

            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            setIsLoading(true);

            try {
                const success = await register(formData.email, formData.password, formData.name);
                if (success) {
                    window.location.href = '/dashboard';
                } else {
                    setError('Failed to create account');
                }
            } catch (error) {
                setError('Failed to register. Please try again.');
                console.error('Register error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="auth-container" data-name="register">
                <div className="auth-card">
                    <h1 className="auth-title" data-name="register-title">Create Account</h1>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-name="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} data-name="register-form">
                        <Input
                            type="text"
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />

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
                            placeholder="Create a password"
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                        />

                        <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={isLoading}
                            data-name="submit-button"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-gray-600" data-name="login-link">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Register page error:', error);
        reportError(error);
        return null;
    }
}
