import React from 'react'
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"

function CreateTodo() {

  const { register, handleSubmit, formState: { errors } } = useForm()

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
            <input id='title' type="text" className='input w-[400px] border dark:border-white focus:outline-none' />
          </div>
          <div className='mt-3'>
            <fieldset className="fieldset">
              <legend className="fieldset-legend mb-1">Description</legend>
              <textarea className="textarea h-24 w-[400px] focus: outline-none border dark:border-white " placeholder="Bio"></textarea>
              
            </fieldset>
          </div>
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
