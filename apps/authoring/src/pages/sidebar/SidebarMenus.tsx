import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import { useMapPermissions } from '../../hooks/usePermissions/useMapPermissions';
import MenuList from './MenuList';
import { MenuBox } from './sidebar.style';

const SidebarMenus = ({
  index,
  defaultPageState,
  setDefaultPageState,
  contentType,
  url,
  name,
  id,
  selectedType,
  subMenus,
  handlePagesType,
  roles,
}) => {
  let { hasNavigationAccess } = useMapPermissions();
  const useStyles: any = makeStyles(() => ({
    expanded: { '& svg': { transform: 'rotate(270deg)' } },
    content: {
      margin: '15px 0 ',
      '&$expanded': {
        margin: '15px 0 ',
      },
    },
  }));
  const classes = useStyles();
  const navigate = useNavigate();
  const handleClick = (to: string) => {
    if (
      to !== defaultPageState &&
      to !== '/content' &&
      to !== '/post' &&
      to !== '/event' &&
      to !== '/user-management' &&
      to !== '/site-setting'
    ) {
      navigate(to);
    } else {
      setDefaultPageState(to);
    }
  };
  const checkSubMenuAccess = () => {
    const accessibleMenus = subMenus?.filter((element) => {
      if (hasNavigationAccess(element?.name?.toLowerCase())) {
        return element;
      }
    });

    return accessibleMenus.length > 0;
  };
  return (
    <Accordion
      // disabled={!navigationAccess.includes(name?.toLowerCase())}
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        '&.Mui-disabled': { backgroundColor: 'transparent' },
      }}
      expanded={
        url === defaultPageState || defaultPageState.includes(contentType)
      }
      key={index}
    >
      <AccordionSummary
        classes={{
          content: classes.content,
          expanded: classes.expanded,
        }}
        sx={{ padding: 0, minHeight: '30px !important' }}
        expandIcon={
          name != 'Menu' ? <ChevronRightIcon /> : <ChevronRightIcon />
        }
        aria-controls='panel1a-content'
        id={`panel${index}a-header`}
        key={index}
        onClick={() => handleClick(url)}
      >
        <Typography
          variant='h7bold'
          sx={{
            textTransform: 'uppercase',
            color: '#5c6574',
            margin: 0,
          }}
        >
          {!checkSubMenuAccess() ? (
            <MenuBox disabled={!hasNavigationAccess(id?.toLowerCase())}>
              {id}
            </MenuBox>
          ) : (
            <MenuBox> {id}</MenuBox>
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0' }}>
        <MenuList
          key={name}
          subMenus={subMenus}
          handlePagesType={handlePagesType}
          handleClick={handleClick}
          type={name}
          selectedType={selectedType}
        ></MenuList>
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarMenus;
