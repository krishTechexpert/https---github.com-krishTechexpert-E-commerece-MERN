import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./features/products/productSlice";
import userReducer from "./features/user/userSlice"
const store = configureStore({
    reducer:{
        products:productReducer,
        userData:userReducer
    }
})



export default store;