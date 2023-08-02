import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';
import { userLogout } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function DropDown({name,role,avatar}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[photo,setPhoto]=useState('user.png')

  
  const MenuList =[
    {name:'Profile',func:profileFn},
    {name:'Order',func:orderFn},
    {name:'SignOut',func:logoutFn}
]

  if(role && role === 'admin'){
    MenuList.unshift({
      name:'DashBoard',
      func:dashboardFn
    })
  }

function profileFn(){
  navigate('/profile')
}
function orderFn(){
  
}
function dashboardFn(){
  
}
async function logoutFn(){
    
    dispatch(userLogout())
    .then(() => {

    sessionStorage.clear();
    navigate('/');
    })
}

  return (

    <div className='flex items-center ml-10 group cursor-pointer pb-2 relative'>
      <div className="relative inline-block">
        <img
          className="h-10 w-10 rounded-full"
          src={avatar.url?avatar.url:photo}
          alt={name}
        />
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
      </div>
      <div className='mx-2 flex'>
        <strong>{name} </strong><ChevronDown />

      </div>
      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 absolute right-0 top-10 dark:bg-gray-700 dark:divide-gray-600 hidden group-hover:block">

        <ul className="pt-2 text-sm text-gray-700 dark:text-gray-200 " aria-labelledby="profile menu settings">

          {MenuList.map((item,index) => (
             <li key={index} className='last:border-solid last:border-t last:border-gray-200'>
              
              <div className="cussor:pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700" onClick={item.func}>{item.name}</div>
           </li>
          ))}
       </ul>
     
      </div>
    </div>



  )
}
