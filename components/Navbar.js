function Navbar() {
    try {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);

        React.useEffect(() => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        }, []);

        const handleLogout = () => {
            localStorage.removeItem('token');
            window.location.href = '/';
        };

        return (
            <nav className="bg-secondary" data-name="navbar">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="/" className="text-primary text-xl font-bold" data-name="logo">
                                Epic Moments
                            </a>
                        </div>
                        
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {isLoggedIn ? (
                                    <div className="flex gap-4" data-name="nav-authenticated">
                                        <a href="/dashboard" className="text-light hover:text-primary px-3 py-2 rounded-md">Dashboard</a>
                                        <button onClick={handleLogout} className="text-light hover:text-primary px-3 py-2 rounded-md">Logout</button>
                                    </div>
                                ) : (
                                    <div className="flex gap-4" data-name="nav-unauthenticated">
                                        <a href="/login" className="text-light hover:text-primary px-3 py-2 rounded-md">Login</a>
                                        <a href="/register" className="text-light hover:text-primary px-3 py-2 rounded-md">Register</a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-light hover:text-primary"
                                data-name="mobile-menu-button"
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden" data-name="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {isLoggedIn ? (
                                <div className="flex flex-col">
                                    <a href="/dashboard" className="text-light hover:text-primary block px-3 py-2">Dashboard</a>
                                    <button onClick={handleLogout} className="text-light hover:text-primary block px-3 py-2 text-left">Logout</button>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <a href="/login" className="text-light hover:text-primary block px-3 py-2">Login</a>
                                    <a href="/register" className="text-light hover:text-primary block px-3 py-2">Register</a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        );
    } catch (error) {
        console.error('Navbar error:', error);
        reportError(error);
        return null;
    }
}
