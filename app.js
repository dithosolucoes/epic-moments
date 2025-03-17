function App() {
    try {
        return (
            <div className="min-h-screen flex flex-col" data-name="app">
                <Navbar />
                <main className="flex-grow">
                    <Router />
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

function Router() {
    try {
        const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

        React.useEffect(() => {
            const handlePathChange = () => setCurrentPath(window.location.pathname);
            window.addEventListener('popstate', handlePathChange);
            return () => window.removeEventListener('popstate', handlePathChange);
        }, []);

        const navigate = (path) => {
            window.history.pushState({}, '', path);
            setCurrentPath(path);
        };

        if (!isAuthenticated() && (currentPath === '/dashboard' || currentPath === '/upload')) {
            navigate('/login');
            return null;
        }

        switch (currentPath) {
            case '/':
                return <Home />;
            case '/login':
                return <Login />;
            case '/register':
                return <Register />;
            case '/dashboard':
                return <Dashboard navigate={navigate} />;
            case '/upload':
                return <Upload navigate={navigate} />;
            case '/scan':
                return <Scanner />;
            default:
                if (currentPath.startsWith('/video/')) {
                    const videoId = currentPath.split('/')[2];
                    return <Scanner videoId={videoId} />;
                }
                return (
                    <div className="flex items-center justify-center h-screen">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">404</h1>
                            <p className="text-xl mb-4">Page not found</p>
                            <Button onClick={() => navigate('/')}>Go Home</Button>
                        </div>
                    </div>
                );
        }
    } catch (error) {
        console.error('Router error:', error);
        reportError(error);
        return null;
    }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
