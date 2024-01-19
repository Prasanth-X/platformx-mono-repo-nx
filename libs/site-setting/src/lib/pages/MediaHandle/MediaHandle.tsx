/* eslint-disable no-shadow */
import React, { Fragment, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import {
  BasicSwitch,
  TextBox,
  ShowToastSuccess,
  useUserSession,
  PlateformXDialog,
  Loader,
  PictureIcon,
} from "@platformx/utilities";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { fetchMediaHandle, publishMediaHanle, updateMediaHanle } from "@platformx/authoring-apis";
import { Divider } from "@mui/material";
import { userMediaHanleStyle } from "./MediaHandle.style";

export const MediaHandle: React.FC = () => {
  const [isSuccessPopup, setIsSuccessPopup] = useState<boolean>(false);
  const galleryType = useRef<string>("Images");
  const currentMediaHandleIndex = useRef<number | null>(null);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const toastMessage = useRef<string | null>(null);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [isLoading, setIsLoading] = useState(false);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  interface FormItem {
    name: string;
    value: boolean;
    icon_image: string;
    media_url: string;
    errorMessage: string;
    enable: string;
  }

  const initForm = (list: FormItem[]) =>
    (list || []).map((item) => ({
      ...item,
      value: JSON.parse(item.enable),
      errorMessage: "",
    }));
  const [form, setForm] = useState<FormItem[]>([]);

  const toggleGallery = (toggleState: boolean) => {
    setGalleryState(toggleState);
  };

  const crossButtonHandle = () => {
    setIsSuccessPopup(false);
  };

  const navigate = useNavigate();

  const switchChange = (controlName: string) => {
    const control = form.find((control) => control?.name === controlName);
    if (!control) return;
    control.value = !control.value;
    setForm([...form]);
    if (control.value) {
      toastMessage.current = `${controlName.charAt(0).toUpperCase()}${controlName.slice(
        1,
      )} updated successfully!`;
      ShowToastSuccess(t(toastMessage.current));
    }
  };

  const fetchMediaHandleData = async () => {
    try {
      // const { authoring_getMediaHandle: { mediahandle = [] } = {} } = await fetchMediaHandle({
      //   pagePath: "social-media-item",
      // });

      // const formData = initForm(mediahandle);
      // setForm(formData);
      const { authoring_getMediaHandle: { mediahandle = [] } = {} } = await fetchMediaHandle({
        pagePath: "social-media-item",
      });
      const formData = initForm(mediahandle || []);
      setForm(formData);
    } catch (error) {
      // Handle errors
    }
  };

  const publishmediaHandle = () => {
    const input = {
      input: {
        page: "social-media-item",
        status: "publish",
        is_schedule: false,
        schedule_date_time: "",
      },
    };
    publishMediaHanle(input)
      .then((response) => {
        toastMessage.current = "media_settings_success";
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
          page: "social-media-item",
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: "",
        },
        ObjectFields: {
          tagname: "Media-Handle",
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

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
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
      {!galleryState && (
        <Box className={classes.pageContainer}>
          <Divider />

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
                    marginTop: index > 0 ? { xs: "37.5px", sm: "32px" } : "0",
                  }}
                  className={classes.left}>
                  <Box className={classes.switchBox}>
                    <BasicSwitch
                      color='black'
                      bgcolor='#A0A3BD'
                      onChange={() => switchChange(control.name)}
                      checked={control.value}
                    />
                  </Box>
                  <Box className={classes.mediaTitle}>
                    <Typography sx={{ textTransform: "capitalize" }}>{control.name}</Typography>
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
                      index > 0 ? { xs: "17.5px", sm: "32px", md: "32px", lg: "32px" } : "0",
                  }}
                  className={classes.right}>
                  <Box
                    className={classes.pictureBox}
                    onClick={() => {
                      toggleGallery(true);
                      currentMediaHandleIndex.current = index;
                    }}>
                    {control.icon_image ? (
                      <img
                        src={`${process.env.NX_GCP_URL}/${process.env.NX_BUCKET_NAME}/${control.icon_image}`}
                        alt='icon'
                        width={"100%"}
                        height={"100%"}
                      />
                    ) : (
                      <img src={PictureIcon} alt='icon' width={"100%"} height={"100%"} />
                    )}
                  </Box>
                  <Box className={classes.textBox}>
                    <TextBox
                      name='title'
                      state={control?.media_url}
                      handleChange={(event) => handleTextChange(event, control?.name)}
                    />
                  </Box>
                </Grid>
              </Fragment>
            ))}
            {isSuccessPopup && (
              <PlateformXDialog
                isDialogOpen={isSuccessPopup}
                title={t("congratulations")}
                subTitle={`${t("media_settings_success")}`}
                confirmButtonText={t("go_to_dashboard")}
                confirmButtonHandle={() => navigate("/dashboard")}
                modalType='publish'
                crossButtonHandle={crossButtonHandle}
                closeButtonHandle={crossButtonHandle}
                closeIcon={<CreateRoundedIcon />}
              />
            )}
          </Grid>
        </Box>
      )}
      {galleryState && (
        <Box className={classes.galleryBox}>
          {/* <DamContentGallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            assetType={galleryType.current === "Images" ? "Image" : "Video"}
            keyName={key}
          /> */}
        </Box>
      )}
    </>
  );
};

//export default MediaHandle;
