import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";

import { getHomeProductsAPI } from "../../../services/api.services.js";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomePageUser = () => {
    const banners = [banner1, banner2];
    const [currentBanner, setCurrentBanner] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) =>
                prev === banners.length - 1 ? 0 : prev + 1
            );
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getHomeProductsAPI();
                if (res.ErrorCode === 0) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.error("Fetch home products error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const formatPrice = (price) =>
        Number(price || 0).toLocaleString("vi-VN") + "₫";

    return (
        <>
            <section className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-4xl font-black leading-tight">
                        Công nghệ mới <br /> cho cuộc sống hiện đại
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Sản phẩm chính hãng – Giá tốt
                    </p>
                    <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold">
                        Mua ngay
                    </button>
                </div>

                <div className="relative h-[300px] overflow-hidden rounded-2xl shadow">
                    <img
                        src={banners[currentBanner]}
                        alt="Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <button
                        onClick={() =>
                            setCurrentBanner(
                                currentBanner === 0
                                    ? banners.length - 1
                                    : currentBanner - 1
                            )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={() =>
                            setCurrentBanner(
                                currentBanner === banners.length - 1
                                    ? 0
                                    : currentBanner + 1
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
                    >
                        <ChevronRight />
                    </button>
                </div>
            </section>
            {/* ===== CATEGORIES ===== */}
            <section className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                    {[
                        "Apple",
                        "💻 Laptop",
                        "⌚ Đồng hồ",
                        "🎧 Phụ kiện",
                        "📺 TV",
                        "🧊 Điện lạnh"
                    ].map((c, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl py-5 shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                            {c}
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== PRODUCTS ===== */}
            <section className="max-w-7xl mx-auto px-4 mt-14">
                <h3 className="text-xl font-bold mb-4">🔥 Sản phẩm mới</h3>

                {loading ? (
                    <div className="text-center text-gray-500">
                        Đang tải sản phẩm...
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                            >
                                <img
                                    src={`${BACKEND_URL}/images/product/${product.thumbnail}`}
                                    alt={product.name}
                                    className="h-40 mx-auto object-contain"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/200?text=No+Image";
                                    }}
                                />

                                <h4 className="text-sm font-semibold mt-3 line-clamp-2">
                                    {product.name}
                                </h4>

                                <div className="mt-2 text-red-600 font-bold">
                                    {formatPrice(product.price)}
                                </div>

                                <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-sm">
                                    Thêm vào giỏ
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default HomePageUser;