import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Menu } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { nullToObject } from '../../utils/helperFunctions';
import CommonFilter from './CommonFilter';

type CommonDeskTopFilterTypes = {
  arrayData?: any;
  handleChange?: any;
  filterValue?: string;
};
const CommonDeskTopFilter = (props: CommonDeskTopFilterTypes = {}) => {
  const { t } = useTranslation();
  const {
    arrayData = [],
    filterValue = '',
    handleChange,
  } = nullToObject(props);

  const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);
  const openFilterMenu = Boolean(filterMenu);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenu(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterMenu(null);
  };

  const handleChangeHandle = (e) => {
    handleChange(e);
    handleFilterClose();
  };

  const handleCloseFilter = () => {
    handleFilterClose();
  };

  return (
    <Box>
      <Box
        sx={{
          display: { md: 'none' },
          height: '20px',
          width: '20px',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          onClick={handleFilterClick}
          sx={{
            // backgroundColor: openFilterMenu ? '#2d2d39' : 'white',
            padding: { xs: '4px', md: '7px 15px' },
            marginRight: '10px',
            borderRadius: '3px',
            border: '1px solid #ced3d9',
            display: { xs: 'none', md: 'flex' },
            cursor: 'pointer',
            fontSize: '12px',
            alignItems: 'center',
            backgroundColor: '#fff',
            textTransform: 'capitalize',
          }}
        >
          <FilterAltIcon
            sx={{
              // color: openFilterMenu ? 'white' : '#2d2d39',
              verticalAlign: 'middle',
              fontSize: { md: '14px' },
              marginRight: '4px',
            }}
          />
          {t('filter')}
        </Box>

        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={filterMenu}
          open={openFilterMenu}
          onClose={handleFilterClose}
          sx={{
            '.Platform-x-Menu-paper': {
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderRadius: '7px',
              marginTop: '5px',
            },
            '.Platform-x-Menu-list': {
              borderRadius: '4px',
              boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
              border: 'solid 1px rgba(112, 112, 112, 0.1)',
              padding: '0 18px',
            },
            '.form_Control': {
              margin: '0 -18px !important',
              '.form_Control_radio': {
                display: 'none',
                '& + span': {
                  fontSize: '12px',
                },
              },
              label: {
                margin: '0 !important',
                padding: '5px 12px',
                '&:has(> span.Mui-checked)': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  fontWeight: '500',
                },
              },
            },
          }}
        >
          <CommonFilter
            arrayData={arrayData}
            filterValue={filterValue}
            handleChange={handleChangeHandle}
            handleCloseFilter={handleCloseFilter}
          />
        </Menu>
      </Box>
    </Box>
  );
};

export default React.memo(CommonDeskTopFilter);
