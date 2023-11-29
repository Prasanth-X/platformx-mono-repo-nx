import { Box, Typography } from '@mui/material';
import React from 'react';
import CommonMobileDialogBox from '../../Common/CommonDialogBox/CommonMobileDialogBox';
import IconCancelSvg from '../../assets/svg/cancel.svg';
import IconRescheduleSvg from '../../assets/svg/reschedule.svg';
import './SocialShare.css';
import {
  capitalizeFirstLetter,
  dateFormat,
  nullToObject,
} from '../../utils/helperFunctions';
import {
  isSchedule,
  scheduleDateTimeIsExpired,
  shareTimeHandle,
} from './helperSocialShare';

const arrayData = [
  {
    name: 'Reschedule',
    id: 1,
    icon: <IconRescheduleSvg />,
  },
  {
    name: 'Cancel',
    id: 2,
    icon: <IconCancelSvg />,
  },
];

export const MobileListingBody = (props: any = {}) => {
  const { key = 0, listItem = {}, handleUserSelectData } = nullToObject(props);
  return (
    <Box
      key={key}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        padding: '10px 0',
        marginTop: '10px',
      }}
    >
      <Box sx={{ paddingLeft: '14px', width: '85%', cursor: 'pointer' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: {
                xs: '100%',
              },
            }}
          >
            {listItem?.item_title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', color: '#89909a' }}>
          <Typography
            sx={{ fontSize: '12px', textTransform: 'capitalize' }}
            className='listdisc'
          >
            By {capitalizeFirstLetter(listItem.shared_by)}
          </Typography>
          <span style={{ margin: '0 2px', fontSize: '12px' }}>|</span>
          <Typography sx={{ fontSize: '12px', textTransform: 'capitalize' }}>
            {dateFormat(shareTimeHandle(listItem))}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          opacity: !scheduleDateTimeIsExpired(shareTimeHandle(listItem))
            ? 0.5
            : !isSchedule(listItem)
            ? 0.5
            : 1,
          // paddingRight: '16px',
          width: '8%',
          '> div': { display: 'flex', alignItems: 'center', zIndex: 9999 },
        }}
      >
        <CommonMobileDialogBox
          listItem={listItem}
          arrayData={arrayData}
          isOptionEnable={
            !scheduleDateTimeIsExpired(shareTimeHandle(listItem))
              ? true
              : !isSchedule(listItem)
          }
          handleUserSelectData={handleUserSelectData}
        />
      </Box>
    </Box>
  );
};

export default React.memo(MobileListingBody);
