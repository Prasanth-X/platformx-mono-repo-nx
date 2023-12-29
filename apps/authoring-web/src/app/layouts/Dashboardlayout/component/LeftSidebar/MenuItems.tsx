import { KeyboardArrowRight } from '@mui/icons-material';
import { Box, MenuItem, MenuList, Tooltip, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '@platformx/utilities';
// import { Store } from '../../../../store/ContextStore'; 
import { headerMenus } from '../../Utils/constants';
import { removeSearchLocalStorage } from '../../Utils/helper';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion
    sx={{ boxShadow: 'none', padding: '0' }}
    disableGutters
    elevation={1}
    square={false}
    {...props}
  />
))();

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    sx={{
      textTransform: 'uppercase',
      minHeight: 'inherit',
      padding: '10px 18px 0 18px',
    }}
    expandIcon={<KeyboardArrowRight />}
    {...props}
  />
))(() => ({
  '& .Platform-x-AccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .Platform-x-AccordionSummary-content': {
    margin: '0px 0px 0px 2px',
    color: '#6E7191',
  },
  '& .Platform-x-SvgIcon-root': {
    color: '#6E7191',
    fontSize: '22px',
  },
}));

export default function MenuItems({
  Title,
  MenuName,
  open,
  roles,
  props,
  url = '',
  handleMenuclose,
  handleMenuAction,
}) {
  const { t } = useTranslation();
  const { canAccessContent } = useAccess();
  const navigate = useNavigate();
  // const { dispatch } = React.useContext(Store);

  const [expanded, setExpanded] = useState<string | true>('1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : true);
    };
  const Menu = MenuName.filter((obj, index) => {
    return index === MenuName.findIndex((o) => obj.id === o.id);
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    if (open && ifTab) return true;
    if (!open && !ifTab) return true;
    if (!open && ifTab) return false;
  };
  return (
    <>
      {getBreakPoint() && headerMenus.includes(Title?.toLowerCase()) && (
        <Box
          className="menuItemLink"
        // disabled={!roles.includes(localStorage.getItem('role'))}
        >
          <Typography
            variant="h7regular"
            sx={{ textTransform: 'uppercase', color: '#6E7191' }}
          >
            {t(Title)}
          </Typography>
        </Box>
      )}
      {getBreakPoint() && !headerMenus.includes(Title?.toLowerCase()) ? (
        <Accordion
          expanded={expanded === '1'}
          onChange={handleChange('1')}
          // disabled={!roles.includes(localStorage.getItem('role'))}
          sx={{
            boxShadow: 'none',
            borderRadius: '0px',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary>
            <Typography variant="h7regular">{t(Title)}</Typography>
          </AccordionSummary>
          <MenuList className="menulinks">
            {Menu.map((val, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    removeSearchLocalStorage();
                    // dispatch({ type: 'CLEAR_CONTENT' });
                    navigate(val.url);
                    if (isMobile) {
                      console.log('menu items');
                      handleMenuclose(false);
                    }
                    handleMenuAction(val.id);
                  }}
                  className={
                    window.location.pathname.includes(val.url) ? 'active' : ''
                  }
                  disabled={
                    !canAccessContent(
                      val.category,
                      val.subCategory?.toLowerCase()
                    )
                  }
                >
                  <Box className="menuIcon">
                    <val.Icon alt={val.subCategory} />
                  </Box>
                  <Tooltip placement="top-start" title={t(val.id)}>
                    <Typography variant="h6regular" className="textellipsis">
                      {t(val.id)}
                    </Typography>
                  </Tooltip>
                </MenuItem>
              );
            })}
          </MenuList>
        </Accordion>
      ) : (
        <MenuList className="menulinks othermenu">
          {Menu.map((val, index) => {
            return (
              <MenuItem
                key={index}
                onClick={() => {
                  removeSearchLocalStorage();
                  // dispatch({ type: 'CLEAR_CONTENT' }); // TODO: check if this is needed
                  navigate(val.url);
                  if (isMobile) {
                    console.log('menu items');
                    handleMenuclose(false);
                  }
                  handleMenuAction(val.id);
                }}
                disabled={
                  !canAccessContent(
                    val.category,
                    val.subCategory?.toLowerCase()
                  )
                }
                className={
                  window.location.pathname.includes(val.url) ? 'active' : ''
                }
              // disabled={!roles.includes(localStorage.getItem('role'))}
              >
                <Box className="menuIcon padding">
                  <img src={val.Icon} alt="" />
                </Box>
                <Tooltip placement="top-start" title={t(val.id)}>
                  <Typography variant="h6regular" className="textellipsis">
                    {t(val.id)}
                  </Typography>
                </Tooltip>
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </>
  );
}
