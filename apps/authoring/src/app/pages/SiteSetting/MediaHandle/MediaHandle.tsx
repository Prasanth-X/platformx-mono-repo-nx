import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { Fragment, useEffect, useRef, useState } from 'react';
import Loader from '../../../Common/Loader';
import BasicSwitch from '../../editPage/Switch';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate } from 'react-router-dom';
import PictureIcon from '../../../assets/PictureIcon.svg';
import PlateformXDialog from '../../../components/Modal';
// import PlateformXSnackbar from '../../../components/toastNotification/toastNotification';

import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import {
  fetchMediaHandle,
  publishMediaHanle,
  updateMediaHanle,
} from '../../../services/SiteSetting/SiteSetting.api';
import { postRequest } from '../../../services/config/request';
import Gallery from '../../Gallery/Gallery';
import CookieTextBox from '../CookieSetting/CookieTextBox';
import SiteTopBar from '../SiteTopBar/SiteTopBar';
import { userMediaHanleStyle } from './MediaHandle.style';

const MediaHandle = () => {
  // const [isNotificationToast, setIsNotificationToast] =
  //   useState<boolean>(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  //const selectedImage = useRef<object>({});
  const currentMediaHandleIndex = useRef<number | null>(null);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState('');
  const toastMessage = useRef(null);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [isLoading, setIsLoading] = useState(false);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  // const onCloseSaveHandler = () => {
  //   setIsNotificationToast(false);
  //   setIsSuccessPopup(false);
  // };
  const initForm = (list) =>
    list.map((item) => ({
      ...item,
      value: JSON.parse(item.enable),
      name: item.media_name,
      errorMessage: '',
    }));
  const [form, setForm] = useState([]);

  const handleSelectedImage = async (image, keyName) => {
    try {
      const payload = {
        bitstreamId: image.bitStreamId,
        visibility: 'public',
      };
      const response = await postRequest(
        'api/v1/assets/image/no-crop',
        payload
      );
      //const relativeUrl= response?.original_image_relative_path + '.' + response?.ext
      const relativeUrl = `${response?.original_image_relative_path}.${response?.ext}`;
      const cloneForm = [...form];
      cloneForm[currentMediaHandleIndex.current].icon_image = relativeUrl;
      setForm([...cloneForm]);
    } catch (error) {
      showToastError(t('api_error_toast'));
    }
  };

  const toggleGallery = (toggleState) => {
    setGalleryState(toggleState);
  };
  const crossButtonHandle = () => {
    //setIsNotificationToast(false);
    setIsSuccessPopup(false);
  };
  const navigate = useNavigate();
  const switchChange = (controlName) => {
    const control = form.find((control) => control.name === controlName);
    if (!control) return;
    control.value = !control.value;
    setForm([...form]);
    if (control.value) {
      toastMessage.current = `${controlName
        .charAt(0)
        .toUpperCase()}${controlName.slice(1)} updated successfully!`;
      //setIsNotificationToast(true);
      showToastSuccess(t(toastMessage.current));
    }
  };

  const fetchMediaHandleData = async () => {
    const { authoring_getMediaHandle: { mediahandle = [] } = {} } =
      await fetchMediaHandle({ pagePath: 'social-media-item' });
    const formData = initForm(mediahandle);
    setForm(formData);
  };

  const publishmediaHandle = () => {
    const input = {
      input: {
        page: 'social-media-item',
        status: 'publish',
        is_schedule: false,
        schedule_date_time: '',
      },
    };
    publishMediaHanle(input)
      .then((response) => {
        toastMessage.current = 'media_settings_success';
        setIsSuccessPopup(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const onSave = () => {
    setIsLoading(true);
    const formValue = form.map((control) => ({
      enable: control.value,
      icon_image: control.icon_image,
      media_name: control.name,
      media_url: control.media_url,
    }));
    const param = {
      input: {
        CommonFields: {
          page: 'social-media-item',
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: '',
        },
        ObjectFields: {
          tagname: 'Media-Handle',
          mediahandle: formValue,
        },
      },
    };
    updateMediaHanle(param)
      .then(() => {
        setIsLoading(false);
        publishmediaHandle();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };

  const handleTextChange = (event, fieldName) => {
    const updateControl = form.find((control) => control.name === fieldName);
    if (updateControl) {
      updateControl.media_url = event.target.value;
      setForm([...form]);
    }
  };
  useEffect(() => {
    fetchMediaHandleData();
  }, []);

  const classes = userMediaHanleStyle();

  return (
    <>
      <Box className={classes.pageContainer}>
        <SiteTopBar
          returnBack={() => {
            navigate('/dashboard');
          }}
          siteLabel={t('media_handle')}
          iconList={[]}
          onSaveClick={onSave}
        />

        <Grid container className={classes.contentContainer}>
          {isLoading && <Loader />}
          {form.map((control, index) => (
            <Fragment key={`control${index + 1}`}>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                sx={{
                  marginTop: index > 0 ? { xs: '37.5px', sm: '32px' } : '0',
                }}
                className={classes.left}
              >
                <Box className={classes.switchBox}>
                  <BasicSwitch
                    color="black"
                    bgcolor="#A0A3BD"
                    onChange={() => switchChange(control.name)}
                    checked={control.value}
                  />
                </Box>
                <Box className={classes.mediaTitle}>
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {control.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                sx={{
                  marginTop:
                    index > 0
                      ? { xs: '17.5px', sm: '32px', md: '32px', lg: '32px' }
                      : '0',
                }}
                className={classes.right}
              >
                <Box
                  className={classes.pictureBox}
                  onClick={() => {
                    toggleGallery(true);
                    currentMediaHandleIndex.current = index;
                  }}
                >
                  {control.icon_image ? (
                    <img
                      src={
                        process.env.NX_GCP_URL +
                        '/' +
                        process.env.NX_BUCKET_NAME +
                        '/' +
                        control.icon_image
                      }
                      alt="icon"
                      width={'100%'}
                      height={'100%'}
                    />
                  ) : (
                    <img src={PictureIcon} />
                  )}
                </Box>
                <Box className={classes.textBox}>
                  <CookieTextBox
                    name="title"
                    state={control.media_url}
                    handleChange={(event) =>
                      handleTextChange(event, control.name)
                    }
                  />
                </Box>
              </Grid>
            </Fragment>
          ))}
          {isSuccessPopup && (
            <PlateformXDialog
              isDialogOpen={isSuccessPopup}
              title={t('congratulations')}
              subTitle={`${t('media_settings_success')}`}
              confirmButtonText={t('go_to_dashboard')}
              confirmButtonHandle={() => navigate('/dashboard')}
              modalType="publish"
              crossButtonHandle={crossButtonHandle}
              closeButtonHandle={crossButtonHandle}
              closeIcon={<CreateRoundedIcon />}
            />
          )}
        </Grid>
      </Box>
      {galleryState && (
        <Box className={classes.galleryBox}>
          <Gallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            galleryMode={galleryType.current}
            keyName={key}
          />
        </Box>
      )}
    </>
  );
};

export default MediaHandle;
