function ARCamera({ onQRCodeDetected }) {
    try {
        const videoRef = React.useRef(null);
        const canvasRef = React.useRef(null);
        const [hasPermission, setHasPermission] = React.useState(false);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            startCamera();
            return () => {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop());
                }
            };
        }, []);

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasPermission(true);
                }
            } catch (err) {
                setError('Unable to access camera. Please make sure you have granted camera permissions.');
                console.error('Camera access error:', err);
            }
        };

        const scanQRCode = () => {
            if (!canvasRef.current || !videoRef.current) return;

            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext('2d');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                onQRCodeDetected(code.data);
            }
        };

        React.useEffect(() => {
            if (hasPermission) {
                const interval = setInterval(scanQRCode, 1000);
                return () => clearInterval(interval);
            }
        }, [hasPermission]);

        if (error) {
            return (
                <div className="scanner-container bg-secondary flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
                        <p>{error}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="scanner-container" data-name="ar-camera">
                <video
                    ref={videoRef}
                    className="camera-view"
                    autoPlay
                    playsInline
                    muted
                />
                <canvas
                    ref={canvasRef}
                    className="hidden"
                />
                <div className="scanner-overlay"></div>
                <div className="scanner-guide">
                    Point your camera at a QR code to view the video
                </div>
            </div>
        );
    } catch (error) {
        console.error('AR Camera error:', error);
        reportError(error);
        return null;
    }
}
