import React, { useEffect, useRef, useState } from 'react';
import { Chip, Grid } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import SearchCustom from 'components/search-custom/SearchCustom';
import './multi-select-dropdown.scss';

const MultiSelectDropdown = ({ dropdownArray, setSelectedItemsData, placeholder, disabled }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const dropdownRef = useRef(null);

    // Close the dropdown when the user clicks outside of it
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

    // Filter the array based on the search term
    const filteredOptions = dropdownArray.filter((item) => {
        if (!searchTerm) return true;
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSelectItem = (item) => {
        const updatedSelectedItems = selectedItems.includes(item.id)
            ? selectedItems.filter((selectedItem) => selectedItem !== item.id)
            : [...selectedItems, item.id];

        setSelectedItems(updatedSelectedItems);
        setSelectedItemsData(updatedSelectedItems); // Set the selected IDs in the parent component
    };

    const handleDeleteItem = (itemId) => {
        const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem !== itemId);
        setSelectedItems(updatedSelectedItems);
        setSelectedItemsData(updatedSelectedItems); // Update the parent component
    };

    return (
        <div className={`custom-multi-select-dropdown-component ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
            <div className="dropdown">
                <Grid
                    onClick={(e) => {
                        e.preventDefault();
                        if (!disabled) {
                            setIsDropdownOpen(!isDropdownOpen);
                        }
                    }}
                    className={`dropbtn ${disabled ? 'disabled' : ''}`}
                    display={'flex'}
                    justifyContent={'space-between'}
                    style={{ cursor: disabled ? 'default' : 'pointer', backgroundColor: disabled ?'rgba(239, 239, 239, 0.3)':'' }}
                >
                    <div className='custom-multi-select-selected-chip'>
                        {selectedItems?.length ? (
                            selectedItems.map((itemId, index) => {
                                const item = dropdownArray.find(data => data.id === itemId);
                                return (
                                    <Chip
                                        key={index}
                                        label={item.name}
                                        onDelete={() => handleDeleteItem(itemId)}
                                        disabled={disabled}
                                    />
                                );
                            })
                        ) : (
                            <p>{placeholder}</p>
                        )}
                    </div>

                    {!isDropdownOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                </Grid>
                <div
                    id="myDropdown"
                    className="dropdown-content"
                    style={{ display: `${isDropdownOpen ? 'block' : 'none'}`, pointerEvents: disabled ? 'none' : 'auto' }}
                >
                    <Grid padding={'0 12px'} mb={'10px'}>
                        <SearchCustom setSearchKey={setSearchTerm} />
                    </Grid>
                    {filteredOptions.length ? (
                        filteredOptions.map((item, index) => (
                            <Grid
                                key={index}
                                style={{
                                    backgroundColor: selectedItems.includes(item.id)
                                        ? 'rgba(17, 205, 239, 0.1)'
                                        : '#FFFFFF',
                                }}
                                onClick={() => handleSelectItem(item)}
                                className='custom-multi-select-menu-item'
                            >
                                <p>{item.name}</p>
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

export default MultiSelectDropdown;
