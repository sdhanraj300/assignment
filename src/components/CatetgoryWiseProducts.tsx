"use client"
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import ProductCard from "./Card";

const CategoryWiseProducts = ({ category }: { category: string }) => {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products', category],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/products');
            return response.json();
        },
        enabled: !!category,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const filteredProducts = products?.filter((product: any) => product.category === category).slice(0, 3);
    return (
        <div>
            <h2 className="text-2xl font-bold mt-10">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product: any) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
}

export default CategoryWiseProducts;
