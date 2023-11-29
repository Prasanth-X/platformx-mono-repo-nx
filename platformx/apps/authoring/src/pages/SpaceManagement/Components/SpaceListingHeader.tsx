import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useStyles } from './SpaceListingHeader.styles';
import SearchBox from '../../UserManagement/Users/SearchBox';

const SpaceListingHeader = ({ title, handleSearch }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    if (title === 'members') {
      navigate(`/community/create-member`);
    } else navigate(`/community/create-${title}`);
  };

  return (
    <Box className={`${classes.container} main-container`}>
      <Box>
        <Box className='titleStyles'>
          <Typography variant='h3bold'>{t('community_space')}</Typography>
        </Box>
      </Box>

      <Box className='rightSidePart'>
        <Box className='spaceSearch'>
          <SearchBox handleSearch={handleSearch} />
        </Box>

        <Button
          variant='contained'
          className='rightSidePartButton'
          onClick={handleCreateNew}
        >
          <AddIcon className='rightSidePartAddIcon' />
          {t('add_new')}
        </Button>
      </Box>
    </Box>
  );
};

export default SpaceListingHeader;
