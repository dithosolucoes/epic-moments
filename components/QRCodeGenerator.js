function QRCodeGenerator({ url }) {
    try {
        const qrRef = React.useRef();
        const [qrImage, setQrImage] = React.useState('');

        React.useEffect(() => {
            generateQR();
        }, [url]);

        const generateQR = () => {
            if (!qrRef.current) return;

            new QRCode(qrRef.current, {
                text: url,
                width: 256,
                height: 256,
                colorDark: '#1A1A1A',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H
            });

            // Get the generated QR code as an image
            setTimeout(() => {
                const canvas = qrRef.current.querySelector('canvas');
                if (canvas) {
                    setQrImage(canvas.toDataURL('image/png'));
                }
            }, 100);
        };

        const downloadQR = () => {
            if (!qrImage) return;

            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = qrImage;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        return (
            <div className="text-center" data-name="qr-generator">
                <div ref={qrRef} className="inline-block mb-4" data-name="qr-container"></div>
                
                {qrImage && (
                    <div className="flex justify-center gap-4" data-name="qr-actions">
                        <Button onClick={downloadQR} variant="outline" className="text-sm">
                            <i className="fas fa-download mr-2"></i>
                            Download QR Code
                        </Button>
                        <Button
                            onClick={() => navigator.clipboard.writeText(url)}
                            variant="outline"
                            className="text-sm"
                        >
                            <i className="fas fa-link mr-2"></i>
                            Copy Link
                        </Button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('QR generator error:', error);
        reportError(error);
        return null;
    }
}
