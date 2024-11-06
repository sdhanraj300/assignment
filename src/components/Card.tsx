import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useCartStore } from '@/store/useCartStore'
import toast from 'react-hot-toast'

const ProductCard = ({ product }: { product: any }) => {
    const addToCart = useCartStore(state => state.addToCart)
    const handelAddToCart = () => {
        toast.success('Product added to cart')
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image
        })
    }

    return (
        <Card key={product.id} className="shadow-md hover:shadow-lg transition-shadow h-full flex flex-col rounded-[28px] overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <CardHeader className="p-0 relative">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="w-full pt-2 h-48 object-contain rounded-[28px]"
                    />
                </CardHeader>
            </Link>
            <CardContent className="p-4 flex flex-col justify-between flex-grow">
                <CardTitle className="text-lg font-semibold mb-2">{product.title}</CardTitle>
                <p className="text-gray-600 text-lg font-medium">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4">
                <Button onClick={handelAddToCart} className="w-full bg-green-500 text-white font-bold py-2 rounded-[28px] hover:bg-green-600 transition">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
