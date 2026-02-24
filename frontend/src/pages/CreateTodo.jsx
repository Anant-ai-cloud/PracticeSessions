import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useForm, Controller } from "react-hook-form"
import { DayPicker } from "react-day-picker"
function CreateTodo() {


  const { register, handleSubmit, formState: { errors }, control, watch } = useForm()

  const selectedDate = watch("date")

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>open modal</button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-[500px]">
          {/* <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p> */}
          <div>
            <label htmlFor="title">Title <span className='text-red-500'>*</span></label>
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

          <button popoverTarget="rdp-popover" className="input input-border focus: outline-none border border-white mt-3 p-2" style={{ anchorName: "--rdp" } }>
          {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
           
           </button> 
          <div popover="auto" id="rdp-popover" className="dropdown h-50px" style={{ positionAnchor: "--rdp" }}>


              <Controller
              name='date'
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
          


          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>

  )

}

export default CreateTodo
