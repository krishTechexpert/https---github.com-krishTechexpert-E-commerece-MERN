import React,{Fragment,useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllProducts } from '../../features/products/productSlice';
import Loader from '../../components/layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import Product from "../../features/products/Product";
import { useParams } from 'react-router-dom';
import Pagination from '../../components/layout/Pagination';
import { FilterX } from 'lucide-react';
import Slider from '@mui/material/Slider';
import NoProductFound from './NoProductFound';
import ReactStars from 'react-stars';
import MetaData from '../../components/layout/MetaData';



const categories = ['mobile','laptop','watches']

function AllProducts() {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
    const[ratings,setRatings]=useState(0)
    const[price,setPrice]=useState([0,100000])
    const[category,setCategory]=useState('')
  
    const { keyword } = useParams();
    const {productList,loading,error,totalProducts,resultPerPage,filteredProductCount} = useSelector((state) => state.products)
    const pagePerProduct=resultPerPage;

    let countPages=null;
  
    if(keyword || category || price || ratings) {
      countPages = Math.ceil(filteredProductCount/pagePerProduct);
    }else{
      countPages = Math.ceil(totalProducts/pagePerProduct);
    }
    


  //You can only pass one argument to the thunk when you dispatch it.
  // If you need to pass multiple values, pass them in a single object
  // https://stackoverflow.com/questions/64742747/how-do-you-pass-arguments-to-createasyncthunk-in-redux-toolkit
 
  const priceHandler = (event,newPrice) => {
    setPrice(newPrice)
  }

  const categoryHandler = (value) => {
      setCategory(value)
    }
    const RatingsHandler = (value) => {
      setRatings(value)
    }

  useEffect(() => {
    dispatch(getAllProducts({keyword,currentPage,price,category,ratings}))
  },[dispatch,keyword,currentPage,price,category,ratings])

 

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


  return (
    <Fragment>
          <MetaData title = "Big Bazaar | Products" />

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
      <div className="hidden space-y-4 divide-y lg:col-span-2 lg:block px-5">
      <h2 className="text-2xl font-semibold text-gray-900 mt-10">Filters</h2>
          <div className="pt-8">
             <h3 className="text-lg font-semibold text-gray-900">Price</h3>
              <Slider
            getAriaLabel={() => 'Temperature range'}
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            min={0}
            max={100000}
          />
          </div>
            
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900">Category </h3>
                <ul className="mt-2">
                  {categories.map((item,index) => (
                    <li key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                         <input
                          id={`${item}`}
                          name={`${item}[]`}
                          onChange={() => categoryHandler(item)}
                          //defaultValue={option.value}
                          type="checkbox"
                          value={category}
                          checked={item === category}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        /> 
                        <label
                          htmlFor={`${item}`}
                          className="ml-3 text-sm font-medium text-gray-900"
                        >
                           {item}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 relative">
                <h3 className="text-lg font-semibold text-gray-900">Ratings </h3>
                <ul className="mt-2">
                  {[1,2,3,4,5].reverse().map((item,index) => (
                    <li key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                         <input
                          id={`${item}`}
                          name={`${item}[]`}
                          onChange={() => RatingsHandler(item)}
                          //defaultValue={option.value}
                          type="checkbox"
                          value={ratings}
                          checked={item === ratings}
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                        /> 
                        <label
                          htmlFor={`${item}`}
                          className="ml-3 text-sm font-medium text-gray-900"
                        >
                           <ReactStars 
                             edit="false" color="rgba(20,20,20,.1)" activeColor="yellow"
                             value={item}
                             size={window.innerWidth < 600 ? 20:25}
                             isHalf="true"

                           />
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
          
          </div>
      <div className="h-[400px] w-full  lg:col-span-10 lg:h-full">
    <h1 className='mt-10 px-5 text-3xl  space-y-4 font-bold divide-y divide-dashed'>Products List {totalProducts>0  && !keyword && !price? <span className='text-red-700'>({totalProducts})</span>:<span className='text-red-700'>{filteredProductCount}</span>}</h1>
      {loading && <Loader />}
      {error && <ToastContainer />}
      <div className="mx-auto  grid w-full max-w-7xl items-center space-y-4 px-2 py-10 pb-16 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {!loading && !error  && content}
      </div>
      {productList.length===0 && 
      <NoProductFound />}
      {filteredProductCount > resultPerPage && productList.length>0 &&
        <Pagination totalPages = {countPages} resultPerPage={resultPerPage} currentPage={currentPage}  setCurrentPage={setCurrentPage}/>
      }
      </div>
      </div>
    </Fragment>
  )
}

export default AllProducts