import React, { Fragment,useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import {userProfile} from "./userSlice";
import Loader from '../../helper/Loader';
import { ToastContainer, toast } from 'react-toastify';


export default function Profile() {
    const { user,loading,isAuthenticated,isUpdate } = useSelector((state) => state.userData)
    const[photo,setPhoto]=useState('user.png')
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    useEffect(() => {
        if(isUpdate){
            toast.success('profile Updated')
        }
        dispatch(userProfile())
    },[dispatch,isUpdate])


    return (
        <Fragment>
              <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              //toastStyle={{ backgroundColor: "crimson",color:'white' }}
              //theme="colored"
              />
            <div className='xl:container mx-auto bg-white shadow-lg p-6 min-h-screen mt-8'>
            {loading && <div className='my-2 py-2'><Loader /></div>}
            {!loading && isAuthenticated &&
                <div className='flex'>
                    <div className='w-60 pt-5'>
                        <img
                            className="h-full w-full rounded-full"
                            src={user.avatar.url?user.avatar.url:photo}
                            alt={user.name}
                        />
                    </div>
                    <div className='pl-20 w-9/12'>
                        <div className='flex items-center justify-between'>
                        <h1 className='text-4xl text-[#000]/[.8]'>My Profile</h1>
                        <button className="inline-flex w-48 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                        onClick={() => navigate('/profile/update')}
                        >
                            Update Profile <Pencil className="ml-2" size={16} />
                        </button>
                        </div>

                        <div className="grid gap-4 grid-cols-2 mt-8">
                            <div className='mb-2 w-1/2'>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    Name
                                </label>
                                <h2 className='text-base text-[#333]'>{user?.name}</h2>
                            </div>
                            <div className='mb-2 w-1/2'>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    Email Address
                                </label>
                                <h2 className='text-base text-[#333]'>{user?.email}</h2>
                            </div>
                            <div className='mb-2 w-1/2'>
                                <Link className='text-base text-[#3063ec]'>checkout order</Link>
                            </div>
                            <div className='mb-2 w-1/2'>
                                <Link className='text-base text-[#3063ec]'>checkout comment</Link>
                            </div>
                            <div className='mb-2 w-1/2'>
                               <Link className='text-base text-[#3063ec]'>Change Password</Link>
                            </div>
                            <div className='mb-2 w-1/2'>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    Join Date
                                </label>
                                <h2 className='text-base text-[#333]'>{user?.createdAt?.substring(0,10)}</h2>
                            </div>
                        </div>

                    </div>
                </div>
                }
            </div>
        </Fragment>
    )
}
