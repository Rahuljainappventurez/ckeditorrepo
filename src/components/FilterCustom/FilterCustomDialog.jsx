import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Checkbox, FormControlLabel, Button, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import './filterCustom.scss';
import PropTypes from 'prop-types';
import SearchCustom from 'components/search-custom/SearchCustom';

const FilterCustomDialog = ({
  open,
  setOpen,
  sidebarItems,
  filterOptions,
  onSubmit,
  title,
  description,
  initialSelectedFilters,
  handleChangeCallback,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const initializeFilters = (items) => {
    if (!isEmptyObject(initialSelectedFilters)) {
      return initialSelectedFilters;
    }
    return items.reduce((acc, item) => {
      acc[item.key] = [];
      return acc;
    }, {});
  };

  const [selectedFilters, setSelectedFilters] = useState(initializeFilters(sidebarItems) || {});

  const handleSidebarChange = (index) => {
    setSelectedTab(index);
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[key]?.includes(value)) {
        updatedFilters[key] = updatedFilters[key]?.filter((item) => item !== value);
      } else {
        updatedFilters[key]?.push(value);
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    if (handleChangeCallback) {
      handleChangeCallback(selectedFilters)
    }
  }, [selectedFilters])

  const handleSubmit = () => {
    onSubmit(selectedFilters);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderFilterOptions = (key) => {
    const filteredOptions = filterOptions[key]?.filter((option) =>
      option.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredOptions?.map((option) => (
      <FormControlLabel
        key={option.key}
        className="option-item-container"
        control={
          <Checkbox
            checked={selectedFilters[key]?.includes(option.key)}
            onChange={() => handleFilterChange(key, option.key)}
          />
        }
        label={option.displayName}
      />
    ));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={handleClose}
      aria-labelledby="filter-dialog-title"
    >
      <Grid className="filter-container-dialog">
        <Grid className="filter-header">
          <svg width="53" height="51" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="53" height="51" rx="12" fill="#320C47" />
            <g clipPath="url(#clip0_520_25214)">
              <path d="M23 38H31V34H23V38ZM9 14V18H45V14H9ZM15 28H39V24H15V28Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_520_25214">
                <rect width="48" height="48" fill="white" transform="translate(3 2)" />
              </clipPath>
            </defs>
          </svg>
          <Grid display={'flex'} flexDirection={'column'}>
            <h2>{title}:</h2>
            <p>{description}</p>
          </Grid>
        </Grid>

        <Grid className="filter-body">
          <Grid className="sidebar">
            <List component="nav" className='sidebar-list'>
              {sidebarItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedTab === index}
                  onClick={() => handleSidebarChange(index)}
                  className='sidebar-item'
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Grid>

          <Grid className="filter-content">
            <div className="search-container">
              <SearchCustom setSearchKey={setSearchTerm} />
            </div>

            <div className="options-container">
              {
              renderFilterOptions(sidebarItems[selectedTab].key)
              }
            </div>
          </Grid>
        </Grid>

        <Grid className="filter-footer">
          <Button variant="outlined" onClick={handleClose} className="back-button">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} className="submit-button">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

FilterCustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterOptions: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  selectedFilters: PropTypes.object, // Add selectedFilters prop
};

FilterCustomDialog.defaultProps = {
  title: 'Filters:',
  description: 'Select filters',
  initialSelectedFilters: {}, // Default value
};

export default React.memo(FilterCustomDialog);
