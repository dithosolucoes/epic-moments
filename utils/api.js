async function generateQRCode(videoUrl) {
    try {
        const response = await trickleCreateObject('qr-code', { videoUrl });
        return response;
    } catch (error) {
        console.error('QR Code generation error:', error);
        throw new Error('Failed to generate QR code');
    }
}

async function saveVideo(videoData) {
    try {
        const response = await trickleCreateObject('video', videoData);
        return response;
    } catch (error) {
        console.error('Save video error:', error);
        throw new Error('Failed to save video');
    }
}

async function getVideos() {
    try {
        const response = await trickleListObjects('video', 100, true);
        return response.items;
    } catch (error) {
        console.error('Get videos error:', error);
        throw new Error('Failed to fetch videos');
    }
}

async function getVideoStats(videoId) {
    try {
        const response = await trickleGetObject('video-stats', videoId);
        return response;
    } catch (error) {
        console.error('Get video stats error:', error);
        throw new Error('Failed to fetch video stats');
    }
}
