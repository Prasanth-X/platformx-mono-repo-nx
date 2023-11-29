import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, Dialog, DialogTitle, Slide } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { nullToObject } from "../../utils/helperFunctions";
import SocialShareFilter from "./CommonFilter";

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommonMobileFilter = (props: any = {}) => {
  const { t } = useTranslation();
  const {
    arrayData = [],
    filterValue = "",
    handleChange,
  } = nullToObject(props);

  const [openFilter, setOpenFilter] = useState(false);

  const handleClickOpen = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Box>
        <FilterAltIcon
          onClick={handleClickOpen}
          fontSize="medium"
          sx={{ verticalAlign: "middle", color: "#2d2d39" }}
        />
        <Dialog
          sx={{
            display: { sm: "none" },
            ".Platform-x-Dialog-paper": {
              boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
              borderRadius: "10px 10px 0 0",
              margin: 0,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            },
          }}
          open={openFilter}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseFilter}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle sx={{ textTransform: "capitalize" }}>
            {t("filter_update")}
          </DialogTitle>
          <Box
            sx={{
              margin: "0 0 20px 0",
              ".form_Control": {
                width: "100%",
                ".form_Control_radio": {
                  display: "none",
                  "& + span": {
                    fontSize: "16px",
                  },
                },
                label: {
                  margin: "0 !important",
                  padding: "5px 20px",
                  "&:has(> span.Mui-checked)": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    fontWeight: "500",
                  },
                },
              },
            }}>
            <SocialShareFilter
              arrayData={arrayData}
              filterValue={filterValue}
              handleChange={handleChange}
              handleCloseFilter={handleCloseFilter}
            />
          </Box>
        </Dialog>
      </Box>
    </>
  );
};
export default React.memo(CommonMobileFilter);
