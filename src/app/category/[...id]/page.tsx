"use client"
import ProductCard from '@/components/Card'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const params = useParams();
    const category = decodeURIComponent(params.id[0]);

    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3001/products');
            return res.json();
        }
    });

    const filteredProducts = products?.filter((product: any) => product.category === category);
    console.log(filteredProducts);

    if (isLoading) {
        return <div className="text-center text-gray-500 py-10">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-20">
            {filteredProducts &&
                filteredProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>

    );
}

export default Page;
