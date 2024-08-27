import React from 'react'
import '../../assets/css/global-style.scss';

const TextareaCustom = ({
    id,
    name,
    row,
    cols,
    placeholder,
    handleChange,
    handleBlur,
    value,
    disabled,
    minHeight,
}) => {
    return (
        <>
            <textarea
                className='textarea-custom-component'
                id={id}
                name={name}
                rows={row ?? 4}
                cols={cols ?? 50}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                disabled={disabled}
                style={{minHeight:`${minHeight}px`}}
            >
            </textarea>
        </>
    )
}

export default TextareaCustom
