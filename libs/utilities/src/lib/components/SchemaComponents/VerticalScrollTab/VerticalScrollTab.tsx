import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useStyles } from './VerticalScrollTab.styles';

const VerticalScrollTab = ({ icons, handleScroll, activeScroll }) => {
  const { t } = useTranslation();
  const classes = useStyles(activeScroll)();

  return (
    <ButtonGroup className={classes.buttonGroup}>
      {icons?.length > 0 &&
        icons.map((icon, index) => (
          <Tooltip
            key={icon.tooltip}
            title={t(icon.tooltip)}
            placement='left'
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
              onClick={() => handleScroll(index)}
              sx={{
                borderRadius: '0',
                backgroundColor:
                  activeScroll === icon.tooltip ? '#D7ECFD' : 'transparent',
                ':hover': {
                  backgroundColor:
                    activeScroll === icon.tooltip ? '#D7ECFD' : '#f5f6f8',
                },
              }}
            >
              {activeScroll === icon.tooltip ? (
                <img
                  src={icon.iconName}
                  alt=''
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(55%) sepia(48%) saturate(2094%) hue-rotate(188deg) brightness(100%) contrast(96%)',
                  }}
                />
              ) : (
                <img src={icon.iconName} alt='' />
              )}
            </IconButton>
          </Tooltip>
        ))}
    </ButtonGroup>
  );
};
export default VerticalScrollTab;
