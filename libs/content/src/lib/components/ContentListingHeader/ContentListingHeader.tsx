import { createStyles, makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
/* eslint-disable no-debugger */
import SyncIcon from '@mui/icons-material/Sync';
import {
  Box,
  Button,
  FormControl,
  Menu,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { ErrorTooltip, FilterIcon, useAccess } from '@platformx/utilities';
import { t } from 'i18next';
import { useState } from 'react';
import {
  ContentListingHeaderContainer,
  FormControlCustom,
} from './ContentListingHeader.styles';
import { contentTypeBasedHideFilter } from './helperContentList';

const ContentListingHeader = ({
  handleFilter,
  handleAddNew,
  title = '',
  category,
  subCategory,
  handleRefresh,
  animationState,
}: {
  title: string;
  handleFilter: (filter: string) => void;
  handleAddNew: () => void;
  category: string;
  subCategory: string | string[];
  handleRefresh: () => void;
  animationState: boolean;
}) => {
  const { canAccessAction } = useAccess();
  const searchPageUrl = new URL(window.location.href);
  const [filterValue, setFilterValue] = useState(
    searchPageUrl.searchParams.get('searchCat')
      ? (searchPageUrl.searchParams.get('searchCat') as string)
      : 'ALL'
  );
  const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);
  const openFilterMenu = Boolean(filterMenu);
  const handleFilterClose = () => {
    setFilterMenu(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = () => (event.target as HTMLInputElement).value;

    setFilterValue(selectedValue());
    handleFilter(selectedValue());
    handleFilterClose();
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenu(event.currentTarget);
  };

  const hideFilter = contentTypeBasedHideFilter(title); //hide filter
  ;
  return (
    <ContentListingHeaderContainer>
      <Box>
        <Typography variant="h4bold" textTransform={'uppercase'}>
          {t(`${title.toLocaleLowerCase()}`)}
        </Typography>
      </Box>
      <Box style={{ display: 'flex' }}>
        <Box
          onClick={handleRefresh}
          sx={{
            backgroundColor: 'white',
            padding: { xs: '8px', md: '10px' },
            borderRadius: '4px',
            marginRight: '10px',
            border: '1px solid #14142B',
            height: { xs: '42px', md: '46px' },
            width: '42px',
            alignItem: 'center',
            cursor: 'pointer',
            justifyContent: 'center',
          }}
        >
          <SyncIcon
            sx={{
              color: '#2d2d39',
              verticalAlign: 'middle',
              fontSize: { md: '21px' },
              cursor: 'pointer',
              animation: animationState ? '$spin 5s linear infinite' : 'none',
            }}
          />
        </Box>

        {/* based on condition filter button will enable  */}
        {hideFilter && (
          <Box
            onClick={handleFilterClick}
            sx={{
              backgroundColor: openFilterMenu ? '#2d2d39' : 'white',
              padding: { xs: '8px', md: '10px' },
              borderRadius: '4px',
              border: '1px solid #14142B',
              display: 'flex',
              height: { xs: '42px', md: '46px' },
              width: '42px',
              alignItems: 'center',
              cursor: 'pointer',
              justifyContent: 'center',
              '&.openClass img': {
                filter:
                  'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(6197%) hue-rotate(110deg) brightness(97%) contrast(99%);',
              },
            }}
            className={openFilterMenu ? 'openClass' : undefined}
          >
            <img src={FilterIcon} alt="" width="17" height="24" />
          </Box>
        )}

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
              padding: '10px 18px',
            },
          }}
        >
          <FormControl>
            <RadioGroup
              value={filterValue}
              onChange={handleChange}
              sx={{ textTransform: 'capitalize' }}
            >
              <FormControlCustom
                className="listView"
                value="ALL"
                control={<Radio sx={{ display: 'none' }} />}
                label={t('all')}
              />
              <FormControlCustom
                className="listView"
                value="PUBLISHED"
                control={<Radio sx={{ display: 'none' }} />}
                label={t('published')}
              />
              <FormControlCustom
                className="listView"
                value="DRAFT"
                control={<Radio sx={{ display: 'none' }} />}
                label={t('draft')}
              />
              <FormControlCustom
                className="listView"
                value="UNPUBLISHED"
                control={<Radio sx={{ display: 'none' }} />}
                label={t('unpublished')}
              />
              {title.toLowerCase() === 'event' && (
                <FormControlCustom
                  className="listView"
                  value="LIVE"
                  control={<Radio sx={{ display: 'none' }} />}
                  label={t('live')}
                />
              )}
            </RadioGroup>
          </FormControl>
        </Menu>

        <ErrorTooltip
          component={
            <Button
              className="addnewpage"
              variant="primaryButton"
              disabled={
                !canAccessAction(category, subCategory, 'Create')
                //   || title === 'Course'
              }
              sx={{
                display: { xs: 'none', sm: 'flex' },
                marginLeft: '12px',
              }}
              onClick={handleAddNew}
            >
              {t('create_new')}
            </Button>
          }
          doAccess={
            !canAccessAction(category, subCategory, 'Create')
            //||title === 'Course'
          }
        />
      </Box>
    </ContentListingHeaderContainer>
  );
};
export default ContentListingHeader;
