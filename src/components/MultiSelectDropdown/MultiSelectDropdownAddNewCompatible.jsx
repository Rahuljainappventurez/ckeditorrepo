import React, { useState, useEffect, useRef } from 'react';
import { Chip, Grid } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import SearchCustom from 'components/search-custom/SearchCustom';
import './multi-select-dropdown.scss';

const MultiSelectDropdownAddNewCompatible = ({ dropdownArray, selectedItems, setSelectedItems, handleDeleteItem }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Ensure selectedItems is initialized as an array if it's initially null or undefined
    const itemsToRender = Array.isArray(selectedItems) ? selectedItems : [];

    // Filter the array based on the search term
    const filteredOptions = dropdownArray.filter((option) => {
        if (!searchTerm) return true;
        return option.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='custom-multi-select-dropdown-component' ref={dropdownRef}>
            <div className="dropdown">
                <Grid
                    onClick={(e) => {
                        e.preventDefault();
                        setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className="dropbtn"
                    display={'flex'}
                    justifyContent={'space-between'}
                >
                    <div className='custom-multi-select-selected-chip'>
                        {itemsToRender?.length ? (
                            itemsToRender?.map((item, index) => (
                                <Chip
                                    key={index}
                                    label={item}
                                    onDelete={() => handleDeleteItem(item)}
                                />
                            ))
                        ) : (
                            <p>{'Select Resource'}</p>
                        )}
                    </div>

                    {!isDropdownOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                </Grid>
                <div
                    id="myDropdown"
                    className="dropdown-content"
                    style={{ display: `${isDropdownOpen ? 'block' : 'none'}` }}
                >
                    <Grid padding={'0 12px'} mb={'10px'}>
                        <SearchCustom setSearchKey={setSearchTerm} />
                    </Grid>
                    {filteredOptions.length ? (
                        filteredOptions.map((option, index) => (
                            <Grid
                                key={index}
                                style={{
                                    backgroundColor: itemsToRender.includes(option)
                                        ? 'rgba(17, 205, 239, 0.1)'
                                        : '#FFFFFF',
                                }}
                                onClick={() => setSelectedItems(option)}
                                className='custom-multi-select-menu-item'
                            >
                                <p>{option}</p>
                            </Grid>
                        ))
                    ) : (
                        <Grid className='custom-multi-select-menu-item item-not-found'>
                            <p>No results found.</p>
                        </Grid>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiSelectDropdownAddNewCompatible;
