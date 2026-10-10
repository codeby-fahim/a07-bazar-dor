// import React from 'react';

// const AllProduct = async() => {
//   const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {cache:'force-cache'});
//   const data = res.json();
//   return (
//     <div>
      
//     </div>
//   );
// };

// export default AllProduct;

import React from 'react';

// টাইপ ইন্টারফেস ডিফাইন করা
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

const AllProduct = async () => {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
    cache: 'force-cache',
  });
  const products: Product[] = await res.json();

  // ফিল্টার মেথড ব্যবহার করে দাম বাড়া এবং কমা পণ্যগুলো আলাদা করা
  const priceIncreased = products.filter((item) => item.change.dir === 'up');
  const priceDecreased = products.filter((item) => item.change.dir === 'down');

  // প্রোডাক্ট কার্ড রেন্ডার করার জন্য একটি রিইউজেবল ফাংশন/কম্পোনেন্ট
  const renderProductCard = (item: Product) => {
    const isUp = item.change.dir === 'up';
    const isNeutral = !item.change.dir || item.change.pct === 0;

    return (
      <div
        key={item.id}
        className="bg-[#f8faf8] border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow transition-shadow"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-xl p-2 bg-white rounded-lg border border-gray-100 shadow-xs">
            {item.image || item.categoryIcon}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">
              {item.nameBn}
            </h3>
            <span className="text-xs text-gray-500">
              প্রতি {item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-2.5 mt-1">
          <div>
            <span className="text-xs text-gray-500 block">আজকের দাম</span>
            <span className="font-bold text-gray-800 text-base">
              {item.today} টাকা
            </span>
          </div>

          <span
            className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded ${
              isNeutral
                ? 'text-gray-500 bg-gray-100'
                : isUp
                ? 'text-red-600 bg-red-50'
                : 'text-green-600 bg-green-50'
            }`}
          >
            {isNeutral ? '' : isUp ? '▲ ' : '▼ '}
            {item.change.pct}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      
      {/* ১. আজ দাম বেড়েছে সেকশন */}
      {priceIncreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg">▲</span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceIncreased.map((item) => renderProductCard(item))}
          </div>
        </div>
      )}

      {/* ২. আজ দাম কমেছে সেকশন */}
      {priceDecreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-lg">▼</span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {priceDecreased.map((item) => renderProductCard(item))}
          </div>
        </div>
      )}

      {/* ৩. সব পণ্য সেকশন */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => renderProductCard(item))}
        </div>
      </div>

    </div>
  );
};

export default AllProduct;