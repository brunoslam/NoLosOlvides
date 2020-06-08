import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const top100Films = [
    { title: 'Corrupto', year: 1994 },
    { title: 'Ladrón', year: 1972 },
    { title: 'Estafador', year: 1974 },
    { title: 'Violador', year: 2008 },
    { title: 'Sacoeleña', year: 1957 }
];
export default function BusquedaAutoCompleteCategoria() {
    return (
        <>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                // defaultValue={[top100Films[2]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        // label="filterSelectedOptions"
                        placeholder="Favorites"
                    />
                )}
            />
        </>
    )
}
