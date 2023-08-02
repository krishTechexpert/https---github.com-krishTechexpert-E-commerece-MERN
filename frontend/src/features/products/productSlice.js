import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {instance} from "../../config"


const initialState = {
    productList:[],
    totalProducts:0,
    loading:null,
    error:null
}

export const getAllProducts = createAsyncThunk('/api/products',
    async (parameters) => {
        // we set some default value like keyword,currentpage
        const {keyword='',currentPage=1,price=[0,100000],category,ratings=0} = parameters;
        let url =`/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if(category){
         url =`/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;

      }
      
        const response = await instance.get(url)
        const {products,countProduct,resultPerPage,filteredProductCount} = response.data
        return {products,countProduct,resultPerPage,filteredProductCount}
    }
)

export const getProductDetails = createAsyncThunk('/api/productDetails',
    async (id) => {
        const response = await instance.get(`/product/${id}`)
        const {product} = response.data
        return {product}
    }
)

export const productSlice = createSlice({
    name:'products',
    initialState,
    reduccers:{},
    extraReducers:(builder) => {
        builder
        // get All products
        .addCase(getAllProducts.pending, (state) => {
            state.loading='pending'
        })
        .addCase(getAllProducts.rejected,(state,action) => {
            state.loading=null;
            state.error = action.error.message;
        })
        .addCase(getAllProducts.fulfilled,(state,action) => {
            state.loading=null;
            state.productList=action.payload.products;
            state.totalProducts=action.payload.countProduct
            state.resultPerPage=action.payload.resultPerPage
            state.filteredProductCount=action.payload.filteredProductCount
        })
        // get product Details
        .addCase(getProductDetails.pending,(state) => {
            state.loading='pending'
        })
        .addCase(getProductDetails.rejected,(state,action) => {
            state.loading=null;
            state.error = action.error.message;
        })
        .addCase(getProductDetails.fulfilled,(state,action) => {
            state.loading=null;
            state.singleProduct=action.payload.product;
        })  
    }
})

export const { } = productSlice.actions;
export default productSlice.reducer;