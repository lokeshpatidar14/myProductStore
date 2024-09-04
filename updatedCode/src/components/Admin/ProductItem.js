import "./ProductItem.css";
import React from "react";
import { Button } from "react-bootstrap";
import { SlPencil } from "react-icons/sl";
import { SlTrash } from "react-icons/sl";

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-item">
      <h5>{product.name}</h5>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100px", height: "auto" }}
      />
      <Button variant="secondary" onClick={() => onEdit(product)}>
        <SlPencil />
      </Button>
      <Button variant="danger" onClick={() => onDelete(product.id)}>
        <SlTrash />
      </Button>
    </div>
    // <div className="product-item">
    //   <h5></h5>
    //   <p></p>
    //   <p></p>
    //   <img src="" alt="+" style={{ width: "100px", height: "auto" }}/>
    // </div>
  );
};

export default ProductItem;
