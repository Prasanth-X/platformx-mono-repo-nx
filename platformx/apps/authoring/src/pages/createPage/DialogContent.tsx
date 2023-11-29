import { TextField, Typography } from "@mui/material"
import DialogContent from "@mui/material/DialogContent"
import { Box } from "@mui/system"
import { t } from "i18next"
import LanguageDropDownCheckBox from "../../Common/LanguageDropDownCheckBox"
import ThemeConstants from "../../theme/variable"
import { nameLength } from "../editPage/utils/constants"
import { DialogContentProps } from "./CreatePage.types"

export const PageDialogContent=({language,setLanguage,isDuplicate,showPageUrlError,pageName,handlePgNameChange,showPageNameError,handleUrlChange,pageUrl}:DialogContentProps)=>{
    return<>    <DialogContent sx={{ padding: { xs: "20px 14px", md: "20px 24px" } }}>
    <Box sx={{ padding: { xs: "0px", md: "25px 25px 0px 25px" } }}>
      <Typography
        variant="h5"
        sx={{
          fontSize: {
            xs: ThemeConstants.FONTSIZE_DEFAULT,
            xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
          },
        }}
      >
        {t("page_title_label")}
      </Typography>
      <TextField
        autoFocus
        value={pageName}
        placeholder={t("page_title_placeholer")}
        margin="dense"
        id="name"
        type="text"
        onChange={(e) => handlePgNameChange(e)}
        fullWidth
        variant="standard"
        autoComplete="off"
        inputProps={{ maxLength: nameLength }}
        sx={{
          ".Platform-x-Input-root:after": {
            borderBottom: "1px solid " + ThemeConstants.BLACK_COLOR,
          },
        }}
      />
      {showPageNameError &&
        <p style={{ color: "red" }}>Page name cant be blank!</p>
      }
      <Typography
        variant="h5"
        mt={4}
        sx={{
          fontSize: {
            xs: ThemeConstants.FONTSIZE_DEFAULT,
            xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
          },
        }}
      >
        {t("page_url_label")}
      </Typography>
      <TextField
        margin="dense"
        id="name"
        type="text"
        placeholder={t("page_url_placeholder")}
        onChange={(e) => handleUrlChange(e)}
        value={pageUrl}
        fullWidth
        variant="standard"
        autoComplete="off"
        sx={{
          ".Platform-x-Input-root:after": {
            borderBottom: "1px solid " + ThemeConstants.BLACK_COLOR,
          },
        }}
      />
      {showPageUrlError &&
        <p style={{ color: "red" }}>Page URL cant be blank!</p>
      }
      {isDuplicate && (
        <>
          <Typography
            variant="h5"
            mt={4}
            sx={{
              fontSize: {
                xs: ThemeConstants.FONTSIZE_DEFAULT,
                xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
              },
            }}
          >
            {t("page_language_label")}
          </Typography>
          <LanguageDropDownCheckBox
            language={language}
            setLanguage={setLanguage}
          />
        </>
      )}
    </Box>
  </DialogContent></>
}