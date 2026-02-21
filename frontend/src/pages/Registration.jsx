import React from 'react'
import { useForm } from 'react-hook-form'
import Cover from '../setUp/Cover.jsx'
import { signupUser } from '../setUp/authThunks.js'
import { useDispatch } from 'react-redux'

function Registration() {

  const {register, handleSubmit, formState:{ errors }} = useForm()
  const dispatch = useDispatch()

  const submit = (formData)=>{

    dispatch(signupUser(formData))

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
            <input type="text" placeholder='write your username' className='w-96 p-3 h-10 border border-black dark:border-white dark:bg-gray-700 dark:text-white'
            {...register("username", {
              required:true
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

         

         <div className='m-5'>

          <label htmlFor="role">Choose your role </label>
          <select name="role" id="role"  
          {...register("role")}>

            <option value= ""> Choose Your Role</option>
           <option value="admin"> Admin </option>
           <option value="user">User</option>

          </select>

         </div>
          <button type='submit' className="btn bg-[#1A77F2] text-white border-[#005fd8] w-[200px] ml-[110px]">

            Signup
          </button>

        </form>

      </div>
    </Cover>
  )
}

export default Registration
