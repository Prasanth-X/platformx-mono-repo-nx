import {
  Box,
  Grid
} from "@mui/material";
import AutoTextArea from "./AutoTextArea";
import TitleSubTitle from "./TitleSubTitle";

export const Description = ({
  state,
  handleChange,
  title,
  subtitle,
  maxlength,
  name,
}) => {
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Grid
        container
        rowSpacing={1}
        // columnSpacing={{ xs: 1, sm: 2, md: 2 }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          sx={{
            paddingRight: {
              xs: '10px',
              sm: '10px',
              md: '55px',
            },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TitleSubTitle
            title={title}
            subTitle={subtitle}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          <AutoTextArea
            name={name}
            placeHolder='Write your description here'
            handleChange={handleChange}
            maxCharLength={maxlength}
            state={state}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
