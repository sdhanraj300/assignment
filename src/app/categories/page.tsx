import CategoryCard from '@/components/CategoryCard'
import React from 'react'

const Page = () => {
    return (
        <div className="container w-full mx-auto mt-20 px-4">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800">
                    We have 4 different categories right now!
                </h1>
                <p className="text-gray-600 mt-2">Explore our diverse range of products!</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <CategoryCard category="men's clothing" />
                <CategoryCard category="women's clothing" />
                <CategoryCard category="jewelery" />
                <CategoryCard category="electronics" />
            </div>
        </div>
    )
}

export default Page
