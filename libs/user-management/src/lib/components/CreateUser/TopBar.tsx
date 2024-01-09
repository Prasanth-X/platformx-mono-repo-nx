import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Box, Button, Divider, Tooltip, Typography } from '@mui/material'
import { Logo } from '@platformx/utilities'
import { useNavigate } from 'react-router-dom'

const TopBar = ({
  returnBack,
  createUserDisable,
  isEmailExists,
  t,
  createText,
  parentToolTip,
}: any) => {
  const navigate = useNavigate()
  console.log('check', createUserDisable, isEmailExists)
  return (
    <>
      <Box className="createusertophead">
        <Box className="d-flex">
          <Box className="backarrow" onClick={returnBack}>
            <ArrowBackIcon />
          </Box>
          <Box className="d-flex" onClick={() => navigate('/dashboard')}>
            <img src={Logo} height="30" />
          </Box>
        </Box>
        <Box className="d-flex align-items-center justify-content-space-between">
          <Tooltip
            title={
              createUserDisable
                ? 'Please fill all the mandatory(*) details'
                : ''
            }
            placement="left"
            enterTouchDelay={0}
          >
            <span style={{ cursor: 'pointer' }}>
              <Button
                disabled={createUserDisable || isEmailExists}
                variant="primaryButton"
                className="sm"
                type="submit"
              >
                {createText}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Box className="createuserbottomhead">
        <Box className="d-flex align-items-center justify-content-space-between">
          <Box className="backarrow" onClick={returnBack}>
            <ArrowBackIcon />
          </Box>
          <Typography variant="h3medium">{createText}</Typography>
        </Box>
        <Box className="d-flex align-items-center justify-content-space-between">
          <Button
            sx={{
              paddingLeft: 0,
              '&:hover': { backgroundColor: 'transparent' },
              cursor: 'default',
            }}
            disableRipple
            disableFocusRipple
            variant="text"
          >
            <Typography
              className="d-flex align-items-center"
              variant="h7medium"
              sx={{
                textTransform: 'capitalize',
              }}
            >
              <Box
                sx={{
                  background:
                    parentToolTip === 'userTypes' ? '#dfe4ff' : 'transparent',
                  borderRadius: '5px',
                  marginRight: '10px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                // className='usericon'
              >
                <PersonOutlineIcon
                  sx={{ color: '#5256B8', fontSize: '18px' }}
                />
              </Box>
              {t('user_types')}
            </Typography>
          </Button>
          <Box sx={{ width: '20px', height: '0px', margin: '8px 8px 8px 0px' }}>
            <Divider />
          </Box>
          <Button
            sx={{
              paddingLeft: 0,
              '&:hover': { backgroundColor: 'transparent' },
              cursor: 'default',
            }}
            disableRipple
            disableFocusRipple
            variant="text"
          >
            <Typography
              className="d-flex align-items-center"
              variant="h7medium"
              sx={{
                textTransform: 'capitalize',
              }}
            >
              <Box
                sx={{
                  background:
                    parentToolTip === 'user' ? '#dfe4ff' : 'transparent',
                  borderRadius: '5px',
                  marginRight: '10px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                // className='usericon'
              >
                <PersonOutlineIcon
                  sx={{ color: '#5256B8', fontSize: '18px' }}
                />
              </Box>
              {t('user_details')}
            </Typography>
          </Button>
          <Box sx={{ width: '20px', height: '0px', margin: '8px 8px 8px 0px' }}>
            <Divider />
          </Box>
          <Button
            disableRipple
            disableFocusRipple
            sx={{
              paddingLeft: 0,
              '&:hover': { backgroundColor: 'transparent' },
              cursor: 'default',
            }}
          >
            <Typography
              className="d-flex align-items-center"
              variant="h7medium"
              sx={{
                textTransform: 'capitalize',
              }}
            >
              <Box
                sx={{
                  background:
                    parentToolTip === 'rolepermission'
                      ? '#dfe4ff'
                      : 'transparent',
                  borderRadius: '5px',
                  marginRight: '10px',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                //className='usericon'
              >
                <StarBorderIcon
                  sx={{
                    color: '#5256B8',
                    // marginRight: '10px',
                    fontSize: '18px',
                  }}
                />
              </Box>
              {t('roll_permission')}
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default TopBar
