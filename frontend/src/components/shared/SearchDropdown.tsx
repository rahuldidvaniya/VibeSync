import { 
  Autocomplete,  
  styled,
  TextField,
  CircularProgress 
} from '@mui/material';
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';

interface SearchDropdownProps<T> {
  options: T[];
  loading: boolean;
  onInputChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void;
  onChange: (event: React.SyntheticEvent<Element, Event>, value: T | null) => void;
  placeholder?: string;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue: (option: T, value: T) => boolean;
  renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
  value?: T | null;
  inputValue?: string;
}

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  & .MuiOutlinedInput-root {
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    transition: all 0.3s ease;
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    &.Mui-focused {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
` as typeof Autocomplete;

function SearchDropdown<T>({
  options,
  loading,
  onInputChange,
  onChange,
  placeholder = "Search...",
  getOptionLabel,
  isOptionEqualToValue,
  renderOption,
  inputValue
}: SearchDropdownProps<T>): JSX.Element {

  return (
    <StyledAutocomplete<T, false, false, false>
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={(event, value) => onChange(event, value as T | null)}
      getOptionLabel={(option: any) => getOptionLabel(option as T)}
      isOptionEqualToValue={(option: any, value: any) => 
        isOptionEqualToValue(option as T, value as T)
      }
      renderOption={(props, option, _state: AutocompleteRenderOptionState) => 
        renderOption ? 
          renderOption(props, option as T) : 
          <li {...props}>{getOptionLabel(option as T)}</li>
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText="No results found"
      filterOptions={(x) => x}
    />
  );
}

export default SearchDropdown; 