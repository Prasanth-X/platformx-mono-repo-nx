import { useState } from 'react';
import './EcomLeftSidebar.css';
import ThemeConstants from '../../theme/variable';
import CategoriesTree from '../CategoriesTree/CategoriesTree';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ecomLeftSidebarProps = {
  categoriesFilter?: Array<any>
  toggleDrawer?: any,
  onNodeIdHandle?: any,
  loading?: boolean,
  // onClearAll?: any
};

const EcomLeftSidebar = (_props: ecomLeftSidebarProps) => {
  const {
    categoriesFilter = [],
    toggleDrawer = () => { },
    onNodeIdHandle = () => { },
    loading,
    // onClearAll,
  } = _props;
  const { t } = useTranslation();

  const [selectedFilter, setSelectedFilter] = useState('categories');

  const onChangeFilterRadio = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <>
      {loading ?
        <Box
          className="leftsidebar-loader"
          sx={{
            padding: { em: "16px 32px" },
            height: '100%'
          }}
        >
          <Box className="skeleton skeleton-title"></Box>
          {Array.from(Array(7)).map((element) => <Box key={element} className="skeleton skeleton-cat"></Box>)}
        </Box> :
        <Box className="ecommerce-leftsidebar"
          sx={{
            padding: { em: "16px 0 16px 32px" }
          }}>
          <Box
            sx={{
              padding: { em: "10px 15px 10px 0px", xs: '16px' },
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: { xs: `solid 1px ${ThemeConstants.DIVIDER_COLOR}`, em: 'none' }
            }}>
            <Typography
              variant='h5semibold'
              sx={{
                fontSize: ThemeConstants.FONTSIZE_H5,
                fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
                fontFamily: ThemeConstants.PRIMARY_FONT_FAMILY,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                textTransform: 'uppercase',
              }}
            >
              <ArrowBackIosIcon
                className='back-to-page'
                onClick={() => toggleDrawer()}
                sx={{ display: { sm: 'block', em: 'none', fontSize: ThemeConstants.FONTSIZE_H4 } }}
              />
              {t("filters")}
            </Typography>
            {/* <Typography variant='h7regular' className="clear-filter" onClick={onClearAll}>Clear All</Typography> */}
          </Box>

          <Box className='radio-wrapper' sx={{ padding: { xs: '26px 16px 0px 16px', em: '0px' } }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedFilter}
                onChange={onChangeFilterRadio}
                sx={{
                  '& .Platform-x-Radio-colorPrimary svg': {
                    fontSize: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
                  },
                }}
              >
                <FormControlLabel value="categories" control={<Radio sx={{ padding: '5px' }} />}
                  label={<Typography variant="h6regular">{t("categories")}</Typography>}
                />
                <FormControlLabel value="Tags" control={<Radio sx={{ padding: '5px' }} />}
                  label={<Typography variant="h6regular">{t("tags")}</Typography>}
                />
              </RadioGroup>
            </FormControl>

            {selectedFilter === 'categories' ?
              <CategoriesTree
                onNodeIdHandle={onNodeIdHandle}
                categoriesFilter={categoriesFilter}
              /> :
              <Box className='tags-section'>
                <Typography variant="h6regular">
                  {t("no_tags_found")}
                </Typography>
              </Box>}
          </Box>
        </Box >
      }
    </>
  );
};

export default EcomLeftSidebar;