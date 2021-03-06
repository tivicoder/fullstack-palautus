import React from 'react'

const FormInput = ({ name, value, valueChanged, type='text' }) => {
  return (
    <div>
      {name}: <input id={name} type={type} value={value} name={name}
        onChange={({ target }) => {valueChanged(target.value)}} />
    </div>
  )
}

export default FormInput
