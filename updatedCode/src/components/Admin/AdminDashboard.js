import React, { Fragment } from "react";
import OrderList from "./OrderList";
import ProductPage from "../../pages/ProductPage";
import "./AdminDashboard.css";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-dashboard">
        <ProductPage />
      </div>
    </>
  );
};

export default AdminDashboard;
