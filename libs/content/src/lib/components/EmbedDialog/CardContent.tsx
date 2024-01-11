import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
// import { EmbedDesktopTabCard } from '@platformx/utilities';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSubDomain, SkeltonLoader } from '@platformx/utilities';

const CardContent = ({ selectedItem, contentType }: any) => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = React.useState(0);
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setICopyStatus(false);
  };

  const pageURL =
    `${getSubDomain()}/${i18n.language}/` +
    `embed/${contentType}/${selectedItem?.Page}`;
  const landingPageURL = `${getSubDomain()}/${i18n.language}/${contentType}/${selectedItem?.Page
    }`;

  const content = {
    Title: selectedItem?.Title,
    Description: selectedItem?.Description,
    Thumbnail: selectedItem?.Thumbnail,
    Author: selectedItem?.Author,
    creationDate: selectedItem?.lastModifiedDate,
    Page: pageURL,
    LandingPage: landingPageURL,
    colorCode: selectedItem?.colorCode,
  };
  const mobileEmbededCode = `
 <iframe src="${content?.Page}" width="360" height="203" style="border:none;overflow:hidden"></iframe>
`;
  const desktopEmbededCode = `
 <iframe src="${content?.Page}" width="480" height="270" style="border:none;overflow:hidden"></iframe>
`;
  const copyEmbededCode = (code: any) => {
    navigator.clipboard.writeText(code);
    setICopyStatus(true);
  };

  return (
    <Box
      sx={{
        overflowY: 'auto',
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          em={7}
          sx={{
            background: '#f5f6f8',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '100%', lg: '100%' },
              padding: {
                xs: '56px 10px 0px 10px',
                md: '65px 0px',
                //lg: '20px',
              },
              display:
                selectedItem && selectedItem?.Thumbnail ? 'flex' : 'block',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ marginLeft: '70px !important' }}>
              <SkeltonLoader maxWidth={480} maxHeight={500} />
            </Box>
            {/* TODO: Fix this */}
            {/* {selectedItem && selectedItem?.Thumbnail ? (
              <EmbedDesktopTabCard content={content} />
            ) : (
              <Box sx={{ marginLeft: '70px !important' }}>
                <SkeltonLoader maxWidth={480} maxHeight={500} />
              </Box>
            )} */}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          em={5}
          sx={{
            padding: {
              xs: '30px 10px 0px 10px',
              sm: '30px 20px 0px 20px',
              md: '35px 25px',
              lg: '45px 20px',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              padding: {
                xs: '20px 0 0 0',
                md: '0',
                //lg: '20px 0px 0 0',
              },
              width: { xs: '360px', sm: '480px' },
            }}
          >
            {selectedItem && selectedItem?.Thumbnail ? (
              <>
                <Box
                  sx={{
                    marginBottom: { md: '25px', lg: '0' },
                    padding: { xs: '0 0 10px 0', md: '0' },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3bold"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {t('embed_title')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h7regular" sx={{ color: '#89909a' }}>
                      {t('embed_subtitle')}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: { lg: '295px', xl: '225px' },
                    //height: 'auto',
                    overflowY: 'auto',
                    borderRadius: '5px',
                    border: 'solid 1px #ced3d9',
                    flexGrow: ' 0',
                    margin: { lg: '18px 0 34px' },
                    padding: '16px 20px 24px 25px',
                    overflowWrap: 'break-word',
                    display: { xs: 'block', md: 'none' },
                    fontFamily: 'Roboto Mono',
                    wordBreak: 'break-word',
                  }}
                >
                  {mobileEmbededCode}
                </Box>
                <Box
                  sx={{
                    height: { md: '215px', lg: '215px' },
                    //height: 'auto',
                    overflowY: 'auto',
                    borderRadius: '5px',
                    border: 'solid 1px #ced3d9',
                    flexGrow: ' 0',
                    margin: { md: '18px 0' },
                    padding: '16px 20px 24px 25px',
                    overflowWrap: 'break-word',
                    display: { xs: 'none', md: 'block' },
                    fontFamily: 'Roboto Mono',
                    wordBreak: 'break-word',
                  }}
                >
                  {desktopEmbededCode}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    paddingBottom: { xs: '25px', md: '25px', lg: '0' },
                  }}
                >
                  <Button
                    variant="primaryButton"
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                    }}
                    onClick={() => copyEmbededCode(desktopEmbededCode)}
                  >
                    {copyStatus ? t('copied') : t('copy_code')}
                  </Button>
                  <Button
                    variant="primaryButton"
                    sx={{
                      minWidth: { xs: '100%' },
                      display: { xs: 'flex', md: 'none' },
                      marginTop: '25px',
                    }}
                    onClick={() => copyEmbededCode(mobileEmbededCode)}
                  >
                    {copyStatus ? t('copied') : t('copy_code')}
                  </Button>
                </Box>
              </>
            ) : (
              <SkeltonLoader maxWidth={480} maxHeight={500} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CardContent;
