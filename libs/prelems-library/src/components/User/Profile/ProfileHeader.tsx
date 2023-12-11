import React from "react";
import "service/i18n";
import { AVATAR } from "assets/header";
import { useTranslation } from "react-i18next";
import { Avatar, Box, Button, Typography } from "@mui/material";
// import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

type ProfileHeaderProps = {
  isDisabled?: boolean;
  userDetails?: any;
  editProfile?: (e?: any) => void;
  saveProfile?: (e?: any) => void;
};

const ProfileHeader = (_props: ProfileHeaderProps) => {
  const {
    userDetails = {},
    isDisabled = false,
    editProfile = () => {},
    saveProfile = () => {},
  } = _props;
  const { t } = useTranslation();
  const { first_name = "", last_name = "" } = userDetails;
  const userName = first_name + " " + last_name;

  return (
    <>
      <Box className='profileHeader'>
        <Box className='profileImageWrapper'>
          {/* {!isDisabled && (
            <Box className='uploadIcon'>
              <FileUploadOutlinedIcon></FileUploadOutlinedIcon>
            </Box>
          )} */}
          <Avatar className='avtarImg' alt='Remy Sharp' src={AVATAR} />
        </Box>
        <Box className='profileDetailWrapper'>
          <Box className='profileDetail'>
            <>
              <Typography variant='p3semibold' color='tertiaryParagraph' className='marginZero'>
                {userName}
              </Typography>
            </>
          </Box>
          <Box className='profileActionButton'>
            {isDisabled ? (
              <Button variant='tertiaryButton2' className='actionButton' onClick={editProfile}>
                {t("edit")}
              </Button>
            ) : (
              <Button variant='tertiaryButton2' className='actionButton' onClick={saveProfile}>
                {t("save")}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileHeader;
