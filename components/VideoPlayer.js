function VideoPlayer({ url, autoPlay = false, controls = true }) {
    try {
        // Extract Vimeo video ID from URL
        const getVimeoId = (url) => {
            const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
            return match ? match[1] : null;
        };

        const videoId = getVimeoId(url);

        if (!videoId) {
            return (
                <div className="flex items-center justify-center bg-gray-900 h-full" data-name="video-error">
                    <p className="text-white">Invalid Vimeo URL</p>
                </div>
            );
        }

        const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&controls=${controls ? 1 : 0}`;

        return (
            <div className="relative w-full h-0 pb-[56.25%]" data-name="video-container">
                <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    data-name="video-iframe"
                ></iframe>
            </div>
        );
    } catch (error) {
        console.error('Video player error:', error);
        reportError(error);
        return null;
    }
}
