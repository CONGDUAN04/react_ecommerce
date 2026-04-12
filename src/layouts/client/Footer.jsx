const Footer = () => {
    return (
        <footer className="bg-white mt-16 border-t">
            <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
                <div>
                    <h4 className="font-bold text-[#e53935] text-lg">
                        TechZone
                    </h4>
                    <p className="text-gray-600 mt-2">
                        Nền tảng bán lẻ thiết bị công nghệ hiện đại
                    </p>
                </div>

                <div>
                    <h5 className="font-semibold mb-3">Hỗ trợ</h5>
                    <p>Hotline: 1900 9999</p>
                    <p>Email: support@techzone.vn</p>
                </div>

                <div>
                    <h5 className="font-semibold mb-3">Chính sách</h5>
                    <p>Bảo hành</p>
                    <p>Đổi trả</p>
                    <p>Thanh toán</p>
                </div>

                <div>
                    <h5 className="font-semibold mb-3">Theo dõi</h5>
                    <p>Facebook</p>
                    <p>YouTube</p>
                    <p>TikTok</p>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 py-4 border-t">
                © 2024 TechZone – Modern E-commerce UI
            </div>
        </footer>
    );
};
export default Footer;
