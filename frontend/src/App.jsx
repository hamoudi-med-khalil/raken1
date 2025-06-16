import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./component/layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./component/products/ProductDetails";
import CheckOut from "./component/cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPages from "./pages/MyOrdersPages";
import AdminLayout from "./component/admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./component/admin/UserManagement";
import ProductManagement from "./component/admin/ProductManagement";
import EditProductPage from "./component/admin/EditProductPage";
import OrderManagement from "./component/admin/OrderManagement";

import { Provider } from "react-redux";
import store from "./redux/store.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            {/** User layout */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
            <Route path="/my-orders" element={<MyOrdersPages />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
