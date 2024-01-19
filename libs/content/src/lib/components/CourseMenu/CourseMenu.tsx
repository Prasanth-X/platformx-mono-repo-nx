import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GroupIcon from '@mui/icons-material/Group';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
  ShowToastError,
  ShowToastSuccess,
  useAccess,
} from '@platformx/utilities';
import { userManagementAPI } from '@platformx/authoring-apis';

import { CourseReportDialog } from '../CourseReportDialog/CourseReportDialog';
import InviteUserPopup from '../InviteUserPopup/InviteUserPopup';
import { getEmbedTempData } from '../../utils/Helper';
import { MenuActions } from './CardMenu.types';

export const CourseMenu = ({
  anchorEl,
  open,
  handleClose,
  contentType,
  listItemDetails,
  category,
  subCategory,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  fetchContentDetails,
}: any) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { canAccessAction } = useAccess();
  const [menuActions, setMenuActions] = useState({
    inviteuser: false,
    courseReport: false,
  });
  const [selectedContent, setSelectedContent] = useState<any>(listItemDetails);
  const [language, setLanguage] = useState<string[]>([]);
  const [embedData, setEmbedData] = useState({});

  useEffect(() => {
    setSelectedContent(listItemDetails);
  }, [listItemDetails]);

  const getDuplicateTitle = () => {
    const newVal = `${t('copy_of')} ${selectedContent?.title}`.trim();
    const duplicateContentTitle =
      newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateContentTitle.trim();
  };

  const deleteConfirmButtonHandle = () => {
    deleteContent(selectedContent);
    onClose();
  };

  const unPublishConfirmButtonHandle = () => {
    unPublish(selectedContent);
    onClose();
  };
  const handlePublishedPageView = () => {
    preview(listItemDetails);
  };
  const onClose = () => {
    setMenuActions({
      inviteuser: false,
      courseReport: false,
    });
  };
  console.log('details', selectedContent);
  const onHandleMenuActions = (action: any) => {
    switch (action) {
      case MenuActions.INVITE_USER:
        setMenuActions({ ...menuActions, inviteuser: true });
        break;
      case MenuActions.COURSE_REPORT:
        setMenuActions({ ...menuActions, courseReport: true });
        break;
    }
  };
  const getSelectedCardDetails = async () => {
    const cardDetails = await fetchContentDetails(listItemDetails);
    await setEmbedData(getEmbedTempData(cardDetails));
  };

  const inviteUsers = async (users: any) => {
    const {
      description,
      teaser_image,
      title,
      current_page_url,
      course_id,
      author,
    } = selectedContent;
    const userData = users.map((val: any) => {
      return {
        user_id: val.user_id,
        email: val.email,
      };
    });
    const requestToSend = {
      course_id,
      title,
      course_url: current_page_url,
      invite_users: userData,
    };
    return userManagementAPI.inviteEndUsers({
      input: requestToSend,
    });
  };
  const handleInviteUser = async (users: any) => {
    try {
      const detailsRes: any = await inviteUsers(users);
      if (
        detailsRes.authoring_inviteUsers.message === 'Successfully invited!!!'
      ) {
        onClose();
        ShowToastSuccess(detailsRes.authoring_inviteUsers.message);
      } else {
        ShowToastError(detailsRes.authoring_inviteUsers.message);
      }
    } catch (err: any) {
      console.log('err', err);
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
    }
  };
  return (
    <React.Fragment>
      {menuActions.inviteuser && (
        <InviteUserPopup
          titledata={t('invite_user')}
          isDialogOpen={menuActions.inviteuser}
          closeButtonHandle={onClose}
          doneButtonHandle={handleInviteUser}
          contentType={t(contentType?.toLowerCase())}
          language={language}
          setLanguage={setLanguage}
          getOptionLabel={(option: any) => option?.username}
          optionFormat="username"
        />
      )}

      {menuActions.courseReport && (
        <CourseReportDialog
          isDialogOpen={menuActions.courseReport}
          handleClose={onClose}
          courseTitle={listItemDetails?.title}
        />
      )}

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
            marginTop: '5px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '18px',
            fontSize: '16px',
            zIndex: 999,
          },
          textTransform: 'capitalize',
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('inviteuser');
          }}
        >
          <GroupIcon /> {t('invite_user')}
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('courseReport');
          }}
        >
          <DescriptionOutlinedIcon /> {t('course report')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
