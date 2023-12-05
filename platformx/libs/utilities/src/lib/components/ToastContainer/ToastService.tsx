import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastPosition = "bottom-left";

const convertFontSize = (mag = "") => {
  return (
    <React.Fragment>
      <span
        style={{
          fontSize: "18px",
        }}>
        {mag}
      </span>
    </React.Fragment>
  );
};

const ToastService = {
  defaultToast: (message: any, id = "") =>
    toast(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    }),

  SuccessToast: (message: any, id = "") =>
    toast.success(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
      theme: "colored",
      style: { background: "#2E7D32" },
    }),

  failToast: (message: any, id = "") =>
    toast.error(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
      theme: "colored",
      style: { background: "#d32f2f" },
    }),

  warnToast: (message: any, id = "") =>
    toast.warn(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    }),

  infoToast: (message: any, id = "") =>
    toast.info(convertFontSize(message), {
      toastId: id,
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      hideProgressBar: true,
      position: toastPosition,
    }),

  dismissToast: (toastId = "") => toast.dismiss(toastId),
};

export default ToastService;
