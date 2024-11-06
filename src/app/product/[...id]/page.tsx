"use client";
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { TruckIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/useCartStore';

const ProductPage = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState<string>('Small');
  const [pincode, setPincode] = useState<string>('');
  const [delivery, setDelivery] = useState<boolean>(false);
  const { data: product, error, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/products/${id}`);
      return res.json();
    },
    enabled: !!id,
  });

  const sizes = product?.sizes || [
    { label: 'Small', price: 10 },
    { label: 'Medium', price: 20 },
    { label: 'Large', price: 30 },
    { label: 'XL', price: 40 },
  ];

  const price = product && selectedSize
    ? sizes.find((size: any) => size.label === selectedSize)?.price || product.price
    : 0;

  const handlePincheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDelivery(true);
    }
    else {
      alert('Please enter a valid 6-digit pincode');
    }
  };
  const handleCartAdd = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price,
      quantity: 1,
      image: product.image,
    });
  }
  if (isLoading) {
    return <div className="text-center text-gray-500 py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-12 px-4">
      <Card className="shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden bg-white transition-transform duration-300 transform hover:scale-105">
        <CardHeader className="md:w-1/2 flex justify-center p-6 bg-gray-50 border-r">
          <Image
            src={product?.image || ''}
            alt={product?.title || 'Product Image'}
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
        </CardHeader>
        <CardContent className="md:w-1/2 p-8">
          <CardTitle className="text-3xl font-extrabold text-gray-800 mb-4">{product?.title}</CardTitle>
          <p className="text-2xl text-green-600 font-semibold">${price.toFixed(2)}</p>
          <p className="text-gray-600 mt-4 leading-relaxed">{product?.description}</p>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-700">Select Size</h4>
            <div className="flex gap-4 mt-3">
              {sizes.map((size: any) => (
                <Button
                  key={size.label}
                  onClick={() => setSelectedSize(size.label)}
                  className={`px-5 py-2 rounded-full transition-colors duration-200 ${selectedSize === size.label
                    ? 'bg-blue-600 hover:bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {size.label}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleCartAdd} className="mt-8 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 transition">
            Add to Cart - ${price.toFixed(2)}
          </Button>

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex items-center text-lg font-semibold text-gray-800">
              <TruckIcon size={24} className="mr-2 text-green-500" />
              Delivery Options
            </div>
            <form onSubmit={handlePincheck} className="flex  items-center border-2 border-gray-300 rounded-[28px] overflow-hidden">
              <Input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 p-3 outline-none border-none rounded-l-lg focus:ring-0"
                placeholder="Enter your pincode"
              />
              <Button
                type="submit"
                className="w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-md rounded-none rounded-r-lg hover:from-green-600 hover:to-green-700 transition-colors duration-200"
              >
                Check
              </Button>
            </form>
          </div>

          {
            delivery && (
              <div className="mt-4 font-bold text-gray-600">
                <p>Delivery available at your location</p>
                <p>Expected delivery in 3-5 days</p>
              </div>
            )
          }
          <div className='text-md font-semibold mt-3 flex flex-col'>
            <p>
              100% Original Products
            </p>
            <p>
              Pay on delivery might be available
            </p>
            <p>
              Easy 14 days returns and exchanges
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
