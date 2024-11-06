"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PaymentPage = () => {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [errors, setErrors] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

    const validateInputs = () => {
        const newErrors = { cardNumber: '', expiryDate: '', cvv: '' };
        if (!cardNumber || cardNumber.length !== 16) newErrors.cardNumber = 'Enter a valid 16-digit card number';
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = 'Enter expiry date in MM/YY format';
        if (!cvv || cvv.length !== 3) newErrors.cvv = 'Enter a valid 3-digit CVV';
        setErrors(newErrors);
        return !newErrors.cardNumber && !newErrors.expiryDate && !newErrors.cvv;
    };

    const handlePayment = () => {
        if (!validateInputs()) return;
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            router.push('/order-confirmation');
        }, 2000);
    };

    return (
        <div className="container mx-auto mt-40 p-6 min-h-[500px] w-[700px] bg-white rounded-[28px] shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Mock Payment</h1>
            <form className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Payment Information</h2>
                    <Input
                        className={`border p-3 w-full mb-2 rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                        type="text"
                        placeholder="Card Number"
                        maxLength={16}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

                    <Input
                        className={`border p-3 w-full mb-2 rounded-lg ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                        type="text"
                        placeholder="Expiration Date (MM/YY)"
                        maxLength={5}
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}

                    <Input
                        className={`border p-3 w-full mb-2 rounded-lg ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                        type="text"
                        placeholder="CVV"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                    {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>

                <Button
                    type="button"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-[28px] text-white font-bold transition ${isProcessing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {isProcessing ? 'Processing...' : 'Confirm Payment'}
                </Button>
            </form>
        </div>
    );
};

export default PaymentPage;
