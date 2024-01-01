import React, { useState } from 'react'
import './InputForm.css'

const InputForm = (props) => {

  const [focused, setFocused] = useState(false)
  // console.log('propesssss',props)

  const { onChange, label, errorMessage, id, ...inputprops } = props

  const handleFocused = () => {
    setFocused(true)
  }


  return (
    <div className='inputform'>
      <label htmlFor="">{label} </label>
      <input className='inputfield'{...inputprops} onChange={onChange} onBlur={handleFocused} focused={focused.toString()} />
      <span className='errormessage'>{errorMessage}</span>
    </div>
  )
}

export default InputForm