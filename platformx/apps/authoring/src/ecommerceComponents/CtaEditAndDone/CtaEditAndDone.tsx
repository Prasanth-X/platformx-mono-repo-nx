import { Box, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import './CtaEditAndDone.css';

interface ICtaEditAndDone {
  cancelClick: any,
  doneClick: any,
  cancelStyle?: object,
  doneStyle?: object
}

const CtaEditAndDone = ({ cancelClick, doneClick, cancelStyle = {}, doneStyle = {} }: ICtaEditAndDone) => {
  const { t } = useTranslation();

  const onClickCancel = () => {
    cancelClick();
  }

  return (
    <Box justifyContent='end'>
      <Button
        variant='secondaryButton'
        onClick={() => onClickCancel()}
      >
        {t('cancel')}
      </Button>
      <Button
        style={doneStyle}
        disabled={false}
        onClick={doneClick}
        variant='primaryButton'
        sx={{marginLeft: '12px',}}
      >
        {t('done')}
      </Button>
    </Box>
  );
};

export default CtaEditAndDone;
