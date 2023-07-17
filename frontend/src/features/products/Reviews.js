import React from 'react'
import ReactStars from 'react-stars';


export function Reviews({review}) {
    const options = {
        edit:false,
        color:"rgba(20,20,20,.1)",
        activeColor:"yellow",
        value:review?.rating,
        size:window.innerWidth < 600 ? 20:25,
        isHalf:true
      }
  return (
    <div className=" rounded-md bg-black p-1 mb-4">
      <div className="flex flex-col rounded-md bg-white">
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className=" flex space-x-2">
          <ReactStars {...options} />
          </div>
          <div className="flex-1 pt-2">
            <blockquote>
              <p className="text-lg text-gray-800">
               {review.comment}
              </p>
            </blockquote>
          </div>

          <div className="mt-4 border-t border-gray-300 pt-4 dark:border-gray-800">
            <div className="flex items-center">
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
              <div className="ml-3 min-w-0">
                <p className="truncate text-base font-semibold text-gray-800">{review.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Reviews