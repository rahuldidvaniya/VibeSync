import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const GenreSearchDropdown = ({
  options,
  loading,
  onInputChange,
  onChange,
  value,
  inputValue,
  placeholder,
  getOptionLabel,
  isOptionEqualToValue,
}) => {
  return (
    <Autocomplete
      options={options || []}
      loading={loading}
      onInputChange={onInputChange}
      onChange={onChange}
      value={value}
      inputValue={inputValue}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <SearchIcon sx={{ color: 'text.secondary', ml: 1, mr: 1 }} />
                {params.InputProps.startAdornment}
              </>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1DB954',
              },
            },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          {option.label}
        </li>
      )}
    />
  );
};

export default GenreSearchDropdown; 