import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTranslation } from "react-i18next";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { XTypography } from '../XTypography/XTypography';

const Editor = ({
  title,
  closeEditor,
  info,
  setInfo,
  fieldName,
  setIsEdit,
  isOpen,
  copyData,
}) => {
  const { t } = useTranslation();
  const handleData = (event, fieldType) => {
    if (event.jsObject !== undefined) {
      const contentNew = { ...info };
      contentNew[fieldType] = event.jsObject;
      setInfo(contentNew);
      setIsEdit(true);
    }
  };
  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={() => closeEditor(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{
        '.Platform-x-Dialog-paper': {
          maxWidth: { xs: '100%', sm: '700px', lg: '800px' },
          width: { xs: '100%', sm: '700px', lg: '800px' },
          margin: { xs: '0px' },
          position: { xs: 'absolute', md: 'inherit' },
          bottom: { xs: 0 },
          borderBottomLeftRadius: { xs: 0, md: 4 },
          borderBottomRightRadius: { xs: 0, md: 4 },
        },
      }}
    >
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: { xs: '10px 20px', sm: '10px 40px' },
          borderBottom: '1px solid #ced3d9',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            onClick={() => closeEditor(false)}
            sx={{
              display: {
                xs: 'flex',
                sm: 'none',
                marginRight: '10px',
              },
            }}
          >
            <ArrowBackIosIcon fontSize='small' />
          </Box>
          <XTypography variant="h4bold" label={title} />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Box
            onClick={copyData}
            sx={{
              padding: { xs: '6px 10px', sm: '8px 13px' },
              backgroundColor: '#f5f6f8',
              marginRight: '10px',
              verticalAlign: 'middle',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <ContentCopyIcon />
          </Box>
          <Box
            onClick={() => closeEditor(true)}
            sx={{
              padding: { xs: '6px 10px', sm: '8px 13px' },
              backgroundColor: '#f5f6f8',
              verticalAlign: 'middle',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <CheckIcon />
          </Box>
        </Box>
      </DialogActions>
      <DialogContent
        sx={{
          padding: '10px 30px',
        }}
      >
        <JSONInput
          id='json-editor'
          confirmGood={false}
          placeholder={info[fieldName]}
          onChange={(e) => handleData(e, fieldName)}
          theme='light_mitsuketa_tribute'
          locale={locale}
          height='100%'
          width='100%'
          colors={{
            string: '#1984bc',
            keys: '#000000',
            colon: '#000000',
            default: '#000000',
          }}
          style={{
            body: { fontSize: '16px' },
            fontFamily: 'Roboto Mono',
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
export default Editor;
