import React,{useState} from 'react';
import './default-base.css';
import {BrowserRouter as Router,Routes,Route,useNavigate} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './features/products/ProductDetails';
import AllProducts from './features/products/AllProducts';
import Register from "./features/user/Register"
import Login from "./features/user/Login"
import Dashboard from "./features/user/Dashboard"
import {useSelector,useDispatch} from 'react-redux';
import Profile from "./features/user/Profile";
import {userProfile} from "./features/user/userSlice";
import ProtectedRoute from './features/user/ProtectedRoute';
import UpdateProfile from './features/user/UpdateProfile';

function App() {
const [auth,setAuth] =useState(sessionStorage.getItem('token') || null)
const navigate = useNavigate();
const dispatch = useDispatch();

React.useEffect(() => {
  if(auth){
    navigate('/profile')
  }

 },[])
 const { isAuthenticated} = useSelector((state) => state.userData)


  return (
    
  <>
      <Header/>
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route  path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<AllProducts />} />
        <Route path="/products/:keyword" element={<AllProducts />} />
        
        <Route extact path="/register" element={<Register />} />
        <Route extact path="/login" element={<Login />} />
        
      
        <Route extact path="/dashboard" element={<Dashboard />} />

        <Route extact path="/profile" element={<ProtectedRoute auth={isAuthenticated || auth}><Profile /></ProtectedRoute>} />
        <Route extact path="/profile/update" element={<ProtectedRoute auth={isAuthenticated || auth}><UpdateProfile /></ProtectedRoute>} />

      
      </Routes>
      <Footer />
      </>
    
  )
}

export default App;
