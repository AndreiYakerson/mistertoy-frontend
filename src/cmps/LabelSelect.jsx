
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 150,
            backgroundColor: '#dee11d'
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelect({ labels, setFilterByToEdit }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: value }))
        
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300, '& .MuiOutlinedInput-notchedOutline': {borderColor: 'purple'} }}>
                <InputLabel sx={{ color: 'purple' }} id="demo-multiple-name-label">Labels</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput  label="Name" />}
                    MenuProps={MenuProps}
                    sx={{ color: 'purple', borderColor: 'yellow' }}
                >
                    {labels.map((label) => (
                        <MenuItem
                            key={label}
                            value={label}
                            style={getStyles(label, personName, theme)}
                            sx={{ color: "purple", backgroundColor: "orange" }}
                        >
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
