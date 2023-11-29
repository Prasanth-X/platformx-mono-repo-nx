import { Box, Slide } from "@mui/material";
import { useState } from "react";
import MobileLeftSideMenu from "../mobileLeftSideMenu";
import Guideline from "./Guideline";
import MenuCreationFirstPage from "./MenuCreationFirstPage";

export default function NavMenuView({ handleSelectedType }) {
  const [openGuideline, setOpenGuideline] = useState(false);
  const [openFirstPage, setOpenFirstPage] = useState(false);
  const [editData, setEditData] = useState({});
  const [clickConfirm, setClickConfirm] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          width: { xs: "100%", md: "0%", lg: "0%", sm: "0%" },
        }}>
        <MobileLeftSideMenu
          handleSelectedType={handleSelectedType}
          setOpenGuideline={setOpenGuideline}
          setOpenFirstPage={setOpenFirstPage}
          openFirstPage={openFirstPage}
          setEditData={setEditData}
          clickConfirm={clickConfirm}
        />
        <Slide direction="right" in={openGuideline} timeout={300}>
          <Box
            sx={{
              backgroundColor: "#fff",
              zIndex: 100,
              position: "fixed",
              width: "100%",
              height: "100%",
              top: 0,
            }}>
            <Guideline setOpenGuideline={setOpenGuideline} />
          </Box>
        </Slide>
        {openFirstPage &&
          <Slide direction="right" in={openFirstPage} timeout={300}>
            <Box
              sx={{
                backgroundColor: "#fff",
                zIndex: 100,
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
              }}>
              <MenuCreationFirstPage
                setOpenFirstPage={setOpenFirstPage}
                editData={editData}
                clickConfirm={clickConfirm}
                setClickConfirm={setClickConfirm}
              />
            </Box>
          </Slide>}
      </Box>
    </>
  );
}
