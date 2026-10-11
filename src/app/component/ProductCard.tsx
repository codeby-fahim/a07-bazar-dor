


import Link from 'next/link';

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

const ProductCard = ({item}:{item:Product}) => {
  const isUp = item.change.dir === 'up';
  const isNeutral = !item.change.dir || item.change.pct === 0;
  
  return (
    <Link href={`/productDetail/${item.id}`} className="block h-full">
      <div
        key={item.id}
        className="bg-[#f8faf8] border border-gray-200/80 rounded-xl p-3 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full"
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-lg sm:text-xl p-2 bg-white rounded-lg border border-gray-100 shadow-xs shrink-0">
            {item.image || item.categoryIcon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {item.nameBn}
            </h3>
            <span className="text-xs text-gray-500 block">
              প্রতি {item.unit === 'kg' ? 'কেজি' : item.unit === 'litre' ? 'লিটার' : item.unit}
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-2.5 mt-1 gap-2">
          <div>
            <span className="text-[11px] sm:text-xs text-gray-500 block">আজকের দাম</span>
            <span className="font-bold text-gray-800 text-sm sm:text-base whitespace-nowrap">
              {item.today} টাকা
            </span>
          </div>

          <span
            className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded shrink-0 ${
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
    </Link>
  );
};

export default ProductCard;