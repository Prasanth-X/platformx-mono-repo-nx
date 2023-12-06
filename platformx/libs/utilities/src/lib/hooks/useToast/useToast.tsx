import { Typography } from '@mui/material';
import React from 'react';
import { ToastContent, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const useToast = () => {
  const toastPosition = 'top-right';

  const convertFontSize = (mag = '') => (
    <React.Fragment>
      <Typography
        component="span"
        style={{
          fontSize: '18px',
        }}
      >
        {mag}
      </Typography>
    </React.Fragment>
  );

  const defaultToast = (message: any, id = '') =>
    toast(convertFontSize(message) as ToastContent, {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    });

  const successToast = (message: any, id = '') =>
    toast.success(convertFontSize(message) as ToastContent, {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
      theme: 'colored',
      style: { background: '#2E7D32' },
    });

  const failToast = (message: any, id = '') =>
    toast.error(convertFontSize(message) as ToastContent, {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
      theme: 'colored',
      style: { background: '#d32f2f' },
    });

  const warnToast = (message: any, id = '') =>
    toast.warn(convertFontSize(message) as ToastContent, {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    });

  const infoToast = (message: any, id = '') =>
    toast.info(convertFontSize(message) as ToastContent, {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    });

  const dismissToast = (toastId = '') => toast.dismiss(toastId);

  return {
    defaultToast,
    successToast,
    failToast,
    warnToast,
    infoToast,
    dismissToast,
  };
};
