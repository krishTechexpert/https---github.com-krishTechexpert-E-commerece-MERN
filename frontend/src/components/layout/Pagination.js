import React from 'react'
import {useNavigate} from 'react-router-dom';

function Pagination({totalPages,currentPage,setCurrentPage}) {

    let page=[];
     for(let i=1;i<=totalPages;i++){
        page.push(i)
    }
    const pageHandler = (page) => {
        setCurrentPage(page)
    }

    const prevPageHandler = () => {
      if(currentPage === 1){
        return;
      }else{
        setCurrentPage(currentPage - 1)
      }
    }

    const nextPageHandler = () => {
      if(currentPage === totalPages){
        return;
      }else{
        setCurrentPage(currentPage + 1)
      }
    }
   
  return (
    <div className="flex items-center justify-center my-10">
      <span disabled={currentPage === 1} onClick={prevPageHandler} className="mx-1  text-sm font-semibold text-gray-900">
        &larr; Previous 
      </span>
     
        {page.map((item) => {
            return  <span key={item} onClick={() => pageHandler(item)} aria-current={item == currentPage}  className={item !== currentPage ? 'mx-1 cursor-pointer flex items-center  rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105' : 'mx-1 cursor-pointer flex items-center  rounded-md border border-gray-400 px-3 py-1  hover:scale-105 text-blue-600'}
          >
            {item}
          </span>
        })}
     
      <span disabled={currentPage === totalPages} className={currentPage !== totalPages ?"mx-2 text-sm font-semibold cursor-pointer text-gray-900":'mx-2 text-sm font-semibold cursor-not-allowed disabled:opacity-50'} onClick={nextPageHandler}>
        Next &rarr;
      </span>
    </div>
  )
}


export default Pagination