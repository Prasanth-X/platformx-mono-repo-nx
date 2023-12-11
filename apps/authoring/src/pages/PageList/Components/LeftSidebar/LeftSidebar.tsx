import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import ThemeConstants from '../../../../theme/variable';
import { PAGE_TYPES } from '../../Utils/constants';
import { LeftSidebarProps } from './LeftSidebar.types';

export default function PageLeftSidebar({
  handleSelectedType,
}: LeftSidebarProps) {
  const searchPageUrl = new URL(window.location.href);
  const [selectedType, setSelectedType] = useState<string>(
    searchPageUrl.searchParams.get('searchCat')
      ? searchPageUrl.searchParams.get('searchCat') as string
      : 'All'
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePageList = (item) => {
    handleSelectedType(item);
  };

  const handlePagesType = (item) => {
    setSelectedType(item.name);
    handlePageList(item);
  };

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography
          variant='subtitle1'
          sx={{
            padding: '10px 25px 10px 25px',
            backgroundColor: '#c0c0c0',
            textTransform: 'uppercase',
            color: ThemeConstants.BLACK_COLOR,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: {
              xs: ThemeConstants.FONTSIZE_DEFAULT,
              xl: ThemeConstants.FONTSIZE_MD,
            },
          }}
        >
          Pages
        </Typography>
        {PAGE_TYPES.map((item, index) => {
          return (
            <Box key={index}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px',
                  cursor: 'pointer',
                }}
                onClick={() => handlePagesType(item)}
              >
                <Typography
                  variant='h6'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: {
                      xs: ThemeConstants.FONTSIZE_DEFAULT,
                      xl: ThemeConstants.FONTSIZE_MD,
                    },
                  }}
                >
                  <item.icon
                    sx={{
                      color: ThemeConstants.BLACK_COLOR,
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  />
                  {item.type}
                </Typography>
                {selectedType &&
                  item.name &&
                  selectedType.toLowerCase() == item.name.toLowerCase() &&
                    <ChevronRightIcon
                      sx={{ fontSize: { xs: '24px', xl: '30px' } }}
                    />}
              </Box>
              <Divider />
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          maxWidth: '100vw',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons={false}
        >
          {PAGE_TYPES.map((item, index) => {
            return (
              <Tab
                label={item.type}
                key={index}
                onClick={() => handlePagesType(item)}
              />
            );
          })}
        </Tabs>
      </Box>
    </>
  );
}
