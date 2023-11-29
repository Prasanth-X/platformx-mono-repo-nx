import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteMenuIcon from '@mui/icons-material/Delete';
import EditMenuIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '../../../assets/images/icons/deleteIcon.svg';
import EditIcon from '../../../assets/images/icons/editIcon.svg';
import {
  iconsList,
  statusIcons,
} from '../../../Common/Listing/Utils/Constants';
import MoreHorizIcon from '../../../assets/images/icons/moreHoriz.svg';
import { RegistrationConstants } from '../../../components/Space/SpaceAccess/Constants';
import PlateformXDialogDelete from '../../../pages/articles/deletePopup';
import { MenuActions } from './MenuActions.types';
import InviteUserPopup from '../../QuizPollEvents/Components/InviteUserPopup';
import {
  filterArrayValues,
  formatCancleMembers,
  formatInvitedMenbers,
  formatRemoveMembers,
  getSpaceMembersList,
} from '../SpacesHelper';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';

const SpaceListingCard = ({
  dataList,
  dataType,
  deleteSpace,
  leaveSpace,
  joinSpace,
  inviteMembers: inviteMembersHandler,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [menuActions, setMenuActions] = useState({
    inviteuser: false,
    isLeave: false,
    isDelete: false,
  });
  const [defaultMembers, setDefaultMembers] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);

  const getSpaceMembers = async (id: string) => {
    try {
      const spaceMemberListResponse = await getSpaceMembersList(id);
      setInvitedMembers([...(spaceMemberListResponse?.invite_members || [])]);
      setDefaultMembers([...(spaceMemberListResponse?.members || [])]);
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };
  const onHandleMenuActions = async (action: string) => {
    switch (action) {
      case MenuActions.INVITE_USER:
        await getSpaceMembers(dataList.id);
        setMenuActions((menuActions) => {
          return { ...menuActions, inviteuser: true };
        });
        break;
      case MenuActions.DELETE:
        setMenuActions((menuActions) => {
          return { ...menuActions, isDelete: true };
        });
        break;
      case MenuActions.LEAVE:
        setMenuActions((menuActions) => {
          return { ...menuActions, isLeave: true };
        });
        break;
    }
  };

  const onCloseMenuActions = () => {
    setMenuActions({
      inviteuser: false,
      isDelete: false,
      isLeave: false,
    });
  };

  const deleteConfirmButtonHandle = async () => {
    deleteSpace(dataList.id, dataList.title);
    onCloseMenuActions();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleJoinSpace = () => {
    joinSpace(dataList.id, dataList.title);
  };

  /**
   * edit space
   */
  const handleEdit = () => {
    navigate(`/community/create-space?type=edit&id=${dataList.id}`);
  };

  /**
   * edit space
   */
  const handleViewButton = () => {
    navigate(`/community/create-space?type=view&id=${dataList.id}`);
  };

  const handleInviteMembers = (values) => {
    const removeMembers = formatRemoveMembers(
      filterArrayValues(defaultMembers, values),
      dataList?.pretty_name
    );
    const cancleMembers = formatCancleMembers(
      filterArrayValues(invitedMembers, values),
      dataList?.title
    );
    const inviteMembers = formatInvitedMenbers(
      filterArrayValues(values, [...defaultMembers, ...invitedMembers])
    );
    inviteMembersHandler(
      dataList.id,
      removeMembers,
      inviteMembers,
      cancleMembers
    );
    onCloseMenuActions();
  };

  return (
    <>
      {menuActions.inviteuser && (
        <InviteUserPopup
          titledata={t('invite_members')}
          isDialogOpen={menuActions.inviteuser}
          closeButtonHandle={onCloseMenuActions}
          doneButtonHandle={handleInviteMembers}
          contentType='Spaces'
          language=''
          setLanguage=''
          defaultValues={[...defaultMembers, ...invitedMembers]}
          limitTags={2}
          getOptionLabel={(option: any) => option?.user_name}
          optionFormat='user_name'
        />
      )}
      {menuActions.isDelete && (
        <PlateformXDialogDelete
          isDialogOpen={menuActions.isDelete}
          title={t('delete_title')}
          subTitle={`${t('delete_confirm')} ${t('space')}? ${t(
            'process_undone'
          )}`}
          closeButtonText={t('no_keep_it')}
          confirmButtonText={t('yes_delete_it')}
          closeButtonHandle={onCloseMenuActions}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      )}
      {menuActions.isLeave && (
        <PlateformXDialogDelete
          isDialogOpen={menuActions.isLeave}
          title={t('delete_title')}
          subTitle={`${t('leave_confirm')} ${t('space')}?`}
          closeButtonText={t("no_don't_leave")}
          confirmButtonText={t('leave')}
          closeButtonHandle={onCloseMenuActions}
          confirmButtonHandle={() => leaveSpace(dataList.id, dataList.title)}
        />
      )}
      <Box className='listbox'>
        <Grid container className='d-flex align-items-center'>
          <Grid item xs={11} md={11} em={5} lg={7} xl={8} pr='20px'>
            <Box
              //  sx={{ display: 'flex', justifyContent: 'space-between' }}
              className='d-flex align-items-center'
              onClick={handleViewButton}
            >
              <Box className='img'>
                <img src={iconsList['Space']} />
              </Box>
              <Box>
                <Grid container>
                  <Grid
                    item
                    className='d-flex align-items-center'
                    sx={{
                      height: '24px',
                    }}
                  >
                    <Tooltip title={dataList.title} placement='right-end'>
                      <Typography
                        variant='h5bold'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical',
                          wordBreak: 'break-all',
                        }}
                      >
                        {dataList.title}
                      </Typography>
                    </Tooltip>
                    <Box component='div' className='mobstatusIcon'>
                      <Typography sx={{ marginLeft: '10px' }}>
                        <img
                          src={
                            dataList.visibility === 'hidden'
                              ? statusIcons['public']
                              : statusIcons['private']
                          }
                        />
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    flexWrap: { xs: 'wrap', em: 'inherit' },
                    display: { xs: 'none', em: 'flex' },
                  }}
                >
                  <Typography
                    variant='h7regular'
                    sx={{
                      color: '#89909a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-all',
                      order: { xs: 2, em: 1 },
                    }}
                  >
                    {dataList.description}
                  </Typography>
                </Box>
                <Box className='datetimemob'>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedBy}
                  </Typography>
                  <Typography variant='h7regular' component='div'>
                    {dataList.created_date &&
                      format(
                        new Date(+dataList.created_date),
                        'MMM d, yyyy | hh:mm'
                      )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} em={7} lg={5} xl={4}>
            <Box className='d-flex align-items-center justify-content-end'>
              <Box className='statusweb' onClick={() => handleViewButton()}>
                <Tooltip
                  placement='top-start'
                  title={t(`${dataList.visibility}`)}
                >
                  <Typography sx={{ display: 'flex' }}>
                    <img
                      style={{ width: '37px', height: '37px', borderRadius: '5px' }}
                      src={
                        dataList.visibility === 'hidden'
                          ? statusIcons['public']
                          : statusIcons['private']
                      }
                    />
                  </Typography>
                </Tooltip>
              </Box>
              <Box
                className='datetimeweb'
                sx={{ display: 'flex' }}
                onClick={() => handleViewButton()}
              >
                <Typography variant='h7regular' component='div'>
                  {dataList.lastModifiedBy}
                </Typography>
                <Typography variant='h7regular' component='div'>
                  {dataList.created_date &&
                    format(
                      new Date(+dataList.created_date),
                      'MMM d, yyyy | hh:mm'
                    )}
                </Typography>
              </Box>
              <Box
                color='#89909A'
                className='d-inline-flex align-items-center justify-content-end'
                sx={{ minWidth: '104px' }}
              >
                {/* edit icon */}
                <Box className='d-flex align-items-center'>
                  <MenuItem
                    className='icons'
                    disableRipple
                    onClick={handleEdit}
                    disabled={false}
                  >
                    <IconButton className="hoverIcon">
                      <img src={EditIcon} style={{ objectFit: 'cover' }} />
                    </IconButton>
                  </MenuItem>
                </Box>

                {/* delete icon */}
                <Box className='d-flex align-items-center'>
                  {dataType === 'Space' && (
                    <MenuItem
                      className='icons'
                      disableRipple
                      onClick={() => onHandleMenuActions('delete')}
                      disabled={false}
                    >
                      <IconButton className="hoverIcon">
                        <img src={DeleteIcon} style={{ objectFit: 'cover' }} />
                      </IconButton>
                    </MenuItem>
                  )}

                  {/*menu icon */}
                  <IconButton
                    aria-label='settings'
                    id='long-button'
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup='true'
                    onClick={handleClick}
                    className='viewallctamob'
                  >
                    <img src={MoreHorizIcon} style={{ objectFit: 'cover' }} />
                  </IconButton>
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
                        handleViewButton();
                      }}
                    >
                      <VisibilityIcon /> {t('view')}
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      onClick={() => {
                        handleClose();
                        onHandleMenuActions('delete');
                      }}
                    >
                      <DeleteMenuIcon /> {t('delete')}
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleEdit}>
                      <EditMenuIcon /> {t('edit')}
                    </MenuItem>
                    {dataList?.is_member && (
                      <MenuItem
                        disableRipple
                        onClick={() => {
                          handleClose();
                          onHandleMenuActions('leave');
                        }}
                      >
                        <RemoveIcon /> {t('leave')}
                      </MenuItem>
                    )}
                    {dataList?.subscription === RegistrationConstants[0] &&
                      !dataList?.is_member && (
                        <MenuItem
                          disableRipple
                          onClick={() => {
                            handleClose();
                            handleJoinSpace();
                          }}
                        >
                          <AddIcon /> {t('join')}
                        </MenuItem>
                      )}
                    {/* <MenuItem
                      disableRipple
                      onClick={() => {
                        handleClose();
                        onHandleMenuActions('inviteuser');
                      }}
                    >
                      <GroupIcon /> {t('invite_members')}
                    </MenuItem> */}
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SpaceListingCard;
