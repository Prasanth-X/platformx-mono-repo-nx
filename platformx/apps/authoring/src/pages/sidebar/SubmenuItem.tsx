import { Box, Typography } from "@mui/material";
import { MenuBox } from "./sidebar.style";
const SubmenuItem = ({
  index,
  defaultPageState,
  chevronArray,
  url,
  name,
  handleClick,
}) => {
  return (
    <MenuBox key={index}>
      <Box
        className={chevronArray.includes(defaultPageState) ? "activeLink" : ""}
        onClick={() => handleClick(url)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "0 0 20px 0",
          cursor: "pointer",
          "&:hover svg, &:hover span": { color: "#5256b8" },
        }}>
        {/* <icon
          sx={{ fontSize: "17px", color: "#2d2d39", marginRight: "15px" }}
        /> */}
        <Typography variant="h6regular" sx={{ textTransform: "capitalize" }}>
          {name}
        </Typography>
      </Box>
    </MenuBox>
  );
};

export default SubmenuItem;
