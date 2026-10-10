



import CategoryClient from '@/app/component/CategoryClient';

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

interface IPageProps {
  params: Promise<{ categoryId: string }>;
}

const CategoryPage = async ({ params }: IPageProps) => {
  const { categoryId } = await params;
  
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
    cache: 'force-cache',
  });
  const products: Product[] = await res.json();

  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === categoryId.toLowerCase()
  );

  return <CategoryClient initialProducts={filteredProducts} categoryId={categoryId} />;
};

export default CategoryPage;