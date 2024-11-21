import SearchDropdown from './SearchDropdown';

export interface Genre {
  value: string;
  label: string;
}

export interface GenreSearchDropdownProps {
  options: Genre[];
  loading: boolean;
  onInputChange: (_: any, query: string) => void;
  onChange: (_: any, genre: Genre | null) => void;
  value: Genre | null;
  inputValue: string;
  placeholder: string;
  getOptionLabel: (option: Genre | null) => string;
  isOptionEqualToValue: (option: Genre, value: Genre) => boolean;
}

const GenreSearchDropdown: React.FC<GenreSearchDropdownProps> = (props) => {
  return <SearchDropdown<Genre> {...props} />;
};

export default GenreSearchDropdown; 