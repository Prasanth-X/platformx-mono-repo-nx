import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/platform-x-logo.png';
import { putRequest } from '../../services/config/request';
import { setDefaultPageModel } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { ChangeSuccess } from './ChangeSuccess';

interface State {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

interface Value {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState<State>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [data, setData] = React.useState<Value>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = React.useState<Value>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [apiError, setApiError] = React.useState<string>('');

  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [changePasswordSuccess, setChangePasswordSuccess] =
    React.useState<boolean>(false);
  const { state, dispatch } = useContext(Store);
  const handleSubmit = () => {
    const clone = { ...errors };

    if (data.currentPassword.length < 8)
      clone.currentPassword = 'Minimum 8 characters';
    else clone.currentPassword = '';

    if (data.newPassword.length < 8) clone.newPassword = 'Minimum 8 characters';
    else if (data.newPassword === data.currentPassword)
      clone.newPassword =
        'New password must be different from current password.';
    else clone.newPassword = '';

    if (data.confirmPassword.length < 8)
      clone.confirmPassword = 'Minimum 8 characters';
    else if (data.confirmPassword !== data.newPassword)
      clone.confirmPassword = 'Must match previous entry';
    else clone.confirmPassword = '';

    setErrors(clone);
    const errorStatus = Object.values(clone).some((value) => Boolean(value));
    if (!errorStatus) {
      const payload = {
        currentPassword: window.btoa(data.currentPassword),
        newPassword: window.btoa(data.newPassword),
      };
      setLoading(true);
      putRequest(`user/change-password`, payload).then((response) => {
        setLoading(false);
        if (response?.code === 200) {
          setIsDisabled(true);
          setChangePasswordSuccess(true);
          setData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
          setErrors({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        } else {
          setApiError(response?.response?.data?.error?.message);
        }
      });
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
      if (event.target.value !== '') setErrors({ ...errors, [prop]: '' });
      const clone = { ...errors };
      if (
        prop === 'currentPassword' &&
        data.newPassword !== event.target.value
      ) {
        clone.newPassword = '';
      }
      if (
        prop === 'newPassword' &&
        data.confirmPassword === event.target.value
      ) {
        clone.confirmPassword = '';
      }
      if (
        prop === 'confirmPassword' &&
        data.newPassword === event.target.value
      ) {
        clone.newPassword = '';
      }
      if (event.target.value !== '') {
        clone[prop] = '';
      }
      setErrors(clone);
    };

  const handleClickShowPassword = (prop: keyof Value) => () => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleBack = () => {
    navigate('/page-list');
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setApiError('');
  };

  useEffect(() => {
    dispatch(setDefaultPageModel(state));
  }, []);

  useEffect(() => {
    const res = Object.keys(data).every((key) => data[key]);
    const result = Object.keys(errors).some((key) => errors[key]);
    if (res) setIsDisabled(false);
    else setIsDisabled(true);

    if (result) setIsDisabled(true);
  }, [data, errors]);

  return (
    <>
      <Container maxWidth='md'>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              cursor: 'pointer',
              margin: '20px 0 20px',
              textAlign: 'center',
            }}
          >
            <img src={Logo} height='30' />
          </Box>
          <Paper
            sx={{
              maxWidth: 500,
              margin: 'auto',
              overflow: 'hidden',
              backgroundColor: '#f6f7f8',
              boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
              borderRadius: '35px',
              display: 'flex',
              flexDirection: 'column',
              width: { lg: '500px', md: '400px', xs: '100%' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', margin: '35px 0 15px' }}
              variant='h6'
              align='center'
            >
              Change Password
            </Typography>
            <TextField
              sx={{ width: '75%' }}
              autoComplete='off'
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword ? errors.currentPassword : ' '}
              placeholder="minimum 8 letters"
              label='Current Password'
              margin='normal'
              name='password'
              onChange={handleChange('currentPassword')}
              type={showPassword.currentPassword ? 'text' : 'password'}
              value={data.currentPassword}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment:
  <InputAdornment position='end'>
    <IconButton
                      onClick={handleClickShowPassword('currentPassword')}
                      data-testid='current-icon'
                      onMouseDown={handleMouseDownPassword}
                    >
      {showPassword.currentPassword ?
        <Visibility />
                       :
        <VisibilityOff />}
    </IconButton>
  </InputAdornment>
                ,
              }}
              inputProps={{
                'data-testid': 'current',
              }}
            />
            <TextField
              sx={{ width: '75%' }}
              autoComplete='off'
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword ? errors.newPassword : ' '}
              placeholder="minimum 8 letters"
              label='New Password'
              margin='normal'
              name='password'
              onChange={handleChange('newPassword')}
              type={showPassword.newPassword ? 'text' : 'password'}
              value={data.newPassword}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment:
  <InputAdornment position='end'>
    <IconButton
                      onClick={handleClickShowPassword('newPassword')}
                      data-testid='change-icon'
                      onMouseDown={handleMouseDownPassword}
                    >
      {showPassword.newPassword ?
        <Visibility />
                       :
        <VisibilityOff />}
    </IconButton>
  </InputAdornment>
                ,
              }}
              inputProps={{
                'data-testid': 'change',
              }}
            />
            <TextField
              sx={{ width: '75%' }}
              autoComplete='off'
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword ? errors.confirmPassword : ' '}
              placeholder="minimum 8 letters"
              label='Confirm New Password'
              margin='normal'
              name='password'
              onChange={handleChange('confirmPassword')}
              type={showPassword.confirmPassword ? 'text' : 'password'}
              value={data.confirmPassword}
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment:
  <InputAdornment position='end'>
    <IconButton
                      onClick={handleClickShowPassword('confirmPassword')}
                      data-testid='confirm-icon'
                      onMouseDown={handleMouseDownPassword}
                    >
      {showPassword.confirmPassword ?
        <Visibility />
                       :
        <VisibilityOff />}
    </IconButton>
  </InputAdornment>
                ,
              }}
              inputProps={{
                'data-testid': 'confirm',
              }}
            />
            <Button
              sx={{
                width: '75%',
                margin: '11px 0 35px',
              }}
              variant='contained'
              disabled={isDisabled}
              onClick={handleSubmit}
              data-testid='change-password-submit'
              endIcon={
                loading && <CircularProgress size={20} color='inherit' />
              }
            >
              Submit
            </Button>
          </Paper>
          <Box
            sx={{
              marginTop: '15px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={handleBack}
          >
            <ArrowBackIosNewIcon sx={{ color: '#0077B5' }} fontSize='small' />
            <Typography
              sx={{ fontWeight: 'bold', color: '#0077B5' }}
              variant='subtitle1'
              align='center'
            >
              Back to Dashboard
            </Typography>
          </Box>
        </Box>
        {changePasswordSuccess && <ChangeSuccess />}
        <Snackbar
          open={apiError?.length === 0 ? false : true}
          autoHideDuration={6000}
          onClose={handleClose}
          data-testid='snackbar'
        >
          <Alert severity='error' sx={{ width: '100%' }}>
            {apiError}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};
