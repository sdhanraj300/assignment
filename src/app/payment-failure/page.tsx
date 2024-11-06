"use client";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const PaymentFailurePage = () => {
    const router = useRouter();

    const handleRetryPayment = () => {
        router.push('/payment');
    };

    const handleGoBackToCart = () => {
        router.push('/cart');
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-500">Payment Failed</h1>
            <p className="text-gray-600 mb-6">Oops, something went wrong with your payment. Please try again.</p>

            <div className="flex justify-center gap-4">
                <Button
                    onClick={handleRetryPayment}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Retry Payment
                </Button>

                <Button
                    onClick={handleGoBackToCart}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
                >
                    Go Back to Cart
                </Button>
            </div>
        </div>
    );
};

export default PaymentFailurePage;
