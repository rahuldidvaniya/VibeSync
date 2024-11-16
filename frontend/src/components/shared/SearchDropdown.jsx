import { Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchDropdown = ({
  options,
  loading,
  onInputChange,
  onChange,
  placeholder,
  getOptionLabel,
  isOptionEqualToValue,
  renderOption
}) => {
  return (
    <Autocomplete
      options={options || []}
      loading={loading}
      onInputChange={onInputChange}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return renderOption({ ...otherProps, key }, option);
      }}
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
        />
      )}
    />
  );
};

export default SearchDropdown; 