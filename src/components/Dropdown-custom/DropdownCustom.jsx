import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select } from "@mui/material";
import './dropdown-custom.scss';
import PropTypes from 'prop-types';

const DropownCustom = ({
  dropdownListArray,
  dropdownKeysArray,
  handleChange,
  value,
  label,
  name,
  handleBlur,
  disabledOption,
  dependentDisable
}) => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!disabledOption && !dependentDisable) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (!disabledOption && !dependentDisable) {
      setOpen(false);
    }
  };

  const handleClick = () => {
    if (!disabledOption && !dependentDisable) {
      setOpen(!open);
    }
  };

  return (
    <FormControl disabled={disabledOption || dependentDisable}>
      {!value && <InputLabel className="dropdown-label" shrink={false} id="demo-multiple-name-label">{label}</InputLabel>}
      <Select
        open={open}
        name={name}
        onClose={handleClose}
        onOpen={handleOpen}
        onClick={handleClick}
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={value}
        onChange={handleChange}
        style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
        onBlur={handleBlur}
        IconComponent={() => <DropDownArrow open={open} setOpen={setOpen} disabledOption={disabledOption} dependentDisable={dependentDisable} />}
        MenuProps={{
          classes: {
            list: 'dropdown-custom-css',
          }
        }}
      >
        {dropdownListArray.length ?
          dropdownListArray?.map((name, index) => (
            <MenuItem
              className="dropdown-Custom-menuItem"
              key={`${name}-${index + 1}`}
              value={dropdownKeysArray ? dropdownKeysArray[index] : name.split(" ").join("")}
            >
              {name}
            </MenuItem>
          ))
          :
          <MenuItem disabled className="dropdown-Custom-menuItem">
            No record found
          </MenuItem>
        }
      </Select>
    </FormControl>
  );
}

DropownCustom.propTypes = {
  dropdownListArray: PropTypes.array.isRequired,
  dropdownKeysArray: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleBlur: PropTypes.func,
  disabledOption: PropTypes.bool,
  dependentDisable: PropTypes.bool,
};

export default DropownCustom;

// Custom arrow in dropdown 

const DropDownArrow = ({ open, setOpen, disabledOption, dependentDisable }) => (
  <>
    {
      (!disabledOption || dependentDisable) &&
        !open ?
        <svg className="dropdown-svg-rotate" onClick={() => setOpen(true)} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 0.75L6 5.25L1.5 0.75" stroke="#919499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg> :
        (!disabledOption || dependentDisable) &&
        <svg className="dropdown-svg-rotate dropdown-svg-rotate-2" onClick={() => setOpen(true)} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 0.75L6 5.25L1.5 0.75" stroke="#919499" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    }
  </>
);

DropDownArrow.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  disabledOption: PropTypes.bool,
  dependentDisable: PropTypes.bool,
};
