import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../theme/variable';

interface PageHeaderList {
  handlePageSearch?: (pageSearchName?: string) => void;
  handleResetInputFilter?: () => void;
  searchTerm?: string;
  setIsSearchHeaderOpen?: (val: boolean) => void;
  setSearchTerm;
  handleSearchChange?: (search?: string) => void;
}

export default function ArticelSearchHeader({
  searchTerm,
  setSearchTerm,
  handleSearchChange,
  setIsSearchHeaderOpen,
  handlePageSearch,
  handleResetInputFilter,
}: PageHeaderList) {
  const { t } = useTranslation();

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const button = e.target as HTMLButtonElement;
      await handlePageSearch(button.value);
    }
  };

  return (
    <>
      <TextField
        inputProps={{ maxLength: 200 }}
        variant='outlined'
        placeholder={t('search')}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon onClick={() => setIsSearchHeaderOpen(false)} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='start'>
              {searchTerm && (
                <CloseRoundedIcon
                  sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '18px',
                    backgroundColor: '#fff',
                  }}
                  onClick={() => handleResetInputFilter()}
                />
              )}
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearchChange(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        sx={{
          width: { xs: '95%', sm: '95%', md: '50%', lg: '50%' },
          '.Platform-x-InputBase-root': {
            height: { xs: '25px', md: '50px' },
            fontSize: ThemeConstants.FONTSIZE_MD,
          },
          '.Platform-x-Input-root:before': {
            borderBottom: '2px solid #2d2d39',
          },
          '.Platform-x-Input-root:after': {
            borderBottom: '2px solid #000000',
          },
          '.Platform-x-Input-root.Mui-disabled:before': {
            borderBottom: '2px solid #c3c3cb',
          },
        }}
      />
    </>
  );
}
