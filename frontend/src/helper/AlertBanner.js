import React,{useState,useEffect} from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function AlertBanner({result,isSubmit,setIsSubmit}) {
    const color = result ? 'red' : 'green';
  return (
    <>
    {isSubmit && 
      <div className={`fixed left-0 top-0 w-full z-10 rounded-md border-l-4  border-red-500 bg-red-100 p-4`}>
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertTriangle className={`h-6 w-6 text-${color}-600`} />
          </div>
          <div>
            <p className={`text-sm font-medium text-${color}-600`}>
              {result.message?result.message:result}
            </p>
          </div>
          <div>
            <X className={`h-6 w-6 cursor-pointer text-${color}-600`} onClick={() => setIsSubmit(false)} />
          </div>
        </div>
      </div>}
    </>
  )
}
