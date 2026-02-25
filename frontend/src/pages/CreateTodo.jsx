import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { createTodo } from '../setUp/todosThunk.js'
import { DayPicker } from "react-day-picker"
function CreateTodo() {


  const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm()
  const dispatch = useDispatch()

  const selectedDate = watch("dueDate")
  const create =  (formData)=>{
     dispatch(createTodo(
      {
        title: formData.title,
        description: formData.description.trim().length > 0? formData.description : undefined,
        dueDate: formData.dueDate?.toISOString() || formData.dueDate,
        category: formData.category
      }
    ))
     reset()
  
  }

  return (
    <div>
     
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
   
      <dialog id="my_modal_1" className="modal">
         
         <form onSubmit={handleSubmit(create) }>
          
          
        <div className="modal-box w-[500px]">
        
          <div>
              
            
            <label htmlFor="title">Title <span className='text-red-500'>*</span></label>
            <button type='button' className='btn relative left-[400px]' onClick={()=>{ document.getElementById("my_modal_1").close(); reset()}}>X</button>
            
            <br />
            <input id='title' type="text" className='input w-[400px] border dark:border-white focus:outline-none'
            {...register("title",{
              required: true
            })}
            />
          </div>
          <div className='mt-3'>

            <label htmlFor="desc">Description</label>
            <textarea id='desc' className="textarea h-24 w-[400px] focus: outline-none border dark:border-white"
            {...register("description")}
            />

          </div>

          <button type='button' popoverTarget="rdp-popover" className="input input-border focus: outline-none border border-white mt-3 p-2" style={{ anchorName: "--rdp" } }>
          {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
           
           </button> 
          <div popover="auto" id="rdp-popover" className="dropdown h-50px" style={{ positionAnchor: "--rdp" }}>


              <Controller
              name='dueDate'
              control={control}
              render={({ field }) => (
                <>
              
                  <DayPicker
                    className="react-day-picker"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  
                </>
              )}
            />
          </div>
             <br />
          <select name="category" id="category" className='mt-3 focus: outline-none p-1 rounded-md'{...register("category")}>
            <option value="non-urgent">non-urgent</option>
           
            <option value="urgent">Urgent</option>
          </select>
          <br />
          <button type='submit' className='btn dark:bg-green-300 dark:text-black w-[100px] font-bold mt-3' onClick={()=>document.getElementById("my_modal_1").close()}>Create</button>

  
        </div>
        </form>
      </dialog>
     
    </div>

  )

}

export default CreateTodo
