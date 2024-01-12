import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
export default function ToolTipMessage() {
 const { t } = useTranslation();
  return (
    <Box sx={{display:'flex',flexDirection:'column'}}>
      <Box>
        <Typography variant='h5semibold' sx={{textAlign:'left'}} >{t('toolTip_title')}</Typography>
      </Box>
      <Box>
        <Typography variant='h5regular' sx={{textAlign:'left'}}>
         { t('toolTip_message')}
        </Typography>
      </Box>
    </Box>
  );
}
