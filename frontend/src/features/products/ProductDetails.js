import React, { useEffect } from 'react'
import { Star, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';

import MetaData from '../../components/layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../features/products/productSlice';
import Loader from '../../components/layout/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import ReactStars from 'react-stars'
import Reviews from "./Reviews";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [id])
  const options = {
    edit: false,
    color: "rgba(20,20,20,.1)",
    activeColor: "yellow",
    value: singleProduct?.ratings,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true
  }
  if (error) {
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
  return (

    <section className="overflow-hidden">
      {loading && <Loader  />}
      {error && <ToastContainer />}
      {singleProduct && 
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src={singleProduct?.images[0]?.url}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">{singleProduct?.category}</h2>
            <h1 className="my-4 text-3xl font-semibold text-black">{singleProduct?.name}</h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                <ReactStars {...options} />
                <span className="ml-3 inline-block text-xs font-semibold">{singleProduct?.numOfReviews} Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              {singleProduct?.description}
            </p>
            <p className="title-font mt-3 text-xl font-bold text-gray-900 py-3 border-b border-gray-300">₹{singleProduct?.price}</p>
            <ul className="space-y-5 pb-1 mt-5 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">Status: </span>
                {singleProduct?.stock > 0 ? <span className='text-green-600'>InStock</span> : <span className='text-red-600'>Out Of Stock</span>}
              </li>
            </ul>
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2  py-8  md:pr-32 lg:pr-12 2xl:pr-32">

              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                <button
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                  disabled
                >
                  -
                </button>
                <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                  1
                </span>
                <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                  +
                </button>
              </div>
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to cart
              </button>
            </div>
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Submit Review
            </button>

          </div>
        </div>
        <div className="">
          <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 mt-10 py-5 transition-colors md:py-6">
            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
              Customer Reviews
            </h2>
          </header>
          {singleProduct?.reviews && singleProduct.reviews[0] ?
            singleProduct?.reviews.map((review) => {
              return <Reviews key={review._id} review={review} />
            })
            : <p className="truncate text-base font-semibold text-gray-800">No Review yet</p>
          }
        </div>


      </div>}
    </section>
  )
}


export default ProductDetails