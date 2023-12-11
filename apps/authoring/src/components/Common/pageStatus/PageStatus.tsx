import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { PageStatusProps } from './PageStatus.types';

export default function PageStatus({ pageType, colorType }: PageStatusProps) {
  let iconName;
  if (pageType == 'Scheduled Publish') {
    colorType = ThemeConstants.SCEDULED_PUBLISHED_COLOR;
    iconName = (
      <ScheduleSendIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else if (pageType == 'Scheduled Unpublish') {
    colorType = ThemeConstants.SCEDULED_UNPUBLISHED_COLOR;
    iconName = (
      <CancelScheduleSendIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else if (pageType == 'draft') {
    colorType = ThemeConstants.DRAFT_COLOR;
    iconName = (
      <SaveAsIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else if (pageType == 'published') {
    colorType = ThemeConstants.PUBLISHED_COLOR;
    iconName = (
      <TelegramIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else if (pageType == 'approved') {
    colorType = ThemeConstants.APPROVED_COLOR;
    iconName = (
      <CheckCircleIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else if (pageType == 'unpublished') {
    colorType = ThemeConstants.UNPUBLISHED_COLOR;
    iconName = (
      <UnpublishedIcon
        sx={{
          height: '16px',
        }}
      />
    );
  } else {
    colorType = ThemeConstants.PUBLISHED_COLOR;
    iconName = (
      <TelegramIcon
        sx={{
          height: '16px',
        }}
      />
    );
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colorType,
          border: `1px solid ${colorType}`,
          padding: '4px 8px',
          borderRadius: '12px',
          '&:hover': {
            color: ThemeConstants.WHITE_COLOR,
            backgroundColor: colorType,
            padding: '4px 12px',
            transition: 'all 0.3s',
            '.status-text': {
              display: 'flex',
            },
          },
        }}
        ml={1}
      >
        {iconName}
        <Typography
          variant="body1"
          sx={{ fontSize: '11px', display: 'none' }}
          className="status-text"
        >
          {pageType}
        </Typography>
      </Box>
    </>
  );
}
