import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Spinner } from "react-bootstrap";
import AdminHeader from "./components/Admin/AdminHeader";
import LoginForm from "./pages/LoginForm";
import CategoryForm from "./components/Admin/CategoryForm";
import UserProfile from "./components/User/UserProfile";

const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const OrderHistory = lazy(() => import("./components/User/OrderHistory"));
const OrderList = lazy(() => import("./components/Admin/OrderList"));
const AdminLogin = lazy(() => import("./components/Admin/AdminLogin"));


const Loader = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const adminToken = useSelector((state) => state.auth.adminToken);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token && !adminToken) {
  //     navigate("/user-login"); 
  //   } else if (adminToken) {
  //     navigate("/admin-dashboard"); 
  //   }
  // }, [token, adminToken, navigate]);

  return (
    <>
      {token && <Header />}
      {adminToken && !token && <AdminHeader />}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/home" element={<LoginForm />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={adminToken && <AdminDashboard />} />
          <Route path="/user-login" element={<AuthPage />} />
          <Route path="/admin" element={adminToken && <AdminPage />} />
          <Route path="/user" element={token ? <UserPage /> : <AuthPage />} />
          <Route path="/admin-products" element={adminToken && <ProductPage />} />
          <Route path="/cart" element={token ? <CartPage /> : <AuthPage />} />
          <Route path="/checkout" element={token ? <CheckoutPage /> : <AuthPage />} />
          <Route path="/profile" element={token ? <UserProfile /> : <AuthPage />} />
          <Route path="/user-orders" element={token ? <OrderHistory /> : <AuthPage />} />
          <Route path="/admin-orders" element={adminToken && <OrderList />} />
          <Route path="/admin-categories" element={adminToken && <CategoryForm/>}/>
          <Route path="*" element={<UserPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
