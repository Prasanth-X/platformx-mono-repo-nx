import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";

injectStyle();

const ToastContainerHandle = () => {
  return (
    <React.Fragment>
      <ToastContainer
        position='bottom-left'
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme={"colored"}
        icon={true}
      />
    </React.Fragment>
  );
};
export default React.memo(ToastContainerHandle);
