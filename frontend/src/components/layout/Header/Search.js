import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../../features/products/productSlice';



function Search({checkPage}) {
    const[keyword,setKeyword]=useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch =(event) => {
        setKeyword(event.target.value)
    }


    const SubmitSearchProducts = (event) => {
        event.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
           
        }
        else{
            navigate(`/products`)
        }
        setKeyword('')
    }


  return (
    <form className={`flex grow ${checkPage ? 'justify-center':'justify-end'} md:mr-2 lg:mr-4`} onSubmit={SubmitSearchProducts}>
    <input
      className={`flex h-10 w-[120px] sm:w-[280px]  md:w-[300px] ${checkPage ? 'lg:w-[400px]' : 'lg:w-[230px]'} rounded-md bg-gray-100 px-3 py-2  text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
      type="text"
      value={keyword}
      placeholder="Search Products"
      onChange={handleSearch}
    />
    <button
        type="submit"
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Search
      </button>
  </form>
  )
}

export default Search