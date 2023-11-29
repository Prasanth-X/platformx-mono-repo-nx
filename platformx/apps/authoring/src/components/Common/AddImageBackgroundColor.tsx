import CachedIcon from '@mui/icons-material/Cached';
import { Box, Typography } from '@mui/material';
import Icon from '../../assets/Icon.svg';
import RefreshIcon from '../../assets/RefreshIcon.svg';

import ArrowUpwardIcon from '../../assets/svg/UploadThumbnail.svg';
import useAccess from '../../hooks/usePermissions/useAccess';
import CommonImageRender from '../../pages/Gallery/CommonImageRender';
import ThemeConstants from '../../theme/variable';
import {
  Category,
  ContentAction,
  ContentType,
} from '../../utils/Enums/ContentType';
import '../Common/commonStyles/disabledStyles.css';
import { ErrorTooltip } from './ErrorTooltip';
interface ImageProps {
  state: string;
  isImg: boolean;
  onUploadClick: any;
  backgroundColor: string;
  handleColorPallete: any;
  handleRefresh: any;
  label: string;
  operationType?: string;
  content?: any;
  updateField?: any;
  originalImage?: any;
  publishedImages?: any;
  isShowCrop?: boolean;
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
  const { canAccessAction } = useAccess();
  return (
    <ErrorTooltip
      component={
        <Box
          className={
            !canAccessAction(
              Category.Content,
              ContentType.Poll,
              ContentAction.View
            ) && 'disable'
          }
        >
          {state && isImg ? (
            <Box
              sx={{
                position: 'relative',
                borderRadius: '15px',
                minHeight: '206px',
                '& picture': {
                  minHeight: '206px',
                },
              }}
              mb={2}
            >
              {isShowCrop ? (
                <CommonImageRender
                  content={content}
                  imgOrder={{
                    1440: 'hero',
                    1280: 'landscape',
                    1024: 'card2',
                    768: 'square',
                    600: 'card2',
                    320: 'card2',
                  }}
                  updateField={updateField}
                  originalImage={originalImage}
                  publishedImages={publishedImages}
                  operationType={operationType}
                />
              ) : (
                <img
                  style={{
                    width: '100%',
                    height: '206px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                  }}
                  src={state}
                />
              )}
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  width: '100%',
                  height: { xs: '100%' },
                  aspectRatio: {
                    xs: '4 / 3',
                    sm: '4 / 3',
                    md: '1 / 1',
                    em: '4 / 3',
                    lg: '16 / 9',
                    xl: '3 / 1',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#7470708a',
                  borderRadius: '15px',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onUploadClick('replace')}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        width: '25px',
                        height: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto',
                      }}
                    >
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
              sx={{
                width: '100%',
                height: '206px',
                aspectRatio: {
                  xs: '4 / 3',
                  sm: '4 / 3',
                  md: '1 / 1',
                  em: '4 / 3',
                  lg: '16 / 9',
                  xl: '3 / 1',
                },
                backgroundColor: backgroundColor,
                borderRadius: '15px',
              }}
            ></Box>
          ) : (
            <>
              <Box></Box>
              <Box
                sx={{
                  borderRadius: '15px',
                  // border: 'dashed 2px #707070',
                  // paddingLeft: {
                  //   xs: "30px",
                  //   sm: "30px",
                  //   md: "100px",
                  // },
                  cursor: 'pointer',
                  height: '206px',
                  // aspectRatio: {
                  //   xs: '9 / 16',
                  //   sm: '2 / 3',
                  //   md: '1 / 1',
                  //   em: '4 / 3',
                  //   lg: '16 / 9',
                  //   xl: '3 / 1',
                  // },
                  backgroundColor: '#EFF0F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                onClick={() => onUploadClick('choose')}
              >
                <Box
                  sx={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  m={1}
                >
                  <img src={ArrowUpwardIcon} alt='ArrowUpwardIcon' />
                </Box>
                <Box
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: ThemeConstants.PRIMARY_MAIN_COLOR,
                  }}
                >
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
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'row',
              flexFlow: { xs: 'wrap', lg: 'nowrap' },
            }}
          >
            <Box
              onClick={() => onUploadClick('choose')}
              sx={{
                width: '27px',
                height: '27px',
                flexGrow: '0',
                borderRadius: '20px',
                backgroundColor: '#fff',
                margin: {
                  xs: '0px 8px 8px 0px',
                  lg: '0px 8px 8px 0px',
                },
                border: 'solid 1px #2d2d39',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <img src={Icon} alt='Icon' />
            </Box>

            {colorCode.map((val, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => handleColorPallete(val)}
                  sx={{
                    width: '27px',
                    height: '27px',
                    flexGrow: '0',
                    borderRadius: '20px',
                    backgroundColor: val,
                    margin: {
                      xs: '0px 8px 8px 0px',
                      lg: '0px 8px 8px 0px',
                    },
                    border: val === '#fff' ? 'solid 1px #e6eaed' : null,
                    cursor: 'pointer',
                  }}
                ></Box>
              );
            })}
            <Box
              onClick={handleRefresh}
              sx={{
                width: '27px',
                height: '27px',
                flexGrow: '0',
                borderRadius: '20px',
                backgroundColor: '#fff',
                border: 'solid 1px #2d2d39',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: {
                  xs: '0px 8px 8px 0px',
                  lg: '0px 0px 8px 0px',
                },
              }}
            >
              <img src={RefreshIcon} alt='Icon' />
            </Box>
          </Box>
        </Box>
      }
      doAccess={
        !canAccessAction(Category.Content, ContentType.Poll, ContentAction.View)
      }
    />
  );
};
