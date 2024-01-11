import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import {
  CardOptionApprovalStatusIcon,
  CardOptionDeleteIcon,
  CardOptionDuplicateIcon,
  CardOptionEditIcon,
  CardOptionUnPublishIcon,
  CardOptionViewIcon,
  ErrorTooltip,
  PlateformXDialog,
} from '@platformx/utilities';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkflowStepper } from '@platformx/utilities';
// import usePage from '../../../../hooks/usePage/usePage';
import {
  capitalizeFirstLetter,
  getCurrentLang,
  useAccess,
  useUserSession,
} from '@platformx/utilities';
// import CreatePage from '../../../createPage';
// import Reschedule from '../Reschedule/Reschedule';
import { usePage } from '@platformx/authoring-apis';
import { useStyles } from './CardMenu.styles';

import { PageData } from '@platformx/authoring-state';
import { useSelector } from 'react-redux';
import { CARD_MENUS } from '../../utils/Constants';
import { MenuActions } from './CardMenu.types';
const CardMenu = (props: any) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    anchorEl,
    open,
    listItemDetails,
    handleMenuClose,
    category,
    subCategory,
  } = props;
  const { canAccessAction } = useAccess();
  const {
    editPage,
    viewPage,
    previewPage,
    handleDuplicatePopup,
    duplicatePage,
    unPublishPage,
    handleReschedulePopup,
    reschedulePublishPage,
    rescheduleUnPublishPage,
    handleCancelTriggerPopup,
    cancelPublishUnpublishTrigger,
    handleDeleteData,
    handlePageDelete,
  } = usePage();
  const [language, setLanguage] = React.useState<string[]>([]);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [rescheduleDto, setRescheduledDto] = useState({});
  const [cancelTriggerType, setCancelTriggerType] = useState('');
  const {
    status,
    scheduledPublishTriggerDateTime,
    scheduledUnPublishTriggerDateTime,
    lastPublishedDate,
  } = listItemDetails;
  const [menuActions, setMenuActions] = useState({
    duplicate: false,
    delete: false,
    publish: false,
    reschedulepublish: false,
    rescheduleunpublish: false,
    unpublish: false,
    pageunpublish: false,
    canceltrigger: false,
    approvalStatus: false,
  });

  const { pageInfo } = useSelector((state: PageData) => state);

  const handleDeletePopup = (pageSelected: any) => {
    if (pageSelected.status === 'published') {
      setMenuActions({ ...menuActions, pageunpublish: true });
      handleDeleteData(pageSelected);
    }
    if (
      pageSelected.status === 'draft' &&
      pageSelected.scheduledPublishTriggerDateTime != null
    ) {
      setMenuActions({ ...menuActions, pageunpublish: true });
      handleDeleteData(pageSelected);
    }
    if (
      (pageSelected.status === 'draft' &&
        pageSelected.scheduledPublishTriggerDateTime === null) ||
      pageSelected.status === 'unpublished'
    ) {
      setMenuActions({ ...menuActions, delete: true });
      handleDeleteData(pageSelected);
    }
  };

  const onHandleMenuActions = (action: string) => {
    switch (action) {
      case MenuActions.EDIT:
        editPage(listItemDetails);
        break;
      case MenuActions.VIEW:
        viewPage(listItemDetails);
        break;
      case MenuActions.PREVIEW:
        previewPage(listItemDetails);
        break;
      case MenuActions.DUPLICATE:
        setMenuActions({ ...menuActions, duplicate: true });
        handleDuplicatePopup(true, listItemDetails);
        break;
      case MenuActions.DELETE:
        handleDeletePopup(listItemDetails);
        break;
      case MenuActions.UNPUBLISH:
        setMenuActions({ ...menuActions, unpublish: true });
        break;
      case MenuActions.RESCHEDULE_PUBLISH:
        setMenuActions({ ...menuActions, reschedulepublish: true });
        handleReschedulePopup('Publish', listItemDetails);
        break;
      case MenuActions.RESCHEDULE_UNPUBLISH:
        setMenuActions({ ...menuActions, rescheduleunpublish: true });
        handleReschedulePopup('Unpublish', listItemDetails);
        break;
      case MenuActions.CANCEL_PUBLISH:
        setMenuActions({ ...menuActions, canceltrigger: true });
        handleCancelTriggerPopup(listItemDetails, '1');
        setCancelTriggerType('1');
        break;
      case MenuActions.CANCEL_UNPUBLISH:
        setMenuActions({ ...menuActions, canceltrigger: true });
        handleCancelTriggerPopup(listItemDetails, '2');
        setCancelTriggerType('2');
        break;
      case MenuActions.APPROVAL_STATUS:
        setMenuActions({ ...menuActions, approvalStatus: true });
        break;
    }
    handleMenuClose();
  };

  const handleClose = () => {
    setMenuActions({
      duplicate: false,
      delete: false,
      publish: false,
      reschedulepublish: false,
      rescheduleunpublish: false,
      unpublish: false,
      pageunpublish: false,
      canceltrigger: false,
      approvalStatus: false,
    });
  };

  const confirmDuplicatePage = (pageName: any, pageUrl: any) => {
    duplicatePage(true, pageName, pageUrl, language);
    handleClose();
  };

  const handleUnpublishPage = () => {
    unPublishPage(listItemDetails);
    handleClose();
  };

  const handleReschedulePublish = (publishTime: any) => {
    const requestDto = {
      page: listItemDetails.page,
      currentpageurl: listItemDetails.currentPageUrl,
      parentpageurl: listItemDetails.parentPageUrl,
    };
    reschedulePublishPage(publishTime, requestDto);
    handleClose();
  };

  const handleRescheduleUnPublish = (unpublishTime: any) => {
    const requestDto = {
      page: listItemDetails.page,
      currentpageurl: listItemDetails.currentPageUrl,
      parentpageurl: listItemDetails.parentPageUrl,
    };
    rescheduleUnPublishPage(unpublishTime, requestDto, listItemDetails);
    handleClose();
  };

  const handleCancelTrigger = () => {
    const requestDto = {
      page: listItemDetails.page,
      currentpageurl: listItemDetails.currentPageUrl,
      parentpageurl: listItemDetails.parentPageUrl,
    };
    cancelPublishUnpublishTrigger(
      cancelTriggerType,
      requestDto,
      listItemDetails
    );
    handleClose();
  };

  const handleConfirmDelete = () => {
    handlePageDelete();
    handleClose();
  };

  useEffect(() => {
    localStorage.setItem('lang', getCurrentLang());
  }, []);
  const theme = useTheme();
  const tabView = useMediaQuery(theme.breakpoints.down('em'));
  return (
    <>
      {/* {menuActions.duplicate && (
        <CreatePage
          isDialogOpen={menuActions.duplicate}
          title={
            menuActions.duplicate
              ? t('page_duplicate_title')
              : t('page_create_title')
          }
          pageNameInitial={menuActions.duplicate ? listItemDetails?.title : ''}
          isDuplicate={menuActions.duplicate}
          confirmButtonHandle={confirmDuplicatePage}
          closeButtonHandle={handleClose}
          language={language}
          setLanguage={setLanguage}
        />
      )} */}
      {menuActions.unpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.unpublish}
          title={t('page_unpublish_title')}
          subTitle={t('page_unpublish_subtitle')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleUnpublishPage}
        />
      )}
      {/* {(menuActions.reschedulepublish || menuActions.rescheduleunpublish) && (
        <Reschedule
          isOpen={
            menuActions.reschedulepublish || menuActions.rescheduleunpublish
          }
          rescheduleFlag={
            menuActions.reschedulepublish ? 'Publish' : 'Unpublish'
          }
          schedulePublishDateTime={
            listItemDetails.scheduledPublishTriggerDateTime
          }
          scheduleUnpublishDateTime={
            listItemDetails.scheduledUnPublishTriggerDateTime
          }
          rescheduleDto={rescheduleDto}
          handleConfirmPublishReschedule={handleReschedulePublish}
          handleConfirmUnpublishReschedule={handleRescheduleUnPublish}
          closeButtonHandle={handleClose}
        />
      )} */}
      {menuActions.canceltrigger && (
        <PlateformXDialog
          isDialogOpen={menuActions.canceltrigger}
          title={t('cancel_schedule')}
          subTitle={t('cancel_schedule_message')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleCancelTrigger}
        />
      )}
      {menuActions.delete && (
        <PlateformXDialog
          isDialogOpen={menuActions.delete}
          title={t('page_delete_title')}
          subTitle={t('page_delete_subtitle')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleConfirmDelete}
        />
      )}
      {menuActions.pageunpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.pageunpublish}
          title={t('page_delete_title')}
          subTitle={t('page_delete_subtitle')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={handleClose}
          confirmButtonHandle={handleConfirmDelete}
        />
      )}
      {menuActions.approvalStatus && (
        <WorkflowStepper
          open={menuActions.approvalStatus}
          setOpen={handleClose}
          path={listItemDetails?.currentPageUrl}
          contentType={capitalizeFirstLetter(
            listItemDetails?.tagName?.toLowerCase()
          )}
        />
      )}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
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
              verticalAlign: 'middle',
            },
            paddingLeft: '18px',
            fontSize: '16px',
            textTransform: 'capitalize',
          },
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            onHandleMenuActions(status === 'published' ? 'view' : 'preview');
          }}
        >
          {status === 'published' ? (
            <>
              {/* <CardOptionViewIcon
                className={classes.icon}
              /> */}
              <img
                src={CardOptionViewIcon}
                alt=""
                style={{ width: '16px', marginRight: '10px' }}
              />

              {t('view')}
            </>
          ) : (
            <>
              {/* <CardOptionViewIcon
                className={classes.icon}
              /> */}
              <img
                src={CardOptionViewIcon}
                alt=""
                style={{ width: '16px', marginRight: '10px' }}
              />

              {t('preview')}
            </>
          )}
        </MenuItem>
        {status === 'draft' && lastPublishedDate != '' ? (
          <MenuItem
            disableRipple
            onClick={() => {
              onHandleMenuActions('view');
            }}
          >
            {/* <CardOptionViewIcon
              className={classes.icon}
            /> */}
            <img
              src={CardOptionViewIcon}
              alt=""
              style={{ width: '16px', marginRight: '10px' }}
            />

            {t('view')}
          </MenuItem>
        ) : null}
        {(scheduledPublishTriggerDateTime === null ||
          scheduledPublishTriggerDateTime === undefined) &&
          (scheduledUnPublishTriggerDateTime === null ||
            scheduledUnPublishTriggerDateTime === undefined)
          ? tabView && (
            <ErrorTooltip
              component={
                <MenuItem
                  disableRipple
                  disabled={!canAccessAction(category, subCategory, 'Update')}
                  onClick={() => {
                    onHandleMenuActions('edit');
                  }}
                >
                  {/* <CardOptionEditIcon
                    className={classes.icon}
                  /> */}
                  <img
                    src={CardOptionEditIcon}
                    alt=""
                    style={{ width: '16px', marginRight: '10px' }}
                  />

                  {t(CARD_MENUS.EDIT.displayName)}
                </MenuItem>
              }
              doAccess={!canAccessAction(category, subCategory, 'Update')}
            />
          )
          : null}
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={!canAccessAction(category, subCategory, 'duplicate')}
              onClick={() => {
                onHandleMenuActions('duplicate');
              }}
            >
              {/* <CardOptionDuplicateIcon
                className={classes.icon}
              /> */}
              <img
                src={CardOptionDuplicateIcon}
                alt=""
                style={{ width: '16px', marginRight: '10px' }}
              />
              {t(CARD_MENUS.DUPLICATE.displayName)}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'duplicate')}
        />
        {tabView && (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'delete')}
                onClick={() => {
                  onHandleMenuActions('delete');
                }}
              >
                {/* <CardOptionDeleteIcon
                  className={classes.icon}
                /> */}
                <img
                  src={CardOptionDeleteIcon}
                  alt=""
                  style={{ width: '16px', marginRight: '10px' }}
                />
                {t(CARD_MENUS.DELETE.displayName)}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'delete')}
          />
        )}
        {status === 'published' &&
          scheduledUnPublishTriggerDateTime === null ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'unpublish')}
                onClick={() => {
                  onHandleMenuActions('unpublish');
                }}
              >
                {/* <CardOptionUnPublishIcon
                  className={classes.icon}
                /> */}
                <img
                  src={CardOptionUnPublishIcon}
                  alt=""
                  style={{ width: '16px', marginRight: '10px' }}
                />
                {t(CARD_MENUS.UNPUBLISH.displayName)}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'unpublish')}
          />
        ) : null}
        {scheduledPublishTriggerDateTime != null ||
          scheduledPublishTriggerDateTime != undefined ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(category, subCategory, 'reschedule_publish')
                }
                onClick={() => {
                  onHandleMenuActions('reschedule_publish');
                }}
              >
                <ScheduleSendIcon />
                {t('reschedule_publish')}
              </MenuItem>
            }
            doAccess={
              !canAccessAction(category, subCategory, 'reschedule_publish')
            }
          />
        ) : null}
        {scheduledPublishTriggerDateTime != null ||
          scheduledPublishTriggerDateTime != undefined ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(category, subCategory, 'cancel_publish')
                }
                onClick={() => {
                  onHandleMenuActions('cancel_publish');
                }}
              >
                <CancelScheduleSendIcon />
                {t('cancel_publish')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'cancel_publish')}
          />
        ) : null}
        {scheduledUnPublishTriggerDateTime != null ||
          scheduledUnPublishTriggerDateTime != undefined ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(
                    category,
                    subCategory,
                    'reschedule_unpublish'
                  )
                }
                onClick={() => {
                  onHandleMenuActions('reschedule_unpublish');
                }}
              >
                <ScheduleSendIcon />
                {t('reschedule_unpublish')}
              </MenuItem>
            }
            doAccess={
              !canAccessAction(category, subCategory, 'reschedule_unpublish')
            }
          />
        ) : null}
        {scheduledUnPublishTriggerDateTime != null ||
          scheduledUnPublishTriggerDateTime != undefined ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(category, subCategory, 'cancel_unpublish')
                }
                onClick={() => {
                  onHandleMenuActions('cancel_unpublish');
                }}
              >
                <CancelScheduleSendIcon />
                {t('cancel_unpublish')}
              </MenuItem>
            }
            doAccess={
              !canAccessAction(category, subCategory, 'cancel_unpublish')
            }
          />
        ) : null}
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('approval_status');
          }}
        >
          {/* <CardOptionApprovalStatusIcon
            className={classes.icon}
          /> */}
          <img
            src={CardOptionApprovalStatusIcon}
            alt=""
            style={{ width: '16px', marginRight: '10px' }}
          />
          {t('approval_status')}
        </MenuItem>
        {/*SchduledUnPublishTriggerDateTime <MenuItem onClick={handleClose}>Archive</MenuItem> */}
      </Menu>
    </>
  );
};

export default memo(CardMenu);
