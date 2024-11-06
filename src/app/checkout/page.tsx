"use client";
import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

const CheckoutPage = () => {
    const cart = useCartStore((state) => state.cart);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span>{item.title} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <input className="border p-2 w-full mb-2" type="text" placeholder="Full Name" />
                <input className="border p-2 w-full mb-2" type="text" placeholder="Address" />
                <input className="border p-2 w-full mb-2" type="text" placeholder="Phone Number" />
                <input className="border p-2 w-full" type="email" placeholder="Email" />
            </div>



            <Link href={'/payment'} className="w-full px-4 bg-green-500 text-white py-3 rounded-[28px] font-bold hover:bg-green-600">
                Proceed to Payment
            </Link>
        </div>
    );
};

export default CheckoutPage;
