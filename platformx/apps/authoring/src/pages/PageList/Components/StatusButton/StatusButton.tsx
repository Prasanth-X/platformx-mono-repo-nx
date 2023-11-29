import { Box } from '@mui/material/';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core';

import { STATUS } from '../../Utils/constants';
import { PageStatusButtonProps } from './StatusButton.types';
//import siteLevelSchema from '../../utils/siteLevelSettings.json'

const useStyles = makeStyles(() => ({
  activeCardItem: {
    color: '#313335',
  },
}));
export const PageStatusButton = ({
  filterItem,
  activeItem,
  onDuplicatePage,
}: PageStatusButtonProps) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: { sm: 'inline', xs: 'inline', lg: 'flex', md: 'flex' },
        paddingBottom: '40px',
        width: { sm: '100%', xs: '100%', lg: '94%', md: '94%' },
      }}
    >
      {STATUS?.map((pageStatusList) => (
        <MenuItem
          className={
            activeItem == pageStatusList.name ? classes.activeCardItem : ''
          }
          sx={{
            fontSize: { sm: '15px', xs: '15px', lg: '26px', md: '26px' },
            display: {
              sm: 'inline-block',
              xs: 'inline-block',
              lg: 'flex',
              md: 'flex',
            },
            color: '#808080',
            textTransform: 'capitalize',
          }}
          onClick={() => filterItem(pageStatusList?.name)}
          key={pageStatusList?.name}
        >
          {pageStatusList?.name}
        </MenuItem>
      ))}
      <Button
        variant='contained'
        sx={{
          marginLeft: { sm: '10px', xs: '10px', lg: 'auto', md: 'auto' },
          marginBottom: { sm: '25px', xs: '25px' },
          minWidth: { sm: '120px', xs: '120px', lg: '150px', md: '150px' },
          padding: {
            sm: '1px',
            xs: '1px',
            lg: '10px 20px',
            md: '10px 20px',
          },
        }}
        onClick={() => onDuplicatePage(false, undefined)}
      >
        + Add New
      </Button>
    </Box>
  );
};
