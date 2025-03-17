function Button({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) {
    try {
        const baseClasses = 'px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out';
        const variants = {
            primary: 'bg-primary text-secondary hover:bg-opacity-90',
            secondary: 'bg-secondary text-light hover:bg-opacity-90',
            outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-secondary'
        };

        return (
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                data-name="button"
            >
                {children}
            </button>
        );
    } catch (error) {
        console.error('Button error:', error);
        reportError(error);
        return null;
    }
}
