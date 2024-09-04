import "./ProductForm.css";
import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import {
  addProduct as addProductAPI,
  updateProduct as updateProductAPI,
} from "../../api/productAPI";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../slices/productSlice";
import { SlPencil } from "react-icons/sl";
import { SlNote } from "react-icons/sl";

const predefinedCategories = ["Mobile", "TV", "Refrigerator", "AC", "Laptops"];

const ProductForm = ({ editingProduct, onCancel }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(editingProduct ? editingProduct.name : "");
  const [price, setPrice] = useState(
    editingProduct ? editingProduct.price : ""
  );
  const [category, setCategory] = useState(
    editingProduct ? editingProduct.category : ""
  );
  const [image, setImage] = useState(
    editingProduct ? editingProduct.image : ""
  );
  const [error, setError] = useState(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(predefinedCategories);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setImage(editingProduct.image);
    } else {
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    }
  }, [editingProduct]);

  const handleSave = async (e) => {
    e.preventDefault();
    const productData = { name, price, category, image };

    try {
      if (editingProduct) {
        await updateProductAPI(editingProduct.id, productData);
        dispatch(updateProduct({ id: editingProduct.id, ...productData }));
      } else {
        const newProduct = await addProductAPI(productData);
        dispatch(addProduct({ id: newProduct.name, ...productData }));
      }
      onCancel();
      setName("");
      setPrice("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Failed to save product.");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  return (
    <Card className="product-form">
      <Card.Body>
        <h2>{editingProduct ? <SlPencil /> : <SlNote />}</h2>
        <Form onSubmit={handleSave}>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "add-new") {
                  setShowNewCategoryInput(true);
                } else {
                  setCategory(value);
                }
              }}
              required>
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="add-new">Add New Category</option>
            </Form.Control>
            {showNewCategoryInput && (
              <div className="new-category-input">
                <Form.Control
                  type="text"
                  placeholder="Enter new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button variant="primary" onClick={handleAddCategory}>
                  Add
                </Button>
              </div>
            )}
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Control
              type="text"
              placeholder="Enter product image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Form>
        {error && <div className="error-message">{error}</div>}
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
