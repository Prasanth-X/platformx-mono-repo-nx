import { Box, IconButton } from '@mui/material';
import Eye from '../../../assets/svg/Eye.svg';
import { useTranslation } from 'react-i18next';
import CopyIcon from '../../../assets/svg/CopyIcon.svg';
import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';

type CommunityOptionProps = {
  dataList: any;
};

const CommunityOption = (_props: CommunityOptionProps) => {
  const { dataList = {} } = _props;

  const { t } = useTranslation();

  /**
   * open url with new page
   * @param pageUrl string
   */
  const redirectToUrl = (pageUrl) => {
    if (pageUrl) {
      window.open(pageUrl, '_blank', 'noopener,noreferrer');
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  /**
   * copy url
   * @param pageUrl string
   */
  const copyUrl = (pageUrl) => {
    if (pageUrl) {
      navigator.clipboard.writeText(pageUrl);
      showToastSuccess(t('url_copy_toast'));
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  return (
    <>
      <Box
        color='#89909A'
        className='d-inline-flex align-items-center justify-content-end'
        sx={{ minWidth: '104px' }}
      >
        <Box className='d-flex align-items-center'>
          <IconButton
            className='hoverIcon'
            onClick={() => redirectToUrl(dataList?.url)}
          >
            <img src={Eye} style={{ objectFit: 'cover' }} />
          </IconButton>
        </Box>

        <Box className='d-flex align-items-center'>
          <IconButton
            className='hoverIcon'
            onClick={() => copyUrl(dataList?.url)}
          >
            <img src={CopyIcon} style={{ objectFit: 'cover' }} />
          </IconButton>
          <Box
            sx={{
              visibility: 'hidden',
            }}
          >
            <IconButton
              aria-label='settings'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              className='viewallctamob hoverIcon'
            >
              <img src={CopyIcon} style={{ objectFit: 'cover' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CommunityOption;
