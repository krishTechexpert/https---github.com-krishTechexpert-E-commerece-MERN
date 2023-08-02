import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useFormik } from "formik";
import { SchemaLoginValidation } from "../../helper/Validate"
import Loader from '../../helper/Loader';
import { userLogin } from "./userSlice";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AlertBanner from '../../helper/AlertBanner';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false)
    const { loading, error, isAuthenticated } = useSelector((state) => state.userData)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },


        validationSchema: SchemaLoginValidation,
        onSubmit: async (values, { resetForm }) => {
             dispatch(userLogin(values))
            
             .then((res) => {
                if (res.error) {
                    setIsSubmit(true)
                }
    
                if (res.payload.success) {
                    resetForm()
                    setIsSubmit(false)
                    navigate('/profile')
    
                }
             })
           
        }
    });
    return (
        <section>
            {error && <AlertBanner result={error} isSubmit={isSubmit} setIsSubmit={setIsSubmit} />}
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Don&#x27;t have an account?
                        <Link to='/register' className="font-semibold text-black transition-all duration-200 hover:underline"> Create a free account</Link>

                    </p>
                    <form onSubmit={formik.handleSubmit} method='POST' className="mt-8">
                        <div>

                            <div className='mb-2'>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">

                                    Email address
                                </label>
                                <div className="mt-2 relative pb-4">
                                    <input
                                        className={`flex h-10 w-full rounded-md border ${formik.errors.name ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...formik.getFieldProps("email")}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center justify-between'>
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">

                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        title=""
                                        className="text-sm font-semibold text-black hover:underline"
                                    >

                                        Forgot password?
                                    </a>
                                </div>
                                <div className="mt-2 relative pb-4">
                                    <input
                                        className={`flex h-10 w-full rounded-md border ${formik.errors.name ? 'border-red-300' : 'border-gray-300'} bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        {...formik.getFieldProps("password")}
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='absolute left-0 bottom-0 text-xs text-red-700'>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div>
                                {loading && <Loader />}
                                <button
                                    type="submit"
                                    className="inline-flex w-full mt-5 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                                >
                                    Get started <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}
