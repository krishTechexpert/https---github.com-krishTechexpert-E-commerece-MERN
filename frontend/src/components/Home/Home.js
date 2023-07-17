import React,{Fragment,useEffect} from 'react';
import "./Home.css";
import Product from "../../features/products/Product";
import { ArrowDownCircle } from 'lucide-react';
import MetaData from '../layout/MetaData';
import {useDispatch,useSelector} from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';
import Loader from '../layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import { useParams,Link } from 'react-router-dom';


function Home() {
  const dispatch = useDispatch();
  const {productList,loading,error,totalProducts} = useSelector((state) => state.products)
  const { keyword } = useParams();

  useEffect(() => {
    dispatch(getAllProducts({keyword}))
  },[dispatch])

  let content=null;
  if(loading){
    content=<Loader/>
  }
  if(error){
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  if(productList.length> 0){
    content=  productList && productList.map((product) => 
    ( <Product product={product} key ={product._id} />)
    )
  }
  

  return <Fragment>
    <MetaData title = "Big Bazaar | Home" />
    
      <div className="relative top-2">
        <img
          className="aspect-[3/2] w-full bg-gray-50 object-cover lg:aspect-auto lg:h-[300px] lg:object-center"
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
          alt=""
        />
        <button className='hover:transition-all bg-white opacity-75 text-4xl px-5 py-5 w-80 h-20 absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center align-center'>Shop Now <ArrowDownCircle className="animate-bounce w-6 h-6 mx-4 mt-3 text-blue-700" />
        </button>
      </div>
      <div className="mt-10 px-5 space-y-4 flex items-center  justify-between">
        <h1 className=' text-3xl   font-bold divide-y divide-dashed'>Trending products {totalProducts ? <span className='text-red-700'>({totalProducts})</span>:null}</h1>
        <Link to='/products' className='underline text-blue-900'> View All Products</Link>
      </div>
      {loading && <Loader />}
      {error && <ToastContainer />}
      <div className="mx-auto  grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {!loading && !error  && content}
      </div>
  </Fragment>
}

export default Home