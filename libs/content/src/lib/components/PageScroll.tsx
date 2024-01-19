import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PageScroll = ({ icons, parentToolTip, srollToView }) => {
  const { t } = useTranslation();
  const [activeScoll, setActiveScroll] = useState('');
  const scrollToView = (id, toolTip) => {
    setActiveScroll(toolTip);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start', //id === "questions" ? "center" : "start",
    });
  };

  useEffect(() => {
    if (parentToolTip !== activeScoll) {
      setActiveScroll(parentToolTip);
    }
  }, [parentToolTip]);

  useEffect(() => {
    if (srollToView !== '') {
      setActiveScroll('socialShare');
      scrollToView(srollToView, 'socialShare');
    } else {
      setActiveScroll(icons[0].tooltip);
    }
  }, [srollToView]);
  return (
    <ButtonGroup
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.12)',
      }}
    >
      {icons?.length > 0
        && icons.map((icon) => (

          <Tooltip
            title={t(icon.tooltip)}
            key={icon.tooltip}
            placement='left'
            sx={{
              '.Platform-x-Tooltip-tooltipPlacementLeft': {
                backgroundColor: 'red',
              },
            }}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#fff',
                  color: '#2d2d39',
                  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
                  paddingRight: '5px',
                  '& .MuiTooltip-arrow': {
                    color: 'black',
                  },
                },
              },
            }}
          >
            <IconButton
              onClick={() => scrollToView(icon.id, icon.tooltip)}
              sx={{
                borderRadius: '0',
                backgroundColor:
                  activeScoll === icon.tooltip ? '#D7ECFD' : 'transparent',
                ':hover': {
                  backgroundColor:
                    activeScoll === icon.tooltip ? '#D7ECFD' : '#f5f6f8',
                },
              }}
            >
              {activeScoll === icon.tooltip ? (
                <img
                  src={icon.iconName}
                  alt="Icon"
                  className="your-custom-class"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(55%) sepia(48%) saturate(2094%) hue-rotate(188deg) brightness(100%) contrast(96%)',

                  }}
                />) : (
                <img
                  src={icon.iconName}
                  alt="Icon" />
              )}
            </IconButton>
          </Tooltip>
        ))
      }
    </ButtonGroup>
  );
};
export default PageScroll;
