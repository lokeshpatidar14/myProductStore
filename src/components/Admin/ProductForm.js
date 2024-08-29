// src/components/Admin/ProductForm.js

import React, { useState } from "react";
import { addProduct, updateProduct } from "../../api/productAPI";

const ProductForm = ({ product, onSave = () => {} }) => {
  // Default onSave to an empty function
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [image, setImage] = useState(product ? product.image : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, category, image };
    try {
      if (product) {
        await updateProduct(product.id, productData);
      } else {
        await addProduct(productData);
      }
      onSave(); // Call onSave after successful operation
    } catch (error) {
      console.error("Error saving product:", error);
      // Optionally handle the error, e.g., display an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product ? "Update Product" : "Add Product"}</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        {product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
