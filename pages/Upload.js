function Upload({ navigate }) {
    try {
        const [formData, setFormData] = React.useState({
            title: '',
            description: '',
            url: ''
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

        const validateVimeoUrl = (url) => {
            const vimeoRegex = /^(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
            return vimeoRegex.test(url);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');

            if (!validateVimeoUrl(formData.url)) {
                setError('Please enter a valid Vimeo URL');
                return;
            }

            setIsLoading(true);

            try {
                await saveVideo(formData);
                navigate('/dashboard');
            } catch (error) {
                setError('Failed to save video. Please try again.');
                console.error('Upload error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="max-w-2xl mx-auto p-4" data-name="upload">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">Add New Video</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-name="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} data-name="upload-form">
                        <Input
                            type="text"
                            label="Video Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter video title"
                        />

                        <Input
                            type="text"
                            label="Vimeo URL"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            required
                            placeholder="Enter Vimeo video URL"
                        />

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Enter video description"
                            ></textarea>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Saving...
                                    </div>
                                ) : 'Save Video'}
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/dashboard')}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Upload page error:', error);
        reportError(error);
        return null;
    }
}
