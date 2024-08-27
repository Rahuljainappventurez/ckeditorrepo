import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import './checkbox-custom.scss';
import { FormControlLabel } from '@mui/material';

const CustomIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#B6B7BC" />
    </svg>
);

const CustomCheckedIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.75556 11.7333L13.0222 5.46667L11.7778 4.22222L6.75556 9.24444L4.22222 6.71111L2.97778 7.95556L6.75556 11.7333ZM1.77778 16C1.28889 16 0.870519 15.8261 0.522667 15.4782C0.174815 15.1304 0.000592593 14.7117 0 14.2222V1.77778C0 1.28889 0.174222 0.870519 0.522667 0.522667C0.871111 0.174815 1.28948 0.000592593 1.77778 0H14.2222C14.7111 0 15.1298 0.174222 15.4782 0.522667C15.8267 0.871111 16.0006 1.28948 16 1.77778V14.2222C16 14.7111 15.8261 15.1298 15.4782 15.4782C15.1304 15.8267 14.7117 16.0006 14.2222 16H1.77778Z" fill="#3854E0" />
    </svg>
);

const CheckboxCustom = ({ checked, handleChange, disabled, label }) => (
    <div className='checkbox-custom-component'>
        <FormControlLabel
            value="end"
            control={<Checkbox
                disabled={disabled}
                icon={<CustomIcon />}
                checkedIcon={<CustomCheckedIcon />}
                checked={checked}
                onChange={handleChange}
            />}
            label={label}
            labelPlacement="end"
        />
    </div>
);

export default CheckboxCustom;
