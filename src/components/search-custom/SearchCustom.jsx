import { Search } from "@mui/icons-material";
import { FormControl, Grid, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState, useEffect } from "react";
import './search-custom.scss';
import PropTypes from 'prop-types';

const SearchCustom = ({ setSearchKey, debounceDelay }) => {
  const [searchTerm, setSearchTerm] = useState('');


  // *********************** for debounce search ********************
  useEffect(() => {
    // Set a timeout to trigger the debounced search
    const handler = setTimeout(() => {
      setSearchKey(searchTerm);
    }, debounceDelay);

    // Cleanup the timeout if the component unmounts or searchTerm changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceDelay, setSearchKey]);


  // ************************ handle change for search box *********************
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Grid className="search-custom">
      <FormControl
        fullWidth
        sx={{ width: "100%" }}
        size="medium"
        variant="outlined"
      >
        <OutlinedInput
          id="outlined-adornment-weight"
          placeholder="Search ....."
          value={searchTerm}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
    </Grid>
  );
}

SearchCustom.propTypes = {
  setSearchKey: PropTypes.func.isRequired,
  debounceDelay: PropTypes.number, // New prop for setting debounce delay
};

SearchCustom.defaultProps = {
  debounceDelay: 0, // Default delay of 0ms
};

export default SearchCustom;
