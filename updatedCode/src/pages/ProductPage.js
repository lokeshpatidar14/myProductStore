import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, removeProduct } from "../slices/productSlice";
import {
  getProducts,
  deleteProduct as deleteProductAPI,
} from "../api/productAPI";
import ProductForm from "../components/Admin/ProductForm";
import ProductItem from "../components/Admin/ProductItem";
import "./ProductPage.css";

const ProductPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const productsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dispatch(setProducts(productsArray));
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductAPI(id);
      dispatch(removeProduct(id));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };
  const handleShowForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  return (
    
      <div className="product-page">
        {error && <div className="error-message">{error}</div>}
        {!showForm && <button onClick={handleShowForm} className="btn btn-secondary">
          Add Product
        </button>}
        <div className="product-page-content">
          {showForm && (
            <ProductForm
              editingProduct={editingProduct}
              onCancel={handleCancelEdit}
            />
          )}

          <div className="product-list">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProductPage;
