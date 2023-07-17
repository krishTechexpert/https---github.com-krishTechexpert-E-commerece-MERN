import React from 'react';
import './default-base.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import webFont from "webfontloader"; 

import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './features/products/ProductDetails';
import AllProducts from './features/products/AllProducts';



function App() {

React.useEffect(() => {
  webFont.load({
    google: {
      families: ['Roboto','Droid Sans', 'Droid Serif:bold']
    }
  });
},[])

  return (
    <Router> 
  
      <Header/>
      <Routes>
        <Route extact path="/" element={<Home />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/products" element={<AllProducts />} />
        <Route path="/products/:keyword" element={<AllProducts />} />


      </Routes>
      <Footer />
    </Router>
    
  )
}

export default App;
