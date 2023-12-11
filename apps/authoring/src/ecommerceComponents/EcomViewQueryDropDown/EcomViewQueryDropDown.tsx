import './EcomViewQueryDropDown.css';
import ThemeConstants from '../../theme/variable';
import { useRef, useState, useEffect } from 'react';
import { nullToArray } from '../../utils/helperFunctions';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box, Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList,
  Paper, Popper, Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';


const EcomViewQueryDropDown = ({ filterData, stateManage = {} }: any) => {
  const { searchTerm = "" } = stateManage

  const { t } = useTranslation();

  const filterQueryAdd = (filteredNames = [], searchTerm = "") => {
    if (nullToArray(filteredNames).length > 0 && ("" + searchTerm).length > 0) {
      return `${t("categories")} = ${filteredNames.join(', ')} ${t("and_search_terms")} ${searchTerm}`;
    } else if (nullToArray(filteredNames).length > 0) {
      return `${t("categories")} = ${filteredNames.join(', ')}`;
    } else if (("" + searchTerm).length > 0) {
      return `${t("search_term")} = ${searchTerm}`;
    } else {
      return `${t("all")}`;
    }
  }

  // const options = ['Product = "SHOES" ORDER BY Created Desc'];
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [, setIndex] = useState(0);

  const handleViewQueryClick = (index: number,) => {
    setIndex(index);
    setOpen(false);
  };

  const handleQueryToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleQueryClose = (event: Event) => {
    if (anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const filteredNames = filterData.filter((item) => item.isCheck).map(item => `"${item.name}"`)
    const finalData = `${filterQueryAdd(filteredNames, searchTerm)} ${t("orderByCreateQuery")}`
    const newOption = Object.assign([], options, { 0: finalData });
    setOptions(newOption);
  }, [filterData, searchTerm])

  return (
    <Box component='span' className='ecommerce-dropdown-custom' >
      <ButtonGroup
        onClick={handleQueryToggle} sx={{ position: 'relative' }}
        disableRipple size="small" variant="text" ref={anchorRef} aria-label="View Query"
      >
        <Button sx={{ paddingRight: '30px', color: ThemeConstants.BLUE_COLOR, textTransform: 'none' }}>
          <Typography variant="h5medium">{t("View_Query")}</Typography>
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="view query"
          aria-haspopup="menu"
          className="dropdown-button"
          sx={{
            color: ThemeConstants.BLUE_COLOR,

          }}
        >
          {open ? <KeyboardArrowDownIcon /> : <NavigateNextIcon />}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleQueryClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      sx={{ width: { sx: '300px', md: '600px' }, whiteSpace: 'normal' }}
                      selected={index === 0}
                      disabled={index === 0}
                      onClick={(event) => handleViewQueryClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default EcomViewQueryDropDown;
