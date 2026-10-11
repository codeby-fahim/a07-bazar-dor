



import ProductCard from "./ProductCard";



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

  
  const priceIncreased = products.filter((item) => item.change.dir === 'up');
  const priceDecreased = products.filter((item) => item.change.dir === 'down');

   

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10">
      
     
      {priceIncreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg">▲</span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {priceIncreased.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
          </div>
        </div>
      )}

      
      {priceDecreased.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-lg">▼</span>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {priceDecreased.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
          </div>
        </div>
      )}

     
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">সব পণ্য</h2>
          <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((item) => <ProductCard item={item} key={item.id}></ProductCard>)}
        </div>
      </div>

    </div>
  );
};

export default AllProduct;