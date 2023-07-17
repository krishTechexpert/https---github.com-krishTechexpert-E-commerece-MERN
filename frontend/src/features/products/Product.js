import React from 'react';  
import {Link} from "react-router-dom";
import ReactStars from 'react-stars';
import MetaData from '../../components/layout/MetaData';



function Product({product}) {

const options = {
  edit:false,
  color:"rgba(20,20,20,.1)",
  activeColor:"yellow",
  value:product.ratings,
  size:window.innerWidth < 600 ? 20:25,
  isHalf:true
}
  return (
    <>
    <MetaData title = "Big Bazaar | Product" />

      <Link to={`/product/${product._id}`}  className="rounded-md border relative aspect-[16/9] w-auto rounded-md md:aspect-auto ">
        <img
          src={product.images[0].url} alt={product.name}
          className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
        />
        <div className="p-4">
        <div className='flex items-center justify-between'>
          <h2 className="inline-flex items-center text-lg font-semibold">{product.name}</h2>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[13px] font-semibold text-gray-900">
              {product.category}
            </span>
            </div>
          <p className="mt-3 text-sm text-gray-600">
            {product.description}  
          </p>
       
          <div className="mt-2 flex items-center space-x-2">
            <span className="block text-sm font-semibold">Price : </span>
            <span className=" text-sm text-gray-600">₹{product.price}</span>
             </div>
          <div className="mt-2 flex items-center space-x-2">
            <span className="block text-sm font-semibold">Ratings : </span>
            <ReactStars {...options} />
            <span className=" text-sm text-gray-600">({product.numOfReviews})</span>
          </div>
         
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Add to Cart
          </button>
        </div>
      </Link>
      </>
  )
}

export default Product