import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ThemeConstants from "../../../theme/variable";
import { LayoutList } from "../utils/prelemTypes";

const getColumns = (width) => {
  if (width < ThemeConstants.MD) {
    return 2;
  } else if (width < ThemeConstants.LG) {
    return 3;
  } else {
    return 4;
  }
};

export const PrelemLayouts = ({
  layoutList,
  handleLayoutFilter,
  searchValue,
  categoryState,
}: LayoutList) => {
  const navigate = useNavigate();
  const maxLimit = 4;
  const [limit, setLimit] = useState(maxLimit);
  const [index, setIndex] = useState({ prevIndex: 0, nextIndex: limit });
  const [columns, setColumns] = useState(getColumns(window.innerWidth));
  const updateDimensions = () => {
    setColumns(getColumns(window.innerWidth));
    setLimit(getColumns(window.innerWidth));
    setIndex({ prevIndex: 0, nextIndex: limit });
  };

  const getPreviousLayouts = () => {
    setIndex((prevState) => {
      return {
        prevIndex: prevState.prevIndex - limit,
        nextIndex: prevState.nextIndex - limit,
      };
    });
  };
  const getNextLayouts = () => {
    setIndex((prevState) => {
      return {
        prevIndex: prevState.prevIndex + limit,
        nextIndex: prevState.nextIndex + limit,
      };
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: { xs: "0px 15px", lg: "10px 50px" },
      }}
      data-testid="layout-wrapper">
      <Box
        sx={{
          width: "5%",
          marginRight: "10px",
          display: { xs: "none", md: "block" },
        }}>
        {index.prevIndex != 0 &&
          <Box
            onClick={getPreviousLayouts}
            sx={{
              width: { xs: "30px", md: "50px" },
              height: { xs: "30px", md: "50px" },
              borderRadius: "7px",
              border: "solid 1px #2d2d39",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            data-testid="prev-button">
            <ChevronLeftIcon
              sx={{ fontSize: ThemeConstants.FONTSIZE_XL, color: "#2d2d39" }}
            />
          </Box>}
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
        }}>
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)",
            alignItems: "center",
            width: { xs: "calc(100vw - 20px)", lg: "60%" },
            textAlign: { xs: "left", lg: "left" },
            overflowX: { xs: "scroll", md: "inherit" },
            whiteSpace: { xs: "nowrap", md: "inherit" },
          }}>
          {layoutList.map((layout, key) => {
            return (
              <ImageListItem
                key={key}
                sx={{
                  backgroundColor: `${
                    layout?.selectedValue
                      ? ThemeConstants.PRIMARY_MAIN_COLOR
                      : ""
                  }`,
                  padding: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  ".Platform-x-ImageListItem-img": {
                    maxHeight: "100%",
                    objectFit: "fill",
                  },
                  height: {
                    xs: "82px !important",
                    md: "100px !important",
                    lg: "130px !important",
                  },
                }}
                onClick={() => handleLayoutFilter(layout?.mapping, layout?.id)}
                data-testid="layout-image-item">
                <img
                  src={`${layout.thumbnail}`}
                  srcSet={`${layout.thumbnail}`}
                  alt={`${layout.thumbnail}`}
                  loading="lazy"
                />
              </ImageListItem>
            );
          })}
          <Button
            variant="outlined"
            sx={{
              padding: {
                xs: "10px 5px 10px 10px",
                lg: "10px 0 10px 12px",
                md: "10px 0 10px 12px",
              },
            }}
            style={{
              width: "100px",
              height: "30px",
              minWidth: "100px",
              paddingLeft: "22px",
            }}
            onClick={() => {
              navigate("/layouts", {
                state: {
                  searchValue: searchValue,
                  categoryState: categoryState,
                },
              });
            }}>
            View All
            <ChevronRightIcon
              sx={{
                fontSize: ThemeConstants.FONTSIZE_XL,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                width: "25px",
                height: "25px",
              }}
            />
          </Button>
        </ImageList>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "100%",
        }}>
        <ImageList
          sx={{
            height: {
              xs: "82px",
              md: "100px",
              lg: "130px",
            },
            gap: { xs: "10px !important", lg: "20px !important" },
          }}
          cols={columns}
          data-testid="layout-image-list">
          {layoutList
            .slice(index.prevIndex, index.nextIndex)
            .map((layout, key) =>
              (<ImageListItem
                key={key}
                sx={{
                  backgroundColor: `${
                    layout?.selectedValue
                      ? ThemeConstants.PRIMARY_MAIN_COLOR
                      : ""
                  }`,
                  padding: "10px",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  ".Platform-x-ImageListItem-img": {
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "fill",
                  },
                  height: {
                    xs: "82px !important",
                    md: "100px !important",
                    lg: "130px !important",
                  },
                }}
                onClick={() => handleLayoutFilter(layout?.mapping, layout?.id)}
                data-testid="layout-image-item">
                <img
                  src={`${layout.thumbnail}`}
                  srcSet={`${layout.thumbnail}`}
                  alt={`${layout.thumbnail}`}
                  loading="lazy"
                />
              </ImageListItem>)
            )}
        </ImageList>
      </Box>
      {index.nextIndex <= layoutList.length &&
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            onClick={getNextLayouts}
            sx={{
              width: { xs: "30px", md: "42px" },
              height: { xs: "30px", md: "42px" },
              borderRadius: "7px",
              border: `solid 1px ${ThemeConstants.PRIMARY_MAIN_COLOR}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            data-testid="next-button">
            <ChevronRightIcon
              sx={{ fontSize: ThemeConstants.FONTSIZE_XL, color: "#2d2d39" }}
            />
          </Box>
        </Box>}
      {layoutList.length > limit && index.nextIndex >= layoutList.length &&
        <Box sx={{ width: "10%", marginLeft: "10px" }}>
          <Button
            variant="outlined"
            sx={{ padding: { lg: "10px 0 10px 12px", md: "10px 0 10px 12px" } }}
            onClick={() => {
              navigate("/layouts", {
                state: {
                  searchValue: searchValue,
                  categoryState: categoryState,
                },
              });
            }}>
            View All
            <ChevronRightIcon
              sx={{
                fontSize: ThemeConstants.FONTSIZE_XL,
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                width: "25px",
                height: "25px",
              }}
            />
          </Button>
        </Box>}
    </Box>
  );
};
