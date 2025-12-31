import React, { useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPswd";
import ProductList from "./Components/ProductList";
import ProductsDetails from "./Components/ProductDetails";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import CartPage from "./Components/CartList";
import Loading from "./Components/Loading";
import AuthUser from "./Components/AuthUser";
import LoginUser from "./Components/LoginUser";

export const UserContext = createContext();

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ["/login", "/signup", "/forgotpassword"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname.toLowerCase());

  const savedDataObject = localStorage.getItem("myCart") || "{}";
  const [cart, setCart] = useState(JSON.parse(savedDataObject));

  const token = localStorage.getItem("token");
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: { Authorization: token },
        })
        .then((res) => {
         setUser(res.data);
         setUserLoading(false);
        })
       .catch(() => {
          localStorage.removeItem("token");
          setUserLoading(false);
       });
    } else {
     setUserLoading(false);
    }
  }, [token]);

  function handleCart(ProductId, count) {
    const newCart = { ...cart, [ProductId]: (cart[ProductId] || 0) + count };
    setCart(newCart);
    localStorage.setItem("myCart", JSON.stringify(newCart));
  }

  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("myCart", JSON.stringify(newCart));
  }

  const total = Object.values(cart).reduce((a, b) => a + b, 0);

  if (userLoading) return <Loading />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!shouldHideHeader && <Header ProductCount={total} />}

      <Routes>
        <Route
          path="/"
          element={
            <LoginUser>
              <ProductList />
            </LoginUser>
          }
        />
        <Route
          path="/product/:id"
          element={<ProductsDetails onAddCart={handleCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage updateCart={updateCart} cart={cart} />}
        />
        <Route
          path="/login"
          element={
            <AuthUser>
              <LoginPage setUser={setUser} />
            </AuthUser>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
