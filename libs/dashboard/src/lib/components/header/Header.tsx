import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ title = '', titleVariant, linkText = '' }: any) => {
  return (
    <Box className='header'>
      <Typography variant={titleVariant}>{title}</Typography>
      {linkText && (
        <Link to='/page-list' className='link'>
          {linkText}
        </Link>
      )}
    </Box>
  );
};

export default Header;
