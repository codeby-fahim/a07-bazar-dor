


'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';

interface Change {
  dir: string;
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
}

interface CategoryClientProps {
  initialProducts: Product[];
  categoryId: string;
}

export default function CategoryClient({ initialProducts, categoryId }: CategoryClientProps) {
  const [sortOrder, setSortOrder] = useState<string>('default');

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortOrder === 'low-to-high') {
      return a.today - b.today; 
    } else if (sortOrder === 'high-to-low') {
      return b.today - a.today; 
    }
    return 0; 
  });

  const categoryName = initialProducts.length > 0 ? initialProducts[0].categoryNameBn : categoryId;
  const categoryIcon = initialProducts.length > 0 ? initialProducts[0].categoryIcon : '📦';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 space-y-6">
      <div className="bg-[#f8faf8] border border-gray-200/80 rounded-2xl p-4 sm:p-6 shadow-sm flex items-center gap-4">
        <span className="text-2xl sm:text-3xl p-2.5 sm:p-3 bg-white rounded-xl border border-gray-100 shadow-xs shrink-0">
          {categoryIcon}
        </span>
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            {categoryName}
          </h1>
          <p className="text-xs md:text-sm text-gray-500">
            {initialProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      
      <div className="bg-[#f8faf8] border border-gray-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
        <span className="text-xs sm:text-sm text-gray-600">
          মোট {initialProducts.length}টি পণ্য দেখানো হচ্ছে
        </span>
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <span className="text-sm font-medium text-gray-700">সাজান</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম থেকে বেশি</option>
            <option value="high-to-low">বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {sortedProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}