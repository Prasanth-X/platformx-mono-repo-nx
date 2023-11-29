import ArrowUpwardIcon from '../../../../../assets/svg/UploadThumbnail.svg';
import CachedIcon from '@mui/icons-material/Cached';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorTooltip } from '../../../../../components/Common/ErrorTooltip';
import '../../../../../components/Common/commonStyles/disabledStyles.css';
import { useStyles } from './ChooseVideoTray.styles';
import { ChooseVideoTrayProps } from './ChooseVideoTray.types';
import useAccess from '../../../../../hooks/usePermissions/useAccess';
import {
  Category,
  ContentAction,
  ContentType,
} from '../../../../../utils/Enums/ContentType';

export const ChooseVideoTray: FC<ChooseVideoTrayProps> = ({
  ifVideoUrl: ifVideoUrl,
  onUploadClick: onUploadClick,
}) => {
  const { t } = useTranslation();
  const { canAccessAction } = useAccess();
  const classes = useStyles();
  return (
    <ErrorTooltip
      component={
        <Box
          className={
            !canAccessAction(
              Category.Content,
              ContentType.Vod,
              ContentAction.View
            ) && 'disable'
          }
        >
          {ifVideoUrl ? (
            <Box
              sx={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden',
              }}
              mb={1}
            >
              <video
                style={{ width: '100%', height: '100%' }}
                src={ifVideoUrl}
                controls
              ></video>
              <Box className={classes.replaceTray}>
                <Box onClick={() => onUploadClick('Videos')}>
                  <Box className={classes.cashedContainer}>
                    <CachedIcon sx={{ color: '#626060' }} />
                  </Box>
                  <Typography
                    mt={1}
                    variant='h7regular'
                    className={classes.whiteColor}
                  >
                    {t('replace')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              <Box
                className={classes.chooseTray}
                onClick={() => onUploadClick('Videos')}
              >
                <Box className={classes.arrowUpContainer} mr={1}>
                  <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                </Box>
                <Box className={classes.chooseTextContainer}>
                  <Typography variant='h5medium'>
                    {t('video_subtitle')}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      }
      doAccess={
        !canAccessAction(Category.Content, ContentType.Vod, ContentAction.View)
      }
    />
  );
};
