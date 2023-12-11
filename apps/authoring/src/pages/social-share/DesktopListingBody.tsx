import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import CommonDesktopDialogBox from '../../Common/CommonDialogBox/CommonDesktopDialogBox';
import IconCancelSvg from '../../assets/svg/cancel.svg';
import IconFaceBookLogoIconSvg from '../../assets/svg/facebookLogoIcon.svg';
import IconLinkedinIconSvg from '../../assets/svg/linkedinIcon.svg';
import IconRescheduleSvg from '../../assets/svg/reschedule.svg';
import IconTwitterLogoIconSvg from '../../assets/svg/twitterLogoIcon.svg';

import PlateformXDialog from '../../components/Modal';
import PlateformXSocialDialog from '../../components/SocialShareModal/socialShareModal';
import {
  capitalizeFirstLetter,
  convertToLowerCase,
  dateFormat,
  nullToObject,
} from '../../utils/helperFunctions';
import {
  isSchedule,
  scheduleDateTimeIsExpired,
  shareTimeHandle,
} from './helperSocialShare';
import { defaultFalBackImage } from '../../utils/helper';

const arrayData = [
  {
    name: 'Reschedule',
    id: 1,
    icon: <img src={IconRescheduleSvg} alt='Cancel Icon' />,
  },
  {
    name: 'Cancel',
    id: 2,
    icon: <img src={IconCancelSvg} alt='Cancel Icon' />,
  },
];

const DesktopListingBody = (props: any = {}) => {
  const { index = 0, listItem = {} } = nullToObject(props);
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const [openListMenu, setOpenMenu] = useState(false);
  const [openSocialShareModal, setSocialShareModal] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [listData, setListData] = useState();
  const handleListClick = (event: any = {}) => {
    event.stopPropagation();
    setListMenu(event.currentTarget);
    setOpenMenu(true);
  };
  const closeButtonHandle = () => {
    setSocialShareModal(false);
  };
  const onClickingDone = () => {
    setSocialShareModal(false);
    props.reloadAPI();
  };
  const handleListClose = () => {
    setListMenu(null);
    setOpenMenu(false);
  };

  const onSelectFilter = (optionData: any = {}, listDataItem: any = {}) => {
    setListData(listDataItem);
    //Reschedule function
    if (optionData?.id === 1) {
      setSocialShareModal(true);
      setOpenMenu(false);
    }
    //Cancel function start
    if (optionData?.id === 2) {
      setOpenMenu(false);
      setIsCancel(true);
    }
    //Cancel function End
  };

  const platformIcon = (platformInput = '') => {
    switch (convertToLowerCase(platformInput)) {
      case 'facebook':
        return <img src={IconFaceBookLogoIconSvg} alt='Facebook Logo Icon' />;
      case 'linkedin':
        return <img src={IconLinkedinIconSvg} alt='LinkedIn Icon' />;
      case 'twitter':
        return <img src={IconTwitterLogoIconSvg} alt='Twitter Logo Icon' />;
      default:
        return <img src={IconTwitterLogoIconSvg} alt='Twitter Logo Icon' />;
    }
  };

  const overFlowHandle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-all',
  };
  const cancelPopup = {
    unpublishTitle: 'Cancel Social Share',
    unpublishDescription: 'Are you sure you want to cancel the social share?',
    unpublishCloseText: 'No',
    unpublishConfirmText: 'Yes',
  };
  const unpublishCloseButtonHandle = () => {
    setIsCancel(false);
  };
  const unpublishConfirmButtonHandle = () => {
    props.handelCancelPost(listData);
    setIsCancel(false);
  };
  const defaultSocialImage = defaultFalBackImage();
  const socialShareData = {
    Title: listItem?.item_title,
    Description: listItem?.item_description,
    Page: listItem?.item_path,
    PageSettings: {
      SocialOgTitle: listItem?.item_title,
      SocialOgImage: listItem?.item_Thumbnail
        ? listItem?.item_Thumbnail
        : listItem?.item_Banner
        ? listItem?.item_Banner
        : listItem?.item_backgroud_content?.Thumbnail
        ? listItem?.item_backgroud_content?.Thumbnail
        : defaultSocialImage,
      SocialOgDescription: listItem?.item_description,
    },
    Caption: listItem?.post_title,
    ShareType: listItem?.share_type,
    ScheduleDate: listItem?.SchduledPublishTriggerDateTime,
    NetworkType: listItem?.social_share_platform,
    postURL: listItem?.post_link,
    contentType: listItem?.item_type,
    reSchedulePostUrl: listItem?.current_page_url,
    Thumbnail: listItem?.item_Thumbnail
      ? listItem?.item_Thumbnail
      : listItem?.item_Banner
      ? listItem?.item_Banner
      : listItem?.item_backgroud_content?.Thumbnail
      ? listItem?.item_backgroud_content?.Thumbnail
      : defaultSocialImage,
  };
  const socialShareArticleData = {
    Title: listItem?.item_title,
    Description: listItem?.item_description,
    Page: listItem?.item_path,
    ArticleSettings: {
      SocialOgTitle: listItem?.item_title,
      SocialOgImage: listItem?.item_Banner
        ? listItem?.item_Banner
        : defaultSocialImage,
      SocialOgDescription: listItem?.item_description,
    },
    Caption: listItem?.post_title,
    ShareType: listItem?.share_type,
    ScheduleDate: listItem?.SchduledPublishTriggerDateTime,
    NetworkType: listItem?.social_share_platform,
    postURL: listItem?.post_link,
    contentType: listItem?.item_type,
    reSchedulePostUrl: listItem?.current_page_url,
    Banner: listItem?.item_Banner ? listItem?.item_Banner : defaultSocialImage,
  };
  const cursorPoint = !scheduleDateTimeIsExpired(shareTimeHandle(listItem))
    ? 'no-drop'
    : isSchedule(listItem)
    ? 'pointer'
    : 'no-drop';
  const opacityColorDisable = !scheduleDateTimeIsExpired(
    shareTimeHandle(listItem)
  )
    ? 0.5
    : isSchedule(listItem)
    ? 1
    : 0.5;
  return (
    <Box key={convertToLowerCase(`${index}DesktopListing`)}>
      <Grid
        container
        sx={{
          background: '#ffffff',
          height: '60px',
          alignItems: 'center',
          padding: '0 15px',
          marginBottom: '10px',
          borderRadius: '3px',
        }}
      >
        <Grid item xs={2.4} sx={{ marginRight: '5%' }}>
          <Typography
            variant='h6medium'
            sx={{
              ...overFlowHandle,
            }}
          >
            {listItem?.item_title}
          </Typography>
        </Grid>

        <Grid item xs={1} sx={{ marginRight: '3.5%' }}>
          <Typography
            variant='h6medium'
            sx={{
              color: '#89909a',
              ...overFlowHandle,
            }}
          >
            {capitalizeFirstLetter(listItem?.item_type)}
          </Typography>
        </Grid>

        <Grid item xs={2} sx={{ paddingLeft: '10px', marginRight: '1%' }}>
          <Typography
            sx={{
              color: '#89909a',
              ...overFlowHandle,
            }}
            variant='h6medium'
          >
            {listItem?.shared_by}
          </Typography>
        </Grid>

        <Box
          sx={{
            marginTop: '7px',
            marginRight: '5px',
            visibility: !scheduleDateTimeIsExpired(shareTimeHandle(listItem))
              ? 'hidden'
              : isSchedule(listItem)
              ? 'visible'
              : 'hidden',
            // color"#D9D9D9"
          }}
        >
          <AccessTimeIcon style={{ color: '#2d2d39', fontSize: 18 }} />
        </Box>

        <Grid
          item
          xs={2.5}
          sx={{
            display: 'flex',
            marginRight: '2.4%',
          }}
        >
          <Typography
            variant='h6medium'
            sx={{
              opacity: opacityColorDisable,
              color: '#2d2d39',
            }}
          >
            {dateFormat(shareTimeHandle(listItem))}
          </Typography>
        </Grid>

        <Grid
          item
          xs={1.3}
          sx={{
            marginRight: '3.7%',
            paddingBottom: 0,
            paddingLeft: '1.875rem',
          }}
        >
          <Box
            sx={{
              paddingLeft: '1.375rem',
            }}
            display='flex'
            justifyContent='flex-start'
          >
            {React.cloneElement(platformIcon(listItem?.social_share_platform))}
          </Box>
        </Grid>

        <Grid
          item
          xs={0.5}
          sx={{
            cursor: 'default',
          }}
        >
          <Box
            onClick={
              !scheduleDateTimeIsExpired(shareTimeHandle(listItem))
                ? () => {
                    console.log('clicked');
                  }
                : isSchedule(listItem)
                ? (event) => handleListClick(event)
                : () => {
                    console.log('clicked');
                  }
            }
            id={convertToLowerCase(index)}
            sx={{
              margin: '10px',
              opacity: opacityColorDisable,
            }}
          >
            <IconButton
              aria-label='settings'
              id='long-button'
              aria-haspopup='true'
              sx={{
                cursor: cursorPoint,
              }}
            >
              <MoreHorizIcon
                sx={{
                  cursor: cursorPoint,
                  verticalAlign: 'middle',
                }}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <CommonDesktopDialogBox
        listMenu={listMenu}
        listItem={listItem}
        arrayData={arrayData}
        openListMenu={openListMenu}
        onSelectFilter={onSelectFilter}
        handleListClose={handleListClose}
      />

      {openSocialShareModal ? (
        <PlateformXSocialDialog
          isDialogOpen={openSocialShareModal}
          closeButtonHandle={closeButtonHandle}
          onClickingDone={onClickingDone}
          setSelectedItem={
            listItem?.item_type == 'article'
              ? socialShareArticleData
              : socialShareData
          }
          contentType='video'
        />
      ) : null}
      {isCancel ? (
        <PlateformXDialog
          isDialogOpen={isCancel}
          title={cancelPopup?.unpublishTitle}
          subTitle={cancelPopup?.unpublishDescription}
          closeButtonText={cancelPopup?.unpublishCloseText}
          confirmButtonText={cancelPopup?.unpublishConfirmText}
          closeButtonHandle={unpublishCloseButtonHandle}
          confirmButtonHandle={unpublishConfirmButtonHandle}
        />
      ) : null}
    </Box>
  );
};

export default React.memo(DesktopListingBody);
