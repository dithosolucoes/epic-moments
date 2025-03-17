function Scanner() {
    try {
        const [videoUrl, setVideoUrl] = React.useState(null);
        const [showVideo, setShowVideo] = React.useState(false);
        const [videoPosition, setVideoPosition] = React.useState({ x: 0, y: 0 });

        const handleQRCodeDetected = async (url) => {
            try {
                const videoId = url.split('/video/')[1];
                if (!videoId) return;

                const video = await trickleGetObject('video', videoId);
                if (video?.objectData?.url) {
                    setVideoUrl(video.objectData.url);
                    setShowVideo(true);
                    // Position video near the QR code (center of screen initially)
                    setVideoPosition({
                        x: window.innerWidth / 2 - 160,
                        y: window.innerHeight / 2 - 90
                    });
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        return (
            <div data-name="scanner-page">
                <ARCamera onQRCodeDetected={handleQRCodeDetected} />
                
                {showVideo && videoUrl && (
                    <div 
                        className="ar-video"
                        style={{
                            width: '320px',
                            height: '180px',
                            left: `${videoPosition.x}px`,
                            top: `${videoPosition.y}px`
                        }}
                    >
                        <VideoPlayer
                            url={videoUrl}
                            autoPlay={true}
                            controls={false}
                        />
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
                            onClick={() => setShowVideo(false)}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Scanner page error:', error);
        reportError(error);
        return null;
    }
}
