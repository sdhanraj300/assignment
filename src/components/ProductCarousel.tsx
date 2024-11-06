"use client";
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

const fetchProducts = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/products');
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
};

const ProductCarousel: React.FC = () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        enabled: true,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '40px',
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                },
            },
        ],
    };

    if (isLoading) {
        return <div className="text-center">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading products: {error.message}</div>;
    }

    return (
        <div className="mt-5 carousel-container">
            <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
            <Slider {...settings}>
                {products.slice(0, 10).map((product: any) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                        <div key={product.id} className="p-4">
                            <div className="h-[300px] bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-48 object-contain"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
};

export default ProductCarousel;
