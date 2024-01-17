import { Box } from "@mui/material";
import PrelemTheme from "./theme/prelemTheme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import React from "react";
import "./App.css";
import ToastContainerHandle from "./Common/ToastContainer/ToastContainerHandle";
// import ProductDetail from "./components/Ecommerce/ProductDetail/ProductDetail";
// import CustomerTestimonial2 from "./components/CustomerTestimonial2/CustomerTestimonial2";
// import AboutUsFourWithSubHeading from "./components/AboutUsFourWithSubHeading/AboutUsFourWithSubHeading";
// import DynamicPrelem from "./components/DynamicPrelem/DynamicPrelem";
// import DynamicPrelemWithCarousel1 from "./components/DynamicPrelemWithCarousel1/DynamicPrelemWithCarousel1";
// import DynamicPrelemWithCarousel2 from "./components/DynamicPrelemWithCarousel2/DynamicPrelemWithCarousel2";
// import ProductSummary3 from "components/ProductSummary3/ProductSummary3";
import WebsiteIntroduction from "components/WebsiteIntroduction/WebsiteIntroduction";
// call this function at the root of the application
unstable_ClassNameGenerator.configure((componentName) =>
  componentName.replace("Mui", "Platform-x-"),
);

function App() {
  return (
    <div className='App'>
      <ToastContainerHandle />
      <ThemeProvider theme={PrelemTheme}>
        <Box sx={{ margin: (themeOptions) => themeOptions.prelemMargin.value }}>
          <CssBaseline />
          {/* <ProductSummary3 />
          <DynamicPrelemWithCarousel1 />
          <DynamicPrelemWithCarousel2 /> */}
          <WebsiteIntroduction />
          {/* <CustomerTestimonial2 />
          <AboutUsFourWithSubHeading />
          <DynamicPrelem /> */}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
