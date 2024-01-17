import { Box } from "@mui/material";
import {PrelemTheme, ToastContainerHandle} from "@platformx/utilities";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import { ProductSummaryViaImage, Quote, Sponsor, WebsiteIntroduction } from "@platformx/x-prelem-library";
// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

function PrelemComponent() {
  return (
    <div className='App'>
      <ToastContainerHandle />
      <ThemeProvider theme={PrelemTheme}>
        <Box sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}>
          <CssBaseline />
          <Quote />
          <Sponsor />  
          <ProductSummaryViaImage />     
          <WebsiteIntroduction />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default PrelemComponent;