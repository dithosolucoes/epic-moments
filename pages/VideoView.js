function VideoView({ id }) {
    try {
        const [video, setVideo] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            loadVideo();
        }, [id]);

        const loadVideo = async () => {
            try {
                const response = await trickleGetObject('video', id);
                setVideo(response);
            } catch (error) {
                setError('Failed to load video');
                console.error('Load video error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-screen" data-name="loading">
                    <div className="text-primary text-4xl">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
            );
        }

        if (error || !video) {
            return (
                <div className="flex items-center justify-center h-screen" data-name="error">
                    <div className="text-center">
                        <div className="text-red-500 text-4xl mb-4">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Video Not Found</h1>
                        <p className="text-gray-600">The video you're looking for doesn't exist or has been removed.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-black" data-name="video-view">
                <div className="max-w-4xl mx-auto p-4">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden" data-name="video-player">
                        <VideoPlayer
                            url={video.objectData.url}
                            autoPlay
                            controls={false}
                        />
                    </div>
                    <div className="mt-4 text-white" data-name="video-info">
                        <h1 className="text-2xl font-bold mb-2">{video.objectData.title}</h1>
                        <p className="text-gray-400">{video.objectData.description}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Video view error:', error);
        reportError(error);
        return null;
    }
}
