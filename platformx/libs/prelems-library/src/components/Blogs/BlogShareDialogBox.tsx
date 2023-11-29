import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import ShareIcon from "@mui/icons-material/Share";
import { Menu, IconButton, Box } from "@mui/material";
import { errorRequest, linkCopy } from "../../Common/ConstantData";
import ToastService from "../../Common/ToastContainer/ToastService";
import { FacebookShareButton, LinkedinShareButton } from "react-share";
import IconCopySvg from "../../assets/svgIcon/Copy.svg";
import IconFacebookSvg from "../../assets/svgIcon/Facebook.svg";
import IconLinkedInSvg from "../../assets/svgIcon/LinkedIn.svg";

type blogShareDialogBoxType = {
  shareUrl: string;
};

const BlogShareDialogBox = (props: blogShareDialogBoxType) => {
  const { shareUrl = "" } = props;
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = async () => {
    if ("clipboard" in navigator && shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      ToastService.SuccessToast(t(linkCopy));
    } else {
      ToastService.failToast(t(errorRequest));
    }
    handleClose(); //close option popUp
  };

  return (
    <>
      <IconButton
        id='basic-button'
        size='large'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          paddingTop: "8px",
        }}>
        <ShareIcon
          sx={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
            verticalAlign: "middle",
          }}
        />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock={false}>
        <Box>
          <Box
            component='span'
            sx={{
              display: "block",
              marginTop: "5px",
              marginRight: "0.625rem",
              pl: 3,
              pr: 3,
            }}>
            {/* faceBook */}
            <FacebookShareButton url={shareUrl}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img alt='share1' src={IconFacebookSvg} />

                {/* text */}
                <Box component='span' sx={{ display: "block" }}>
                  <MenuItem
                    sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
                    onClick={handleClose}>
                    {"Facebook"}
                  </MenuItem>
                </Box>
              </Box>
            </FacebookShareButton>

            {/* linkedIn */}

            <Box>
              <LinkedinShareButton url={shareUrl}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <img alt='share1' src={IconLinkedInSvg} />

                  {/* text */}
                  <Box component='span' sx={{ display: "block" }}>
                    <MenuItem
                      sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
                      onClick={handleClose}>
                      {"LinkedIn"}
                    </MenuItem>
                  </Box>
                </Box>
              </LinkedinShareButton>
            </Box>

            {/* copyIcon */}
            <>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <img alt='share1' src={IconCopySvg} />

                {/* text */}
                <Box component='span' sx={{ display: "block" }}>
                  <MenuItem
                    sx={[{ "&:hover": { backgroundColor: "transparent" } }]}
                    onClick={handleCopy}>
                    {t("copy_Link")}
                  </MenuItem>
                </Box>
              </Box>
            </>
          </Box>
        </Box>
      </Menu>
    </>
  );
};
export default React.memo(BlogShareDialogBox);
