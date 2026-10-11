



import Link from "next/link";
import MarqueeText from "react-marquee-text";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Change {
  dir: "up" | "down" | string;
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

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "force-cache" },
  );
  const products: Product[] = await res.json();

  return (
    <div className="bg-white border-b py-1.5 sm:py-2 overflow-hidden shadow-sm">
      <MarqueeText
        className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium"
        duration={25}
        pauseOnHover={true}
        direction="right"
      >
        {products.map((item) => {
          const isUp = item.change.dir === "up";
          return (
            <Link href={`/productDetail/${item.id}`} key={item.id}>
              <div
                className="flex items-center gap-1.5 sm:gap-2 mx-2 sm:mx-4 whitespace-nowrap px-2.5 sm:px-3 py-1 border-r border-gray-200"
              >
                <span className="text-sm sm:text-base">
                  {item.image || item.categoryIcon}
                </span>

                <span className="text-gray-800 font-semibold">{item.nameBn}</span>

                <span className="text-gray-600">
                  {item.today} টাকা/{item.unit === "kg" ? "কেজি" : item.unit}
                </span>

                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    isUp ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {item.change.pct}%
                </span>
              </div>
            </Link>
          );
        })}
      </MarqueeText>
    </div>
  );
};

export default Marquee;




