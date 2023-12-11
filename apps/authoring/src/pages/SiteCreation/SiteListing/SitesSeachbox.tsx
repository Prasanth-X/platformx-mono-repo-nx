import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  TextField,
} from '@mui/material';
import SearchIcon from '../../../assets/SearchIcon.svg';
import '../../../components/Common/Search.css';
import usePopupStyle from './SitesPopup.style';
import { useState } from 'react';
export default function SitesSearchBox({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value?.toLowerCase());
  };
  const resetSearch = () => {
    handleSearch('');
    setSearchQuery('');
  };
  return (
    <>
      <FormControl>
        <TextField
          variant='outlined'
          placeholder='Search your sites'
          value={searchQuery}
          onChange={handleOnChange}
          InputProps={{
            endAdornment: <img src={SearchIcon} color='action' />,
          }}
        />
      </FormControl>
    </>
  );
}
