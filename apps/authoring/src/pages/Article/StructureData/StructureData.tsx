import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { useStyles } from './StructureData.styles';

const StructureData = ({
  state,
  setState,
  structure_data,
  openStructureData,
  copyStructureData,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  let structureData = structure_data;
  const handleStructureData = (event) => {
    if (event.jsObject !== undefined) {
      setState({
        ...state,
        CommonFields: {
          ...state.CommonFields,
          structure_data: JSON.stringify(event.jsObject),
        },
      }) || {};
      structureData = event.jsObject;
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.containerHead}>
        <Typography variant='h4bold'>{t('page_structure_data')}</Typography>
        <Box className={classes.flexBox}>
          <Box className={classes.copyIcon}>
            <ContentCopyIcon onClick={() => copyStructureData(structureData)} />
          </Box>
          <Box onClick={openStructureData} className={classes.checkIcon}>
            <CheckIcon />
          </Box>
        </Box>
      </Box>
      <Box className={classes.containerContent}>
        <JSONInput
          id='json-editor'
          confirmGood={false}
          placeholder={structure_data}
          onBlur={(e) => handleStructureData(e)}
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
            body: { fontSize: '16px', margin: '10px 20px', zIndex: 1, position: 'relative' },
          }}
        />
      </Box>
    </Box>
  );
};

export default StructureData;
