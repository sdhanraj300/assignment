"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useCartStore } from '@/store/useCartStore';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cart = useCartStore(state => state.cart);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="flex gap-6 z-[99999] fixed top-0 w-full items-center justify-between px-8 py-4 bg-gray-900 text-white">
            <div className="flex items-center gap-6 justify-between w-full">
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-gray-300">
                        MockStore
                    </Link>
                </div>

                <button
                    className="md:hidden p-2"
                    onClick={toggleMobileMenu}
                >
                    <span className="text-2xl">&#9776;</span> {/* Hamburger Icon */}
                </button>
            </div>

            <div className="hidden md:flex space-x-6">
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/categories" className="hover:text-gray-300">Categories</Link>
            </div>

            <div className="flex gap-4 items-center space-x-2">
                <Link href="/cart" className="relative hover:bg-gray-800">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
                        {cart.length}
                    </span>
                </Link>
                <div className="hidden md:flex md:gap-4">
                    <LoginLink className=''>Sign in</LoginLink>

                    <RegisterLink>Sign up</RegisterLink>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-0 left-0 right-0 bg-gray-800 md:hidden py-4 space-y-4 text-center">
                    <Link href="/" className="block text-white hover:text-gray-300" onClick={toggleMobileMenu}>
                        Home
                    </Link>
                    <Link href="/categories" className="block text-white hover:text-gray-300" onClick={toggleMobileMenu}>
                        Categories
                    </Link>
                    <div className="flex flex-col space-y-4 mt-4">
                        <LoginLink className="w-full text-center">Sign in</LoginLink>
                        <RegisterLink className="w-full text-center">Sign up</RegisterLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
