import CachedIcon from '@mui/icons-material/Cached';
import { Box, Typography } from '@mui/material';
// import '../../../src/components/Common/commonStyles/disabledStyles.css';
import Icon from '../../../assets/svg/Icon.svg';
import RefreshIcon from '../../../assets/svg/Refresh.svg';
import ArrowUpwardIcon from '../../../assets/svg/UploadThumbnail.svg';
// import CommonImageRender from '../../pages/Gallery/CommonImageRender';
import ThemeConstants from '../../../themes/authoring/lightTheme/lightThemeVariable';
import { useStyles } from './AddImageBackgroundColor.style';
import { ErrorTooltip } from '../../ErrorTooltip/ErrorTooltip';

export interface ImageProps {
  state: string;
  isImg: boolean;
  onUploadClick?: any;
  backgroundColor: string;
  handleColorPallete?: any;
  handleRefresh?: any;
  label: string;
  operationType?: string;
  content?: any;
  updateField?: any;
  originalImage?: any;
  publishedImages?: any;
  isShowCrop?: boolean;
  isAssetAccess?: boolean;
}

export const AddImageBackgroundColor = ({
  state,
  isImg,
  onUploadClick,
  backgroundColor,
  handleColorPallete,
  handleRefresh,
  label,
  operationType,
  content,
  updateField,
  originalImage,
  publishedImages,
  isShowCrop = false,
  isAssetAccess = true,
}: ImageProps) => {
  const colorCode = [
    '#b29a53',
    '#ba8b78',
    '#ae6958',
    '#d86057',
    '#b75c8d',
    '#68669a',
    '#5c98ba',
    '#334075',
    '#246d73',
    '#806a71',
    '#514146',
  ];
  // const { isAssetAccess } = usePermissions();
  const classes = useStyles();

  return (
    <ErrorTooltip
      component={
        // <Box className={!isAssetAccess && 'disable'}> TODO

        <Box  >
          {state && isImg ? (
            <Box className={classes.imageContainer} mb={2}>
              {isShowCrop ? (
                // <CommonImageRender
                //   content={content}
                //   imgOrder={{
                //     1440: 'hero',
                //     1280: 'landscape',
                //     1024: 'card2',
                //     768: 'square',
                //     600: 'card2',
                //     320: 'card2',
                //   }}
                //   updateField={updateField}
                //   originalImage={originalImage}
                //   publishedImages={publishedImages}
                //   operationType={operationType}
                // />
                <Typography>TODO</Typography>
              ) : (
                <img className={classes.imgStyle} src={state} />
              )}
              <Box
                className={classes.uploadImgContainer}
                sx={{
                  // height: { xs: '100%', lg: '206px' },
                  aspectRatio: {
                    xs: '4 / 3',
                    sm: '4 / 3',
                    md: '1 / 1',
                    em: '4 / 3',
                    lg: '16 / 9',
                    xl: '3 / 1',
                  },
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onUploadClick('replace')}
                  >
                    <Box className={classes.replaceStyle}>
                      <CachedIcon sx={{ color: '#626060' }} />
                    </Box>
                    <Typography
                      mt={1}
                      sx={{
                        fontSize: ThemeConstants.FONTSIZE_XS,
                        color: ThemeConstants.WHITE_COLOR,
                      }}
                    >
                      Replace
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (state || backgroundColor) && !isImg ? (
            <Box
              className={classes.bgColorBoxStyle}
              sx={{
                aspectRatio: {
                  xs: '4 / 3',
                  sm: '4 / 3',
                  md: '1 / 1',
                  em: '4 / 3',
                  lg: '16 / 9',
                  xl: '3 / 1',
                },
                backgroundColor: backgroundColor,
              }}
            ></Box>
          ) : (
            <>
              <Box></Box>
              <Box
                className={classes.chooseImgBoxStyle}
                onClick={() => onUploadClick('choose')}
              >
                <Box className={classes.arrowUpIconStyle} m={1}>
                  <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                </Box>
                <Box className={classes.labelStyle}>
                  <Typography
                    variant='h5medium'
                    component='h5'
                    sx={{ color: '#000000' }}
                  >
                    {label}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          <Box
            sx={{
              flexFlow: { xs: 'wrap', lg: 'nowrap' },
            }}
            className={classes.colorPalleteStyle}
          >
            <Box
              onClick={() => onUploadClick('choose')}
              className={classes.iconBoxStyle}
            >
              {/* <Icon /> */}
              <img src={Icon} alt='Icon' />
            </Box>

            {colorCode.map((val, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => handleColorPallete(val)}
                  className={classes.colorBox}
                  sx={{
                    backgroundColor: val,

                    border: val === '#fff' ? 'solid 1px #e6eaed' : null,
                  }}
                ></Box>
              );
            })}
            <Box onClick={handleRefresh} className={classes.refreshIconStyle}>
              <img src={RefreshIcon} alt='RefreshIcon' />

              {/* <RefreshIcon /> */}
            </Box>
          </Box>
        </Box>
      }
      doAccess={!isAssetAccess}
    />
  );
};
