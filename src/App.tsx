import { Navigate, Route, Routes } from "react-router-dom";
import {
  ContextProvider,
  UseShopingCartContext,
} from "./components/context/context";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Home from "./pages/Home/home";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import ProductCategories from "./pages/ProductsCategories/ProductCategories";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login/Login";

const App = () => {
  const { isLogin } = UseShopingCartContext();

  return (
    <ContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:category" element={<ProductCategories />} />
          <Route
            path="/products/productDetail/:id"
            element={<ProductDetail />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" replace /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ContextProvider>
  );
};

export default App;
