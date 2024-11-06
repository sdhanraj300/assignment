import Link from 'next/link'
import React from 'react'

const CategoryCard = ({ category }: { category: string }) => {
    return (
        <div>
            <div className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
                <Link href={`category/${category}`} className="text-xl font-semibold">{category}</Link>
            </div>
        </div>
    )
}

export default CategoryCard
