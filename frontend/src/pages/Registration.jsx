import React from 'react'
import { useForm } from 'react-hook-form'

function Registration() {

  const {register, handleSubmit, formState:{ errors }} = useForm()

  return (
    <div>
      Registration
    </div>
  )
}

export default Registration
