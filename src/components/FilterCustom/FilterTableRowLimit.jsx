import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Grid, MenuItem, Select } from "@mui/material";
import './filter-table-row-limit.scss';
import PropTypes from 'prop-types';

const FilterTableRowLimit = ({ filterListArray, filterKeysArray, setFilterKey, filterKey, label, setCurrentPage }) => {

    const [open, setOpen] = useState(false);
    return (
        <Grid className="filter-table-row-limit-container">
            <FormControl sx={{ width: '100%', border: 'none' }} >
                {!filterKey && <InputLabel className="dropdown-label" shrink={false} id="demo-multiple-name-label">{label}</InputLabel>}
                <Select

                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={filterKey}
                    onChange={(e) => {
                        setFilterKey(e.target.value);
                        setCurrentPage(1);
                    }}
                    style={{ backgroundColor: '#ffffff', cursor: 'pointer', height: '30px', }}
                    IconComponent={() => <DropDownArrow open={open} setOpen={setOpen} />}
                    MenuProps={{
                        classes: {
                            list: 'filter-table-ul-custom-css',
                        }
                    }}
                >
                    {
                        filterListArray?.map((name, index) => (
                            <MenuItem
                                className="filterCustom-menuItem"
                                key={`${name}-${index + 1}`}
                                value={filterKeysArray ? filterKeysArray[index] : name.split(" ").join("")}
                            >
                                {name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Grid>
    );
}

FilterTableRowLimit.propTypes = {
    filterListArray: PropTypes.array.isRequired,
    filterKeysArray: PropTypes.array,
    setFilterKey: PropTypes.func.isRequired,
    filterKey: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
};

export default FilterTableRowLimit

// custom arrow in dropdown 

const DropDownArrow = ({ open, setOpen }) => (
    <>
        {
            !open ? <svg className="dropdown-svg-rotate" onClick={() => setOpen(true)} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 0.75L6 5.25L1.5 0.75" stroke="#71747D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg> :
                <svg className="dropdown-svg-rotate dropdown-svg-rotate-2" onClick={() => setOpen(true)} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 0.75L6 5.25L1.5 0.75" stroke="#71747D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
        }
    </>
)

DropDownArrow.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

