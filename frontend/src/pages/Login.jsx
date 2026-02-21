import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { loginUser } from '../setUp/authThunks.js'
import { useDispatch } from "react-redux"
import { Navigate } from 'react-router-dom'
import Cover from '../setUp/Cover.jsx'

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  const submit = (formData)=>{
    
  dispatch(loginUser(formData))

  }

  
  
  
  return (

  
      
    <Cover>

      <div className='absolute top-[230px] left-[530px]'>
        <form className='border p-5 dark:border-white border-black' onSubmit={handleSubmit(submit)} >
          <div className='m-5'>
            <input type="email" placeholder='write your email' className='w-96 p-3 h-10 border border-black dark:border-white dark:bg-gray-700 dark:text-white'
              {...register("email", {
                required: true,

                validate: {
                  matchPattern: (value) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) || "email address should be valid",
                }

              })}
            />
             </div>
          <div className='m-5'>
            <input type="password" placeholder='write your password' className='w-96 p-3 h-10 border border-black dark:border-white dark:bg-gray-700 dark:text-white'

              {...register("password", {
                required: true
              })}

            />
          </div>
          <button className="btn bg-[#1A77F2] text-white border-[#005fd8] w-[200px] ml-[110px]">

            Login
          </button>

        </form>

      </div>

    
    </Cover>

  )
}

export default Login
