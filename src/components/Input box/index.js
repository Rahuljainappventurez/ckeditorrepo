import React, { useState } from 'react';
import '../../assets/css/global-style.scss';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './input-box.scss';

const InputBox = ({ type, placeholder, name, id, handleChange, handleBlur, value, disable, maxLength }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {
        (type !== 'password') ?
          <input
            className='custom-input-box'
            type={type}
            onChange={handleChange}
            placeholder={placeholder}
            name={name}
            id={id}
            onBlur={handleBlur}
            value={value}
            disabled={disable}
            maxLength={maxLength}
          />
          :

          <Grid className='input-box-passowrd-container'>
            <OutlinedInput
              onChange={handleChange}
              placeholder={placeholder}
              name={name}
              id={id}
              onBlur={handleBlur}
              value={value}
              disabled={disable}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
      }
    </>
  )
}

export default InputBox
