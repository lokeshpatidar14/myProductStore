import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li>
          <Link to="/admin/categories">Manage Categories</Link>
        </li>
        <li>
          <Link to="/admin/orders">View Orders</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
