import CachedIcon from "@mui/icons-material/Cached";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import UploadIcon from "../../assets/images/icons/upload.svg";
interface ImageProps {
  url?: any;
  onUploadClick?: any;
  handleChange?: any;
  type?: any;
  title?: any;
  subtitle?: any;
}
export const AddImageNew = ({
  url,
  onUploadClick,
  handleChange,
  type,
  title,
  subtitle,
}: ImageProps) => {
  const { t } = useTranslation();
  return (
    <Box //sx={{ marginTop: '30px' }}
    >
      <Box sx={{ display: "none" }}>
        <TextField
          variant="outlined"
          value={url || ""}
          // onChange={handleChange('imagevideoURL')}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      {url ?
        <Box
          sx={{
            position: "relative", //height: "91%"
            borderRadius: "10px",
          }}
          mb={2}
        >
          <img
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={url}

            //   controls
          />
          <Box
            sx={{
              position: "absolute",
              top: "0",
              width: "100%",
              height: "97%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#7470708a",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => onUploadClick(type)}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                  }}
                >
                  <CachedIcon sx={{ color: "#626060" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
       :
        <>
          <Box></Box>
          <Box
            sx={{
              borderRadius: "10px",
              border: "dashed 2px #89909a",
              cursor: "pointer",
              height: "160px",
              backgroundColor: "#F3FAFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => onUploadClick(type)}
          >
            <Box
              sx={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={UploadIcon} />
            </Box>
          </Box>
        </>}
    </Box>
  );
};
