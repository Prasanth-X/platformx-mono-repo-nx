import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CachedIcon from "@mui/icons-material/Cached";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ThemeConstants from "../../theme/variable";

export const AddThumbnail = ({ url, onUploadClick, handleChange, type }) => {
const { t }= useTranslation();
  return (
    <Box>
      <Box sx={{ display: 'none' }}>
        <TextField
          variant='outlined'
          name='thumbnailURL'
          value={url || ''}
          // onChange={handleChange('thumbnailURL')}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      {url ?
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "100%", md: "80%" },
            height: "91%", borderRadius: "4px",
          }}
          mb={2}
        >
          <img
            src={url}
            style={{ width: "100%", height: "206px", objectFit: "cover", borderRadius: "4px", }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '0',
              width: '100%',
              height: '97%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#7470708a',
              borderRadius: '4px',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => onUploadClick(type)}
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
                  {t('replace')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
       :
        <Box
          sx={{
            borderRadius: '5px',
            border: 'dashed 2px #707070',
            paddingLeft: {
              xs: '22px',
              sm: '30px',
              md: '55px',
              lg: '55px',
              xl: '55px',
            },
            cursor: 'pointer',
            height: '205px',
            backgroundColor: '#f5f6f8',
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: '100%', md: '80%' },
          }}
          onClick={() => onUploadClick(type)}
        >
          <Box
            sx={{
              borderRadius: '50%',
              backgroundColor: '#000',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            mr={2}
          >
            <ArrowUpwardIcon style={{ color: '#fff' }} />
          </Box>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              color: ThemeConstants.PRIMARY_MAIN_COLOR,
            }}
          >
            <Typography
              variant="h5medium"
              component="h5"
              sx={{ color: "#000000", textTransform: 'capitalize' }}
            >
              {t('event_thumbnail_placeholder')}
            </Typography>
          </Box>
        </Box>}
    </Box>
  );
};
