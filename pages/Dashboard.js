function Dashboard({ navigate }) {
    try {
        const [videos, setVideos] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        const [showQRModal, setShowQRModal] = React.useState(false);
        const [selectedVideo, setSelectedVideo] = React.useState(null);

        React.useEffect(() => {
            loadVideos();
        }, []);

        const loadVideos = async () => {
            try {
                const data = await getVideos();
                setVideos(data);
            } catch (error) {
                setError('Failed to load videos');
                console.error('Load videos error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleShowQR = (video) => {
            setSelectedVideo(video);
            setShowQRModal(true);
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

        return (
            <div className="dashboard-container" data-name="dashboard">
                <div className="flex justify-between items-center mb-8" data-name="dashboard-header">
                    <h1 className="text-3xl font-bold">Your Videos</h1>
                    <Button onClick={() => navigate('/upload')}>
                        <i className="fas fa-plus mr-2"></i>
                        Add New Video
                    </Button>
                </div>

                <div className="stats-grid" data-name="stats-section">
                    <Stats />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-name="error-message">
                        {error}
                    </div>
                )}

                <div className="video-grid" data-name="videos-grid">
                    {videos.map((video) => (
                        <div key={video.objectId} className="video-card" data-name="video-card">
                            <div className="aspect-w-16 aspect-h-9">
                                <VideoPlayer url={video.objectData.url} />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{video.objectData.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{video.objectData.description}</p>
                                <div className="flex justify-between items-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleShowQR(video)}
                                        className="text-sm"
                                    >
                                        <i className="fas fa-qrcode mr-2"></i>
                                        Show QR Code
                                    </Button>
                                    <span className="text-gray-500 text-sm">
                                        <i className="fas fa-eye mr-1"></i>
                                        {video.objectData.views || 0} views
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showQRModal && selectedVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" data-name="qr-modal">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">QR Code</h3>
                                <button
                                    onClick={() => setShowQRModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <QRCodeGenerator url={`${window.location.origin}/video/${selectedVideo.objectId}`} />
                            <Button
                                onClick={() => setShowQRModal(false)}
                                className="w-full mt-4"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Dashboard page error:', error);
        reportError(error);
        return null;
    }
}
