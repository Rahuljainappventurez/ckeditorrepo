import React from 'react'
import './button-custom.scss';

const ButtonCustom = ({type,text}) => {
  return (
      <button type={type?type:'button'} className='button-custom-component'>
      {text}
    </button>
  )
}

export default ButtonCustom
