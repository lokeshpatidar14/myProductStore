import React from "react";
import { ListGroup } from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <ListGroup className="mt-4">
      {products.map((product) => (
        <ListGroup.Item key={product.id}>
          <ProductItem product={product} onEdit={onEdit} onDelete={onDelete} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ProductList;
