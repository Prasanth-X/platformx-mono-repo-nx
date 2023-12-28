import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Grid, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next'; 
import {TextBox} from '@platformx/utilities';
import {DatePicker} from "@platformx/utilities"
import { FiltersObj } from '../../../Utils/search.types';
import Tags from './Tags';

const FilterContent = styled((props: MenuProps) => (
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
    sx={{
      '& .Platform-x-Paper-root': {
        borderRadius: '8px',
        maxWidth: { xs: 'calc(100% - 20px)', md: '669px' },
        padding: '12px',
        boxShadow: 'none',
        marginTop: '38px',
        marginLeft: { xs: '-5px', md: '33px' },
        maxHeight: { xs: 'calc(100vh - 140px)', md: 'auto' },
      },
    }}
    {...props}
  />
))();

export default function AdvanceFilter({ handleFilters, handleSearchData }) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [toggleState, setToggleState] = React.useState(true);
  const disablePast = false;
  const open = Boolean(anchorEl);
  const [filters, setFilters] = React.useState<FiltersObj>({
    tags: [],
    author: '',
    fromDate: '',
    toDate: '',
  });
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTags = (tags) => {
    setFilters({ ...filters, tags: tags });
  };

  const handleSearch = () => {
    handleFilters({ ...filters });
    handleSearchData(filters);
    handleClose();
  };

  const toggleDateFilter = (e) => {
    setToggleState(e.target.checked);
    if (!e.target.checked) {
      setFilters({
        ...filters,
        fromDate: '',
        toDate: '',
      });
    }
  };

  return (
    <div>
      <Box className='filterBtn' onClick={handleClick}>
        <FilterListIcon />
      </Box>
      <FilterContent anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Grid container className='advFilterBox'>
          <Grid item xs={12} mb={2}>
            <Typography variant='h6bold' className='labelText'>
              {t('filters')}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant='h7bold' className='labelText'>
              {t('tags')}
            </Typography>
            <Tags handleTags={handleTags} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Typography variant='h7bold' className='labelText'>
                  {t('author')}
                </Typography>
                <TextBox
                  handleChange={(e) => {
                    setFilters({ ...filters, author: e.target.value });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                sx={{
                  '& .Platform-x-Typography-root': {
                    fontSize: '12px',
                    fontWeight: 700,
                  },
                }}
                onChange={(e) => {
                  toggleDateFilter(e);
                }}
                label={t('date')}
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={6} mb={2} sx={{ pr: { xs: 0, md: '12px' } }}>
                <Typography variant='h7bold' className='labelText'>
                  {t('from')}
                </Typography>
                <DatePicker
                  time={filters.fromDate}
                  handleValChange={(newValue) => {
                    setFilters({
                      ...filters,
                      fromDate: newValue?.toISOString(),
                    });
                  }}
                  handleDateChangeRaw={()=>{ console.info("selected vaalue")}}
                  isDisabled={!toggleState}
                  disablePast={disablePast}
                />
              </Grid>
              <Grid item xs={12} md={6} mb={2} sx={{ pl: { xs: 0, md: '12px' } }}>
                <Typography variant='h7bold' className='labelText'>
                  {t('to')}
                </Typography>
                <DatePicker
                  time={filters.toDate}
                  handleValChange={(newValue) => {
                    setFilters({
                      ...filters,
                      toDate: newValue?.toISOString(),
                    });
                  }}
                  handleDateChangeRaw={()=>{ console.info("selected vaalue")}}
                  isDisabled={!toggleState}
                  disablePast={disablePast}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleSearch}>
              {t('search')}
            </Button>
          </Grid>
        </Grid>
      </FilterContent>
    </div>
  );
}
