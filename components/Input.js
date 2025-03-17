function Input({ 
    type = 'text',
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false,
    className = ''
}) {
    try {
        return (
            <div className="mb-4" data-name="input-container">
                {label && (
                    <label className="block text-gray-700 text-sm font-medium mb-2" data-name="input-label">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`
                        w-full px-3 py-2 border rounded-md
                        focus:outline-none focus:ring-2 focus:ring-primary
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        ${className}
                    `}
                    data-name="input-field"
                />
                {error && (
                    <p className="mt-1 text-red-500 text-sm" data-name="input-error">
                        {error}
                    </p>
                )}
            </div>
        );
    } catch (error) {
        console.error('Input error:', error);
        reportError(error);
        return null;
    }
}
