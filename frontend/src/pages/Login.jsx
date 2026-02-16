import React, { useState } from 'react'
import { useForm } from "react-hook-form"

function Login() {

  const { register, handleSubmit, formState: { error } } = useForm()
  return (
    <div className='relative h-screen'>
      <div className='absolute top-[270px] left-[530px]'>
        <form >
          <div className='m-5'>
            <input type="email" placeholder='Write Your email' className='w-96 h-10 border border-black' />
          </div>
          <div className='m-5'>
            <input type="password" placeholder='write your password' className='w-96 h-10 border border-black' />
          </div>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Email icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="black"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
            Login with Email
          </button>
        </form>

      </div>

    </div>

  )
}

export default Login
