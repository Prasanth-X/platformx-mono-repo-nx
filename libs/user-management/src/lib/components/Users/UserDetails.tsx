import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { Box, Button, Grid, Typography } from '@mui/material'
import { PlateformXDialog, PlateformXDialogSuccess } from '@platformx/utilities'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import imageUrl from '../../../assets/images/testimonial.png'
import PermissionsCheckBoxCard from './PermissionsCheckBoxCard'

const UserDetails = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const [openSuccess, setOpenSuccess] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const deleteConfirmButtonHandle = () => {
    setOpen(false)
  }

  const handleClickOpenSuccess = () => {
    setOpenSuccess(true)
  }

  const handleCloseSuccess = () => {
    setOpenSuccess(false)
  }
  const successConfirmButtonHandle = () => {
    setOpenSuccess(false)
  }
  const deletePopup = {
    deleteTitle: 'Deactivate User!',
    deleteDescription: `Are you sure you want to deactivate “Prakash Raj”? The user won’t be able to perform any task if you deactivate him.`,
    deleteCloseText: 'No, Keep it!',
    deleteConfirmText: 'Yes, Delete it!',
  }
  const successPopup = {
    successTitle: 'User Created Successfully!',
    successDescription: `We send an invitation e-mail to the “rkaushal@hello.com”. Users need to accept the invitation by clicking the “Activate Your Account link in the e-mail address.`,
    successCloseText: 'Go to Listing',
    successConfirmText: 'Create Another',
  }
  const StyleCss = `
    @media (min-width: 1024px){
      .boxwp {
        margin: 0 30px 30px 0;
        width: calc(50% - 15px);
        display: inline-block;
      }
      .boxwp:nth-child(2n) {
        margin: 0 0px 30px 0;
      }
    }
    @media (min-width: 768px) and (max-width: 1023px ){
      .boxwp {
        margin: 0 15px 15px 0;
        min-width: 450px;
      }
    }
    @media (max-width: 767px){
      .boxwp {
        margin: 0 15px 15px 0;
        min-width: 300px;
      }
    }
    
    
  `
  return (
    <>
      <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
        <style>{StyleCss}</style>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            onClick={() => navigate('/user-management/user-list')}
            sx={{
              color: '#2d2d39',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
            }}
          >
            <ArrowBackIcon />
          </Box>
          <Typography variant="h5bold">User Details</Typography>
        </Box>
        <Box
          sx={{
            margin: { xs: '15px 0', md: '30px 0' },
            borderBottom: '1px solid #CED3D9',
            padding: { xs: '5px 0 15px', em: '5px 0 30px' },
          }}
        >
          <Grid container>
            <Grid item xs={12} md={12} em={8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  padding: { xs: '10px 25px 0 0' },
                  alignItems: { xs: 'flex-start', md: 'center' },
                }}
              >
                <Box
                  sx={{
                    minWidth: '120px',
                    minHeight: '120px',
                    maxWidth: '120px',
                    maxHeight: '120px',
                    overflow: 'hidden',
                    borderRadius: '30px',
                    marginRight: '30px',
                    marginBottom: { xs: '15px', md: '0' },
                  }}
                >
                  <img src={imageUrl} style={{ objectFit: 'cover' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="h3bold"
                      component="div"
                      sx={{ marginRight: '5px' }}
                    >
                      Prakash Raj
                    </Typography>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        marginRight: '5px',
                        background: '#5cb85b',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                    ></Box>
                  </Box>
                  <Typography
                    variant="h5medium"
                    component="div"
                    sx={{
                      color: '#2d2d39',
                      margin: { xs: '10px 0', md: '14px 0' },
                    }}
                  >
                    Content Editor/Creator - Custom
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={handleClickOpenSuccess}
                      sx={{ height: '40px', marginRight: '15px' }}
                    >
                      Edit User
                    </Button>
                    <Button variant="redbutton" onClick={handleClickOpen}>
                      Deactivate User
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} em={4}>
              <Box className="UserDetailssc">
                <Typography
                  variant="h5regular"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <MailOutlineIcon
                    sx={{ marginRight: '12px', fontSize: '18px' }}
                  />
                  rkaushal@hello.com
                </Typography>
                <Typography
                  variant="h5regular"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <LocalPhoneIcon
                    sx={{ marginRight: '12px', fontSize: '18px' }}
                  />
                  123 445 7890
                </Typography>
                <Typography
                  variant="h5regular"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <AccessTimeIcon
                    sx={{ marginRight: '12px', fontSize: '18px' }}
                  />
                  EDT - Current Location 15:17
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: { xs: '15px', md: '20px' } }}>
            <Typography variant="h6bold">Permissions</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: { xs: 'flex', em: 'inline-block' },
                overflowX: { xs: 'auto', em: 'inherit' },
              }}
            >
              <Box className="boxwp">
                <PermissionsCheckBoxCard />
              </Box>
              <Box className="boxwp">
                <PermissionsCheckBoxCard />
              </Box>
              <Box className="boxwp">
                <PermissionsCheckBoxCard />
              </Box>
              <Box className="boxwp">
                <PermissionsCheckBoxCard />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <PlateformXDialog
          isDialogOpen={open}
          closeButtonHandle={handleClose}
          confirmButtonHandle={deleteConfirmButtonHandle}
          title={`${deletePopup.deleteTitle}`}
          subTitle={`${deletePopup.deleteDescription}`}
          closeButtonText={`${deletePopup.deleteCloseText}`}
          confirmButtonText={`${deletePopup.deleteConfirmText}`}
        />
      )}
      {openSuccess && (
        <PlateformXDialogSuccess
          isDialogOpen={openSuccess}
          closeButtonHandle={handleCloseSuccess}
          confirmButtonHandle={successConfirmButtonHandle}
          title={`${successPopup.successTitle}`}
          subTitle={`${successPopup.successDescription}`}
          closeButtonText={`${successPopup.successCloseText}`}
          confirmButtonText={`${successPopup.successConfirmText}`}
        />
      )}
    </>
  )
}

export default UserDetails
