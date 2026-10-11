



import Link from "next/link";

interface INav {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLink = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { cache: "force-cache" },
  );
  const data: INav[] = await res.json();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 sm:gap-6 py-3 overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link className="font-bold text-sm sm:text-base hover:text-green-600 transition-colors shrink-0" href='/'>হোম</Link>
          {data.map((d, i: number) => (
            <div key={i} className="shrink-0">
              <Link href={`/category/${d.slug}`}>
                <li className="list-none font-bold text-sm sm:text-base hover:text-green-600 transition-colors flex items-center gap-1.5">
                  <span>{d.icon}</span> {d.nameBn}
                </li>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLink;
