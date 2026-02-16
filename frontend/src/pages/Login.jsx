import React, { useState } from 'react'
import { useForm } from "react-hook-form"

function Login() {

 const { register, handleSubmit, formState:{error}} = useForm()
  return (
    <div className='relative h-screen'>
      <div className='absolute top-[270px] left-[530px]'>
        <form >
          <div className='m-5'>
            <input type="email" placeholder='Write Your email' onChange={(e) => { setEmail(e.target.value) }} className='w-96 h-10 border border-black' />
          </div>
          <div className='m-5'>
            <input type="password" placeholder='write your password' onChange={(e) => setPassword(e.target.value)} className='w-96 h-10 border border-black' />
          </div>

         <button className="btn btn-soft btn-accent">Accent</button>
        </form>

      </div>
    </div>

  )
}

export default Login
