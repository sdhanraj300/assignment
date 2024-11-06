"use client"
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore'; 
import React from 'react';

const OrderConfirmationPage = () => {
    const router = useRouter();

    const cart = useCartStore((state) => state.cart);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto pt-20 min-h-screen p-6 max-w-4xl bg-white rounded-[28px] shadow-lg">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Order Confirmation</h1>

            <div className="mb-6">
                <p className="text-xl font-semibold">Thank you for your purchase!</p>
                <p className="text-lg text-gray-700 mt-2">Your order has been successfully placed.</p>
                <div className="mt-4">
                    <p className="text-lg font-semibold">Total Amount: <span className="text-blue-600">${totalAmount.toFixed(2)}</span></p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                <div className="mt-4 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <p>{item.title} x{item.quantity}</p>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => router.push('/')}
                className="w-full py-3 mt-4 rounded-[28px] text-white font-bold bg-blue-500 hover:bg-blue-600 transition"
            >
                Go to Homepage
            </button>
        </div>
    );
};

export default OrderConfirmationPage;
