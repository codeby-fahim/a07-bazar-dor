
import Link from "next/link";
import React from "react";

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
    <nav className="container mx-auto">
      <div className="flex  gap-5 mt-5">
        <Link className="font-bold" href='/'>হোম</Link>
      {data.map((d, i: number) => (
        <div key={i}>
          <Link href={`/category/${d.slug}`}><li className="list-none font-bold"> <span>{d.icon}</span> {d.nameBn}</li></Link>
        </div>
      ))}
    </div>
    </nav>
  );
};

export default NavLink;
