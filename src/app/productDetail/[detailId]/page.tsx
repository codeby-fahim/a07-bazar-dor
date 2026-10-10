

// interface Market {
//   market: string;
//   division: string;
//   min: number;
//   max: number;
// }

// interface Change {
//   dir: string;
//   pct: number;
// }

// interface Product {
//   id: number;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn: string;
//   categoryIcon: string;
//   unit: string;
//   image: string;
//   today: number;
//   yesterday: number;
//   lastWeek: number;
//   lastMonth: number;
//   change: Change;
//   markets: Market[];
// }

// interface PageProps {
//   params: Promise<{
//     detailId: number;
//   }>;
// }



// const ProductDetailPage = async({params}:PageProps) => {
//   const {detailId} = await params;
//   const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${detailId}`, {cache:"force-cache"});
//   const data: Product = await res.json();
//   console.log(data);

//   return (
//     <div>
//       <h2>{data.category}</h2>
//     </div>
//   );
// };

// export default ProductDetailPage;



import Image from 'next/image';

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
}

interface PageProps {
  params: Promise<{
    detailId: number;
  }>;
}

// সংখ্যাগুলোকে বাংলায় রূপান্তর করার একটি ছোট ফাংশন
const toBengaliNumber = (num: number) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((d) => (bnDigits[parseInt(d)] !== undefined ? bnDigits[parseInt(d)] : d))
    .join('');
};

const ProductDetailPage = async ({ params }: PageProps) => {
  const { detailId } = await params;
  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${detailId}`,
    { cache: 'force-cache' }
  );
  const data: Product = await res.json();

  // বাজারগুলোর ডাটা থেকে সর্বনিম্ন দাম, সর্বোচ্চ দাম এবং গড় দাম বের করা
  const allMins = data.markets.map((m) => m.min);
  const allMaxs = data.markets.map((m) => m.max);

  const lowestMin = allMins.length > 0 ? Math.min(...allMins) : 0;
  const highestMax = allMaxs.length > 0 ? Math.max(...allMaxs) : 0;
  
  // গড় দাম হিসেব করার জন্য (min + max) / 2 এর গড় বা সাধারণ গড়
  const avgPrice =
    allMins.length > 0 && allMaxs.length > 0
      ? Math.round(
          data.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
            data.markets.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#f4f5f6] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* পণ্যের নাম ও ক্যাটাগরি (ঐচ্ছিক হেডার অংশ) */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
          {data.image && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              {/* <Image src={data.image} alt={data.nameBn} fill className="object-cover" /> */}
              <span >{data.image}</span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-800">{data.nameBn}</h1>
            <p className="text-sm text-gray-500">{data.categoryNameBn || data.category} ({data.unit})</p>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ (Summary Section) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">দামের সারসংক্ষেপ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* সর্বনিম্ন দাম */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
              <span className="text-sm text-gray-500">সর্বনিম্ন দাম</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-emerald-600">
                  ৳{toBengaliNumber(lowestMin)}
                </span>
                <span className="text-sm text-gray-600 ml-1">টাকা</span>
              </div>
              <span className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</span>
            </div>

            {/* সর্বাধিক দাম */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
              <span className="text-sm text-gray-500">সর্বাধিক দাম</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-rose-600">
                  ৳{toBengaliNumber(highestMax)}
                </span>
                <span className="text-sm text-gray-600 ml-1">টাকা</span>
              </div>
              <span className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            {/* গড় দাম */}
            <div className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col justify-between">
              <span className="text-sm text-gray-500">গড় দাম</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-emerald-600">
                  ৳{(avgPrice)}
                </span>
                <span className="text-sm text-gray-600 ml-1">টাকা</span>
              </div>
              <span className="text-xs text-gray-400">প্রতি {data.unit || 'কেজি'}-এর হিসেবে</span>
            </div>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম (Table Section) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                  <th className="py-3 px-4 text-right font-medium">বাজার</th>
                  <th className="py-3 px-4 text-right font-medium">বিভাগ</th>
                  <th className="py-3 px-4 text-right font-medium">সর্বনিম্ন</th>
                  <th className="py-3 px-4 text-right font-medium">সর্বাধিক</th>
                  <th className="py-3 px-4 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {data.markets.map((item, index) => {
                  const marketAvg = Math.round((item.min + item.max) / 2);
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-gray-900">{item.market}</td>
                      <td className="py-3.5 px-4 text-gray-600">{item.division}</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(item.min)} টাকা</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(item.max)} টাকা</td>
                      <td className="py-3.5 px-4">{toBengaliNumber(marketAvg)} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;