
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GuidelineImage from '../../assets/images/Guideline_image.png';
import SSGuideline from '../../assets/images/SS_Guideline.png';
import ThemeConstants from '../../theme/variable';

export default function Guideline() {
  const { t } = useTranslation();
  return (
    <>
      <Box sx={{ display: "flex", position: "relative" }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        ></Box>
        <Box
          sx={{
            width: { sm: '0%', xs: '0%', md: '19%', lg: '19%' },
            display: { sm: 'none', xs: 'none', md: 'block', lg: 'block' },
          }}
        ></Box>
        <Box
          sx={{
            width: { sm: "100%", xs: "100%", md: "100%", lg: "100%" },
          }}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
            }}>
            <CloseIcon
              sx={{
                width: "19.1px",
                height: "19.1px",
                position: "absolute",
                right: 10,
                top: 10,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                width: '393px',
                height: '35px',
                margin: '5px 0px 0px 18px',
                color: '#89909a',
              }}
            >
              {t('menu_guide_button')}
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "30px 0px 0px 178px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#2d2d39',
              }}
            >
              {t('menu_creation_step1')}{' '}
            </Typography>
            <Button
              disableElevation
              sx={{
                width: "150px",
                height: "35px",
                borderRadius: "3px",
                fontSize: ThemeConstants.FONTSIZE_XS,
                backgroundColor: "#2d2d39",
                color: "#fff",
                textTransform: "none",
                margin: 1,
                "&:hover": {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
              }}
            >
              <AddIcon
                sx={{ width: "10.6px", height: "10.6px", margin: 0.5 }}
              />{" "}
              {t("menu_create_button")}
            </Button>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#2d2d39',
              }}
            >
              {t('cta_or_button')}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#89909a",
                fontSize: ThemeConstants.FONTSIZE_XS,
                margin: '0px 0px 0px 178px',
              }}
            >
              {t('menu_step1_details')}
            </Typography>
          </Box>
          <Box sx={{ margin: '30px 0px 0px 178px', objectFit: 'contain' }}>
            <img src={GuidelineImage} width='500px' height='150px' />
          </Box>
          <Box
            sx={{
              margin: "20px 0px 0px 178px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: '#2d2d39',
              }}
            >
              {t('menu_creation_step2')}{' '}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#89909a",
                fontSize: ThemeConstants.FONTSIZE_XS,
                width: "550px",
                height: "63px",
                margin: "10px 0px 0px 178px",
              }}>
              {t("menu_step2_details")}
            </Typography>
          </Box>
          <Box sx={{ margin: '0px 0px 0px 178px', objectFit: 'contain' }}>
            <img src={SSGuideline} width='500px' height='150px' />
          </Box>
        </Box>
      </Box>
    </>
  );
}
