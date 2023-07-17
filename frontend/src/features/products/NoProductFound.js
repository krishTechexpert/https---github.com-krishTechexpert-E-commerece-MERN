import { ArrowLeft } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import React from 'react'

export default function NoProductFound() {
    const navigate = useNavigate();
  return (
    <div className="py-10">
      <div className="text-center">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
        Sorry, no results found!
        </h1>
      
        <div className="mt-4 flex items-center justify-center gap-x-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Shopping Now
          </button>
         
        </div>
      </div>
    </div>
  )
}
