import React from 'react';

const AllProduct = async() => {
  const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {cache:'force-cache'});
  const data = res.json();
  return (
    <div>
      
    </div>
  );
};

export default AllProduct;