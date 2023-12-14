import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorToast from '../customToast/ErrorToast';
import InfoToast from '../customToast/InfoToast';
import SuccessToast from '../customToast/SuccessToast';
import WarningToast from '../customToast/WarningToast';

export const showToastSuccess = (message) => {
  toast.success(<SuccessToast title={'Success'} description={message} />);
};

export const showToastError = (message) => {
  toast.error(<ErrorToast title={'Error'} description={message} />);
};

export const showToastWarning = (message) => {
  toast.warning(<WarningToast title={'Warning'} description={message} />);
};

export const showToastInfo = (message) => {
  toast.info(<InfoToast title={'Info'} description={message} />);
};
