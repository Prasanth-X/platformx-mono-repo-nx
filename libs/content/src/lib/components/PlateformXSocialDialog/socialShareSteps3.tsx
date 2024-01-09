import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Box, Grid, TextField } from '@mui/material';
import { avtarImg } from '@platformx/utilities';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getSHareDetailsBasedOnContentType } from './utils/socialShareTypes';
import {
  convertToLowerCase,
  getSubDomain,
  nullToObject,
  relativeImageURL,
} from '@platformx/utilities';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { XLoader } from '@platformx/utilities';

const SocialShareStep3 = ({
  selectedItems,
  captionText,
  isSchedulePost,
  scheduleDateVal,
  selectedNetwork,
  contentType,
  facebookProfileData,
  loading,
}: any) => {
  const { CurrentPageURL = '' } = nullToObject(selectedItems);

  let isInSelected = false;
  const { t, i18n } = useTranslation();
  if (!selectedNetwork.fb && selectedNetwork.in) {
    isInSelected = true;
  } else {
    isInSelected = false;
  }

  const [selectLinkedIn, setSelectLinkedIn] = React.useState(isInSelected);
  const [selectFacebook, setSelectFacebook] = React.useState(true);
  const [sharedContentDetailsLoader, setSharedContentDetailsLoader] =
    React.useState(false);
  const [sharedContentDetails, setSharedContentDetails] = React.useState<any>(
    {}
  );
  const { description, title = '', thumbnail = '' } = sharedContentDetails;

  const [, setValue] = React.useState<Dayjs | null>(dayjs());

  function removeHttp(url: string) {
    return url.replace(/(^\w+:|^)\/\//, '');
  }
  const handelNetworkSelect = (network: string) => {
    if (network === 'fb') {
      setSelectLinkedIn(false);
      setSelectFacebook(true);
    }
    if (network === 'in') {
      setSelectFacebook(false);
      setSelectLinkedIn(true);
    }
  };

  const redirectURL =
    contentType == 'article'
      ? `${getSubDomain()}/${i18n.language}/${convertToLowerCase(
        contentType
      )}/${selectedItems?.CurrentPageURL}`
      : `${getSubDomain()}/${i18n.language}/${convertToLowerCase(contentType)}${selectedItems?.CurrentPageURL
      }`;

  const inlineCss = `
  .Platform-x-CardContent-root:last-child{
    paddingBottom:10px !important;
  }
  @media screen and (min-width: 320px){
    .Platform-x-CardHeader-title {
      max-width: 190px;
    }
  }
  @media screen and (min-width: 768px){
    .Platform-x-CardHeader-title {
      max-width: 227px;
    }
  }
  @media screen and (min-width: 1024px){
    .Platform-x-CardHeader-title {
      max-width: 355px;
    }
  }
  .Platform-x-CardHeader-title {
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    }
  a {
      text-decoration: none;
      color: #000;
  }
  .socialDesc {
    display: -webkit-box;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    word-wrap: break-word;
  }
 `;

  /**
   * passing contentType and page url
   * get publish data
   */
  const getContentTypeInformation = async () => {
    const newObj = {
      ContentType: contentType,
      CurrentPageURL: CurrentPageURL,
    };

    setSharedContentDetailsLoader(true); //loader off
    const response = await getSHareDetailsBasedOnContentType(newObj);
    if (response) {
      setSharedContentDetails(response);
    } else {
      setSharedContentDetails({});
    }
    setSharedContentDetailsLoader(false); //loader off
  };

  React.useEffect(() => {
    if (contentType) {
      getContentTypeInformation();
    }
  }, [contentType]);

  return (
    <Box>
      <style>{inlineCss}</style>
      <Grid>
        {(loading || sharedContentDetailsLoader) && <XLoader type="circular" />}
        {/* <Grid item xs={6}></Grid> */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              textAlign: 'center',
              // padding: { xs: '15px 0px 0px 0px', md: '0px' },
              width: { xs: '100%', md: '100%', xl: '100%' },
              // margin: {
              //   xs: '0px 23px 20px 45px',
              //   md: '0px',
              //   em: '0px 0px 0px 50px',
              // },
              // position: { xs: 'static', md: 'relative' },
              // top: '-25px',
            }}
          >
            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
              {selectedNetwork.fb ? (
                <Box
                  sx={{
                    // marginRight: '25px',
                    padding: '12px 18px 12px 18px',
                    color: selectFacebook ? '#000' : '#89909a',
                    backgroundColor: selectFacebook ? '#f5f6f8' : '#fff',
                    // cursor: 'pointer',
                  }}
                  onClick={() => handelNetworkSelect('fb')}
                >
                  {t('facebook')}
                </Box>
              ) : null}
              {selectedNetwork.in ? (
                <Box
                  sx={{
                    padding: '12px 23px 11px 18px',
                    color: selectLinkedIn ? '#000' : '#89909a',
                    cursor: 'pointer',
                    backgroundColor: selectLinkedIn ? '#f5f6f8' : '#fff',
                  }}
                  onClick={() => handelNetworkSelect('in')}
                >
                  {t('linkedin')}
                </Box>
              ) : null}
            </Box>

            <Box className="social-share-box">
              <Card
                sx={{
                  // maxWidth: 445,
                  marginTop: { xs: '5px', md: '0' },
                  Width: '100%',
                }}
              >
                <CardHeader
                  sx={{ padding: '10px 12px' }}
                  avatar={
                    <Avatar
                      alt="Platform-X"
                      src={
                        facebookProfileData &&
                          selectedNetwork?.fb &&
                          selectFacebook
                          ? facebookProfileData.picture
                          : avtarImg
                      }
                      sx={{ width: 36, height: 36 }}
                    />
                  }
                  title={
                    facebookProfileData && selectedNetwork?.fb && selectFacebook
                      ? facebookProfileData.name
                      : 'platform-X'
                  }
                  subheader=""
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxHeight: '44px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textAlign: 'left',
                    padding: '0px 10px 10px ',
                    wordBreak: 'break-word',
                  }}
                >
                  {captionText}
                </Typography>
                <a
                  target="_blank"
                  href={
                    selectedItems?.postURL
                      ? selectedItems?.postURL
                      : redirectURL
                  }
                  rel="noreferrer"
                >
                  {thumbnail ? (
                    <CardMedia
                      component="img"
                      height="194"
                      image={relativeImageURL(thumbnail)}
                      alt={title}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: '194PX',
                      }}
                    ></Box>
                  )}
                </a>
                <a
                  target="_blank"
                  href={
                    selectedItems?.postURL
                      ? selectedItems?.postURL
                      : redirectURL
                  }
                  rel="noreferrer"
                >
                  <CardContent
                    sx={{
                      padding: '10px',
                      textAlign: 'left',
                      backgroundColor: '#f5f6f8',
                      paddingBottom: '12px !important',
                    }}
                  >
                    {selectFacebook && !selectLinkedIn ? (
                      <Box
                        sx={{ textTransform: 'uppercase', color: '#89909a' }}
                      >
                        <Typography variant="h7regular">
                          {removeHttp(getSubDomain())}
                        </Typography>
                      </Box>
                    ) : null}
                    <Box>
                      <Typography variant="h5bold">{title}</Typography>
                    </Box>

                    <Box sx={{ color: '#89909a' }}>
                      <Typography
                        variant="h7regular"
                        sx={{ WebkitLineClamp: 2 }}
                        className="socialDesc"
                      >
                        {description}
                      </Typography>
                    </Box>
                  </CardContent>
                </a>
              </Card>
              <Box sx={{ paddingTop: '10px', paddingRight: '5px' }}>
                {isSchedulePost ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      disabled
                      inputFormat="MM/DD/YYYY | H:mm a"
                      renderInput={(params) => <TextField {...params} />}
                      value={scheduleDateVal}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                ) : (
                  ''
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SocialShareStep3;
