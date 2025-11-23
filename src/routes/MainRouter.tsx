import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import { useAppDispatch, useAppSelector } from "../redux/store";
import ProductDetails from "../components/ProductDetails";
import { useEffect } from "react";
import { setLoading } from "../redux/reducers/appSlice";

function MainRouter() {
  const currentUser = useAppSelector((state) => state.app.currentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000); // Delay for 1 second to show loader

    return () => clearTimeout(timer);
  }, [location.pathname]); 
  return (
    <Routes>
        
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
      
      
      
      {/* <Route path="/home" element={<Home />} /> */}
      {!currentUser && ( 
      <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
      )}
    </Routes>
  );
}

export default MainRouter;