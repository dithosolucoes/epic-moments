function Home() {
    try {
        return (
            <div className="min-h-screen" data-name="home">
                <section className="bg-secondary py-20" data-name="hero">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6" data-name="hero-title">
                                Transform Your Videos into Interactive AR Experiences
                            </h1>
                            <p className="text-light text-lg md:text-xl mb-8" data-name="hero-subtitle">
                                Generate QR codes that bring your Vimeo videos to life with augmented reality
                            </p>
                            <Button 
                                onClick={() => window.location.href = '/register'}
                                className="text-lg px-8 py-3"
                                data-name="cta-button"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-16" data-name="features">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center mb-12" data-name="features-title">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6" data-name="feature-1">
                                <div className="text-4xl text-primary mb-4">
                                    <i className="fas fa-upload"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Your Video</h3>
                                <p className="text-gray-600">Share your Vimeo video link and create an interactive experience</p>
                            </div>
                            <div className="text-center p-6" data-name="feature-2">
                                <div className="text-4xl text-primary mb-4">
                                    <i className="fas fa-qrcode"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Generate QR Code</h3>
                                <p className="text-gray-600">Get your unique QR code instantly, ready to be shared or printed</p>
                            </div>
                            <div className="text-center p-6" data-name="feature-3">
                                <div className="text-4xl text-primary mb-4">
                                    <i className="fas fa-mobile-alt"></i>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Experience AR</h3>
                                <p className="text-gray-600">Watch your video come to life through augmented reality</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-16" data-name="cta">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-6" data-name="cta-title">
                            Ready to Create Your Epic Moment?
                        </h2>
                        <p className="text-gray-600 mb-8" data-name="cta-subtitle">
                            Join thousands of creators who are revolutionizing video sharing
                        </p>
                        <Button 
                            onClick={() => window.location.href = '/register'}
                            variant="primary"
                            className="text-lg px-8 py-3"
                            data-name="cta-button"
                        >
                            Start Free Trial
                        </Button>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('Home page error:', error);
        reportError(error);
        return null;
    }
}
