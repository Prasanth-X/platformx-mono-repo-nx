import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../theme/variable';
import { PageStatusList } from '../PageList/Page.types';

export default function PageStatus({
  pageType,
  colorType,
  gridView,
}: PageStatusList) {
  const { t } = useTranslation();
  let iconName;
  let iconLabel;
  if (pageType == 'Scheduled Publish') {
    colorType = ThemeConstants.SCEDULED_PUBLISHED_COLOR;
    iconName = (
      <ScheduleSendIcon
        sx={{
          height: '16px',
        }}
      />
    );
    iconLabel = t('scheduled_publish');
  } else if (pageType == 'Scheduled Unpublish') {
    colorType = ThemeConstants.SCEDULED_UNPUBLISHED_COLOR;
    iconName = (
      <CancelScheduleSendIcon
        sx={{
          height: '16px',
        }}
      />
    );
    iconLabel = t('scheduled_unpublish');
  } else if (pageType == 'draft') {
    colorType = ThemeConstants.DRAFT_COLOR;
    iconName = (
      <SaveAsIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0 5px' : '0',
        }}
      />
    );
    iconLabel = t('draft');
  } else if (pageType == 'published') {
    colorType = ThemeConstants.PUBLISHED_COLOR;
    iconName = (
      <TelegramIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0' : '0',
        }}
      />
    );
    iconLabel = t('published');
  } else if (pageType == 'approved') {
    colorType = ThemeConstants.APPROVED_COLOR;
    iconName = (
      <CheckCircleIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0 5px' : '0',
        }}
      />
    );
    iconLabel = t('approved');
  } else if (pageType == 'unpublished') {
    colorType = ThemeConstants.UNPUBLISHED_COLOR;
    iconName = (
      <UnpublishedIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0 5px' : '0',
        }}
      />
    );
    iconLabel = t('unpublished');
  } else if (pageType == 'pending') {
    colorType = ThemeConstants.PENDING_COLOR;
    iconName = (
      <PendingRoundedIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0 5px' : '0',
        }}
      />
    );
    iconLabel = t('pending');
  } else {
    colorType = ThemeConstants.PUBLISHED_COLOR;
    iconName = (
      <TelegramIcon
        sx={{
          height: '16px',
          width: 'auto',
          marginRight: gridView ? '0' : '4px',
          padding: gridView ? '0' : '0',
        }}
      />
    );
  }
  const additionalStyle = () => {
    if (gridView) {
      return { width: '35px', height: '30px' };
    }
    return {};
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colorType,
          border: gridView ? '' : `1px solid ${colorType}`,
          borderRadius: gridView ? '0 0 4px 4px' : '15px',
          padding: '0 10px',
          transition: 'all 0.3s',
          textTransform: 'capitalize',
          backgroundColor: '#fff',
          ...additionalStyle(),
        }}
        // ml={1}
      >
        {iconName}
        {!gridView && (
          <Typography
            variant='body1'
            sx={{
              fontSize: '12px',
              lineHeight: '1.8',
              display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
            }}
            className='status-text'
          >
            {iconLabel}
          </Typography>
        )}
      </Box>
    </>
  );
}
