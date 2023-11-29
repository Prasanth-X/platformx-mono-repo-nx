import InfoIcon from '@mui/icons-material/Info'
import { Button, styled } from '@mui/material'
import { Box } from '@mui/system'

export const FlexBox = styled(Box)({
    display: 'flex',
})
export const NavIconContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '0',
})

export const NavGuideButtonContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '25px',
})

export const NavMenuCreationContainer = styled(Box)({
    marginBottom: '14px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

export const MenuGuideButtonContainer = styled(Box)({
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 29px 16px 18px',
})

export const NavInfoIcon = styled(InfoIcon)({
    width: '20px',
    height: '20px',
    mr: '5px',
})

export const GuideButton = styled(Button)({
    minWidth: '219px',
    minHeight: '50px',
    fontSize: '14px',
    fontWeight: 500,
})
