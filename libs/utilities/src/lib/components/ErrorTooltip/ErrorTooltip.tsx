import Tooltip from '@mui/material/Tooltip';
import ThemeConstants from '../../themes/authoring/lightTheme/lightThemeVariable';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
interface PropType {
  component: JSX.Element;
  doAccess: boolean;
  position?: any;
  className?: string;
  tooltipMsg?: string;
}

export const ErrorTooltip: FC<PropType> = ({
  component: Component,
  doAccess: doAccess,
  position = 'left',
  className: className,
  tooltipMsg = '',
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      className={className}
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: ThemeConstants.BLACK_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            fontSize: ThemeConstants.FONTSIZE_H6,
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            width: '200px',
            textAlign: 'center',
            padding: '5px 20px',
            border: '0.1px solid rgba(0, 0, 0, 0.1)',
          },
        },
      }}
      title={
        doAccess
          ? tooltipMsg !== ''
            ? tooltipMsg
            : t('error_tooltip_msg')
          : ''
      }
      placement={position}
    >
      <span style={{ cursor: 'pointer' }}>{Component}</span>
    </Tooltip>
  );
};
