// src/components/Admin/AdminDashboard.js

import React, { useState } from "react";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import OrderList from "./OrderList";

const AdminDashboard = () => {
  const [isProductFormVisible, setProductFormVisible] = useState(true);
  const [isCategoryFormVisible, setCategoryFormVisible] = useState(true);

  const handleProductSave = () => {
    // Logic to handle after product is saved, e.g., refetch products
    console.log("Product saved!");
  };

  const handleCategorySave = () => {
    // Logic to handle after category is saved, e.g., refetch categories
    console.log("Category saved!");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Manage Products</h2>
        <ProductForm onSave={handleProductSave} />
      </section>
      <section>
        <h2>Manage Categories</h2>
        <CategoryForm onSave={handleCategorySave} />
      </section>
      <section>
        <h2>Order List</h2>
        <OrderList />
      </section>
    </div>
  );
};

export default AdminDashboard;
