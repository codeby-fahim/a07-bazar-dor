import ProductCard from "./ProductCard";


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
            {priceIncreased.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
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
            {priceDecreased.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
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
          {products.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
        </div>
      </div>

    </div>
  );
};

export default AllProduct;