import { useMutation } from '@apollo/client'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import {
  BlueDot,
  EditIcon,
  GreenDot,
  Loader,
  RedDot,
  WarningIcon,
  warning,
} from '@platformx/utilities'
import { format } from 'date-fns'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  DialogBoxContentProps,
  UserManagementQueries,
} from '@platformx/authoring-apis'
import {
  BasicSwitch,
  ShowToastError,
  ShowToastSuccess,
  ThemeConstants,
  getSelectedSite,
} from '@platformx/utilities'
import { ListViewProps } from '../UserManagement.Types'
import AcceptRejectButton from './AcceptRejectButton'
import MoreDialog from './MoreDialog'
import {
  ADMIN_ACTIONS,
  ADMIN_ACTIONS_BUTTON,
  USERTYPES,
} from './Utils/constant'
const ListView = ({
  first_name,
  last_name,
  image,
  email,
  user_id,
  enabled,
  timezone,
  action_pending,
  created_timestamp,
  handleReload,
  roles,
  filterValue,
  adminAction = '',
}: ListViewProps) => {
  const [userMutate] = useMutation(
    UserManagementQueries.ACTIVATE_DEACTIVATE_USERS,
  )
  const [reSendEmailMutate] = useMutation(
    UserManagementQueries.RESEND_EMAIL_TO_USERS,
  )
  const [approveRejectUser] = useMutation(
    UserManagementQueries.APPROVE_REJECT_USER,
  )
  const rolename =
    roles?.find((obj) => obj?.site === getSelectedSite())?.name || ''
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const open = Boolean(anchorEl)
  // const dialog = useDialog();
  const [checked, setChecked] = useState(enabled)
  const [isDelete, setIsDelete] = useState(false)
  // const role: string = localStorage.getItem('role');
  const DateTime = format(
    new Date(created_timestamp || 0),
    'LLL dd, yyyy | H:mm',
  )
  const isPendingWithAdmin = adminAction === ADMIN_ACTIONS.PENDING
  const isRejectedUser = adminAction === ADMIN_ACTIONS.REJECTED
  const userStatus =
    adminAction === ADMIN_ACTIONS.PENDING
      ? 'Pending approval'
      : adminAction === ADMIN_ACTIONS.REJECTED
        ? 'Rejected'
        : adminAction === ADMIN_ACTIONS.APPROVED
          ? 'Approved'
          : ''
  const handleDialogClose = () => {
    setOpenDialog(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const confirmDelete = () => {
    setIsDelete(true)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    setChecked(!checked)
    try {
      const response = await userMutate({
        variables: {
          input: { id: user_id, enabled: !enabled },
        },
        onCompleted: (res) => {
          handleReload()
        },
      })
      setIsLoading(false)
      {
        checked
          ? ShowToastSuccess(t('deactivate_message'))
          : ShowToastSuccess(t('activate_message'))
      }
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast'),
      )
      setIsLoading(false)
    }
  }

  const handleconfirmResend = async () => {
    setIsLoading(true)

    try {
      const responseEmail = await reSendEmailMutate({
        variables: {
          input: { user_id: user_id },
        },
      })
      setIsLoading(false)
      ShowToastSuccess(responseEmail.data.authoring_reinviteUser.message)
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast'),
      )
      setIsLoading(false)
    }
  }

  const handleChange = (checked: boolean) => {
    const dialogContent: DialogBoxContentProps = {
      Image: checked ? warning : WarningIcon,
      Title: checked ? t('deactivate_title') : t('activate_title'),
      Subtitle: checked
        ? `${t('deactivate_subtitle_pre')}
    #${first_name} ${' '}${last_name} ?.#${t('deactivate_subtitle_post')}`
        : `${t('activate_subtitle_pre')}
    #${first_name} ${' '} ${last_name} ?.# ${t('activate_subtitle_post')} `,
      LeftButtonText: t('text_left_button'),
      RightButtonText: checked
        ? t('text_deactivate_right_button')
        : t('text_activate_right_button'),
      SubTitle2: checked ? t('deactivate_subtitle2') : t('activate_subtitle2'),
    }

    // dialog.show(dialogContent, handleConfirm, handleDialogClose);
  }

  const handleApproveReject = async (actionType: string) => {
    setIsLoading(true)
    try {
      const approveRejectUserResponse = await approveRejectUser({
        variables: {
          input: { users: [user_id], status: actionType },
        },
      })
      setIsLoading(false)
      ShowToastSuccess(
        approveRejectUserResponse?.data?.authoring_approveRejectEndUser
          ?.message,
      )
      handleReload()
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast'),
      )
      setIsLoading(false)
    }
  }

  const handleReSendMail = () => {
    const dialogContent: DialogBoxContentProps = {
      Image: WarningIcon,
      Title: t('resend_invite'),
      Subtitle: `${t('resend_subtitle_pre')}
   #${email}# ${'  '}${t('')}`,

      LeftButtonText: t('resend_text_left_button'),
      RightButtonText: t('resend_text_right_button'),
      SubTitle2: `${t('resend_subtitle_post')}`,
    }
    // dialog.show(dialogContent, handleconfirmResend, handleDialogClose);
  }

  const navigate = useNavigate()

  const handleEditUser = (event: any, userId: any) => {
    navigate(
      `/user-management/user-create?path=${userId}&usertype=${filterValue.toLowerCase()}`,
    )
  }

  return (
    <>
      {isLoading && <Loader />}
      <Box className="userlistbox listbox">
        <Grid container className="d-flex align-items-center">
          <Grid xs={11} em={8}>
            <Box className="d-flex align-items-center">
              <Box className="img">
                {image ? (
                  <img
                    src={image}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <Avatar src="/broken-image.jpg" variant="rounded" />
                )}
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5semibold">{first_name}</Typography>
                  <Typography variant="h5semibold" sx={{ marginLeft: '5px' }}>
                    {last_name}
                  </Typography>

                  <Box sx={{ marginLeft: '10px' }}>
                    {action_pending ? (
                      <img src={BlueDot} alt="Blue Icon" />
                    ) : checked ? (
                      <img src={GreenDot} alt="GreenDot Icon" />
                    ) : (
                      <img src={RedDot} alt="RedDot Icon" />
                    )}
                  </Box>
                </Box>
                {filterValue === USERTYPES.AUTHORINGUSER ? (
                  // roles.map((role) => {
                  //   return (
                  rolename && (
                    <Typography
                      //key={role._id}
                      variant="h7medium"
                      //className='doticon'
                      sx={{
                        marginLeft: { xs: 0, em: '10px' },
                        minWidth: { xs: '100%', em: 'auto' },
                        paddingLeft: { xs: 0, em: '14px' },
                        display: { xs: 'inline-block', em: 'none' },
                      }}
                    >
                      {rolename}
                    </Typography>
                  )
                ) : //  );
                  //  })
                  filterValue === USERTYPES.COMMUNITYUSER ||
                    filterValue === USERTYPES.ENDUSER ? (
                    <Typography
                      variant="h7medium"
                      //className='doticon'
                      sx={{
                        marginLeft: { xs: 0, em: '10px' },
                        minWidth: { xs: '100%', em: 'auto' },
                        paddingLeft: { xs: 0, em: '14px' },
                        display: { xs: 'inline-block', em: 'none' },
                      }}
                    >
                      {userStatus}
                    </Typography>
                  ) : null}

                <Box
                  className="d-flex"
                  sx={{
                    flexWrap: { xs: 'wrap', em: 'inherit' },
                    alignItems: 'center',
                  }}
                >
                  <Box display="flex">
                    <Typography
                      variant="h7regular"
                      sx={{ order: { xs: 2, em: 1 } }}
                    >
                      {email}
                    </Typography>
                    {action_pending ? (
                      <Typography
                        variant="h7medium"
                        className="doticon"
                        sx={{
                          marginLeft: { xs: 0, em: '10px' },
                          order: { xs: 1, em: 2 },
                          minWidth: { xs: '100%', em: 'auto' },
                          paddingLeft: { xs: 0, em: '14px' },
                          display: { xs: 'none', em: 'inline-block' },
                        }}
                      >
                        Invite Pending
                      </Typography>
                    ) : null}
                    {filterValue === USERTYPES.AUTHORINGUSER ? (
                      // roles.map((role) => {
                      //   return (
                      rolename && (
                        <Typography
                          //  key={role._id}
                          variant="h7medium"
                          className="doticon"
                          sx={{
                            marginLeft: { xs: 0, em: '10px' },
                            order: { xs: 1, em: 2 },
                            minWidth: { xs: '100%', em: 'auto' },
                            paddingLeft: { xs: 0, em: '14px' },
                            display: { xs: 'none', em: 'initial' },
                          }}
                        >
                          {rolename}
                        </Typography>
                      )
                    ) : //   );
                      // })
                      filterValue === USERTYPES.COMMUNITYUSER ||
                        filterValue === USERTYPES.ENDUSER ? (
                        <Typography
                          variant="h7medium"
                          //className='doticon'
                          sx={{
                            marginLeft: { xs: 0, em: '10px' },
                            order: { xs: 1, em: 2 },
                            minWidth: { xs: '100%', em: 'auto' },
                            paddingLeft: { xs: 0, em: '14px' },
                            display: { xs: 'none', em: 'initial' },
                          }}
                        >
                          {userStatus}
                        </Typography>
                      ) : null}
                  </Box>

                  <Typography variant="h7regular" className="doticonmobile">
                    {DateTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={1} em={4}>
            <Box className="d-flex align-items-center justify-content-end">
              <Box className="datetimeweb">
                <Typography variant="h7regular" component="div">
                  {DateTime}
                </Typography>
              </Box>
              <Box color="#89909A" className="d-inline-flex align-items-center">
                <Box
                  className={`d-flex align-items-center ${filterValue === USERTYPES.COMMUNITYUSER ||
                      filterValue === USERTYPES.ENDUSER
                      ? 'user-list-actions'
                      : ''
                    }`}
                >
                  {(filterValue === USERTYPES.COMMUNITYUSER ||
                    filterValue === USERTYPES.ENDUSER) &&
                    isPendingWithAdmin ? (
                    <>
                      <AcceptRejectButton
                        onClick={() =>
                          handleApproveReject(ADMIN_ACTIONS_BUTTON.APPROVED)
                        }
                        variant={ADMIN_ACTIONS_BUTTON.SUCCESS}
                      />
                      <AcceptRejectButton
                        onClick={() =>
                          handleApproveReject(ADMIN_ACTIONS_BUTTON.REJECTED)
                        }
                        variant={ADMIN_ACTIONS_BUTTON.ERROR}
                      />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        className="icons"
                        onClick={(e) =>
                          !isRejectedUser && handleEditUser(e, user_id)
                        }
                        sx={{
                          cursor: isRejectedUser ? 'not-allowed' : 'pointer',
                        }}
                      >
                        <IconButton className="hoverIcon">
                          <img src={EditIcon} alt="Edit Icon" />
                        </IconButton>
                      </MenuItem>

                      {action_pending ? (
                        <MenuItem
                          className="icons"
                          onClick={() => handleReSendMail()}
                          disabled={isRejectedUser}
                        >
                          <IconButton className="hoverIcon">
                            <ForwardToInboxIcon sx={{ marginLeft: '19px' }} />
                          </IconButton>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          className="icons"
                          sx={{
                            cursor: isRejectedUser ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <BasicSwitch
                            checked={checked}
                            onChange={() => handleChange(checked)}
                            color={checked ? ThemeConstants.GREEN_COLOR : 'red'}
                            disabled={isRejectedUser}
                          />
                        </MenuItem>
                      )}
                    </>
                  )}
                </Box>
                {(((filterValue === USERTYPES.COMMUNITYUSER ||
                  filterValue === USERTYPES.ENDUSER) &&
                  !isPendingWithAdmin) ||
                  filterValue === USERTYPES.AUTHORINGUSER) && (
                    <Box sx={{ display: { xs: 'flex', em: 'none' } }}>
                      <MoreDialog
                        user_id={user_id}
                        first_name={first_name}
                        last_name={last_name}
                        checked={checked}
                        onChange={handleChange}
                        handleDelete={confirmDelete}
                        handleEditUser={handleEditUser}
                        action_pending={action_pending}
                        handleReSendMail={handleReSendMail}
                        disabled={isRejectedUser}
                      />
                    </Box>
                  )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ListView
