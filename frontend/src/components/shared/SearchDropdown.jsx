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
      onInputChange={(event, newInputValue) => {
        onInputChange(event, newInputValue);
      }}
      onChange={(event, value) => {
        onChange(event, value);
        if (value) {
          onInputChange(event, '');
        }
      }}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      renderOption={renderOption}
      filterOptions={(x) => x}
      clearOnBlur={false}
      clearOnEscape
      value={null}
      freeSolo={false}
      selectOnFocus={false}
      blurOnSelect={true}
      PopperComponent={(props) => (
        <div {...props} style={{ ...props.style, transform: 'none !important' }}>
          {props.children}
        </div>
      )}
      sx={{
        '& .MuiAutocomplete-popper': {
          transform: 'none !important',
          transition: 'none !important',
          animation: 'none !important'
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value=""
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