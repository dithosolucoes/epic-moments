function Footer() {
    try {
        return (
            <footer className="bg-secondary mt-auto" data-name="footer">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-light mb-4 md:mb-0" data-name="footer-logo">
                            <span className="text-primary font-bold">Epic Moments</span>
                            <p className="text-sm mt-2">Create memorable AR video experiences</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8" data-name="footer-links">
                            <a href="/privacy" className="text-light hover:text-primary text-sm">Privacy Policy</a>
                            <a href="/terms" className="text-light hover:text-primary text-sm">Terms of Service</a>
                            <a href="/contact" className="text-light hover:text-primary text-sm">Contact Us</a>
                        </div>
                        
                        <div className="mt-4 md:mt-0" data-name="footer-social">
                            <div className="flex gap-4">
                                <a href="#" className="text-light hover:text-primary">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-light hover:text-primary">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="#" className="text-light hover:text-primary">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center text-light text-sm" data-name="footer-copyright">
                        © {new Date().getFullYear()} Epic Moments. All rights reserved.
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer error:', error);
        reportError(error);
        return null;
    }
}
