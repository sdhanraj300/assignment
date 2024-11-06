"use client"
import { useCartStore } from '@/store/useCartStore';
import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const CartPage = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const reduceQuantity = useCartStore((state) => state.reduceQuantity);
    const clearCart = useCartStore((state) => state.clearCart);

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">Your cart is empty</div>
        )
    }

    return (
        <div className="rounded-[28px] container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 gap-6">
                {cart.map((item) => (
                    <div key={item.id} className="flex rounded-[28px] items-center justify-between p-4 border border-gray-200 shadow-md">
                        <Image src={item.image} alt={item.title} width={100} height={100} />
                        <div>
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                className="bg-red-500 text-white px-4 py-2 rounded-[28px] hover:bg-red-600 transition"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                            <Button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-[28px] hover:bg-yellow-600 transition"
                                onClick={() => reduceQuantity(item.id)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </Button>
                            <Button
                                className="bg-blue-500 text-white px-4 py-2 rounded-[28px] hover:bg-blue-600 transition"
                                onClick={() => useCartStore.getState().addToCart({ ...item, quantity: 1 })}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                <div className="text-2xl font-bold">
                    Total Amount: ${totalAmount.toFixed(2)}
                </div>
                <div className="flex gap-4">
                    <Button
                        className="bg-red-500 text-white px-6 py-2 rounded-[28px] hover:bg-red-600 transition"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </Button>
                    <Link
                        href={'/checkout'}
                        className="bg-green-500 text-white px-6 py-2 rounded-[28px] hover:bg-green-600 transition"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
