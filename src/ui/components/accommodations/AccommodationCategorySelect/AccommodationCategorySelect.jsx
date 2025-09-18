import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const categories = [
    { value: 'ROOM', label: 'Room' },
    { value: 'HOUSE', label: 'House' },
    { value: 'FLAT', label: 'Flat' },
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'HOTEL', label: 'Hotel' },
    { value: 'MOTEL', label: 'Motel' }
];

const AccommodationCategorySelect = ({ value, onChange, name = "category" }) => (
    <FormControl fullWidth margin="dense">
        <InputLabel>Category</InputLabel>
        <Select
            name={name}
            value={value}
            onChange={onChange}
            label="Category"
        >
            {categories.map((c) => (
                <MenuItem key={c.value} value={c.value}>
                    {c.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);


export default AccommodationCategorySelect;
