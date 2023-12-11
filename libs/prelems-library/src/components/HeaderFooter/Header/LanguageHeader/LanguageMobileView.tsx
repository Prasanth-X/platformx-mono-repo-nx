import React from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import DoneIcon from "@mui/icons-material/Done";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, ListItemIcon, Typography } from "@mui/material";
import { getCurrentLang, getFlag } from "../../helperFunction";
import { useCustomStyle } from "./LanguageView.style";

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type LanguageMobileViewProps = {
  isOpen: boolean;
  handleClose: any;
  language: Array<any>;
  handleLanguageRedirect: any;
};
const LanguageMobileView = (_props: LanguageMobileViewProps) => {
  const classes = useCustomStyle();
  const {
    language = [],
    isOpen = false,
    handleClose = () => {},
    handleLanguageRedirect = () => {},
  } = _props;

  const { t } = useTranslation();

  return (
    <Dialog
      className={`languageMenu_class ${classes.languageViewWrapper1} languageViewWrapperMobile`}
      PaperProps={{
        className: "languageMobileView",
      }}
      sx={{
        display: { lg: "none", xs: "block" },
        ".Platform-x-Dialog-paper": {
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
          borderRadius: "10px 10px 0 0",
          width: "100%",
          maxWidth: "100%",
          margin: 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'>
      <DialogTitle>{t("choose_language")}</DialogTitle>
      {language.map((value, key) => {
        return (
          <Box
            onClick={() => handleLanguageRedirect(value?.code)}
            sx={{ display: "flex", p: "15px" }}
            key={key}>
            <Box className='headerFlagIcon'>
              <img src={getFlag(value.code)} width='24px' height='24px' alt='flag' />
            </Box>
            <Typography className='languageText'>{value?.text}</Typography>

            {value.code === getCurrentLang() ? (
              <ListItemIcon>
                <DoneIcon fontSize='small' className='gapLeftMobile' />
              </ListItemIcon>
            ) : null}
          </Box>
        );
      })}
    </Dialog>
  );
};

export default React.memo(LanguageMobileView);
