function Stats() {
    try {
        const [stats, setStats] = React.useState({
            totalViews: 0,
            totalVideos: 0,
            activeQRCodes: 0
        });
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
            loadStats();
        }, []);

        const loadStats = async () => {
            try {
                const videos = await getVideos();
                const totalViews = videos.reduce((sum, video) => sum + (video.objectData.views || 0), 0);
                
                setStats({
                    totalViews,
                    totalVideos: videos.length,
                    activeQRCodes: videos.length
                });
            } catch (error) {
                console.error('Load stats error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isLoading) {
            return (
                <div className="stats-grid" data-name="stats-loading">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-lg animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            );
        }

        const statItems = [
            {
                icon: 'fa-eye',
                label: 'Total Views',
                value: stats.totalViews
            },
            {
                icon: 'fa-video',
                label: 'Total Videos',
                value: stats.totalVideos
            },
            {
                icon: 'fa-qrcode',
                label: 'Active QR Codes',
                value: stats.activeQRCodes
            }
        ];

        return (
            <React.Fragment>
                {statItems.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg" data-name={`stat-${index}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{item.label}</p>
                                <p className="text-3xl font-bold mt-1">{item.value}</p>
                            </div>
                            <div className="text-primary text-3xl">
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    } catch (error) {
        console.error('Stats component error:', error);
        reportError(error);
        return null;
    }
}
