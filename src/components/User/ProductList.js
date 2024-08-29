import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productAPI";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products &&
        Object.keys(products).map((key) => (
          <ProductItem key={key} product={products[key]} />
        ))}
    </div>
  );
};

export default ProductList;
