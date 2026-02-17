import React, { useState } from 'react'
import { useForm } from "react-hook-form"

function Login() {

  const { register, handleSubmit, formState: { error } } = useForm()
  return (
    <div className='relative h-screen'>
      <div className='absolute top-[270px] left-[530px]'>
        <form className='border p-5 dark:border-white border-black' >
          <div className='m-5'>
            <input type="email" placeholder='write your email' className='w-96 p-3 h-10 border border-black' />
          </div>
          <div className='m-5'>
            <input type="password" placeholder='write your password' className='w-96 p-3 h-10 border border-black' />
          </div>
          <button className="btn bg-[#1A77F2] text-white border-[#005fd8] w-[200px] ml-[80px]">
            
            Login
          </button>

        </form>

      </div>

    </div>

  )
}

export default Login
