import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import { PrelemTheme, ToastContainerHandle } from "@platformx/utilities";
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
          {/* <AnimationOnPageScroll /> */}
          {/* <Banner6 />
          <DynamicPrelemWithCarousel1 />
          <DynamicPrelemWithCarousel2 />
          <AboutUsThree />
          <AboutUs2 />
          <FullWidthBanner3 />
          <WebsiteIntroduction4 />
          <InfoBox />
          <Banner7 />
          <CoreHighlights />
          <WebsiteIntroduction2 />
          <ArticleDetail />
          <Quote />
          <Sponsor />
          <ProductSummaryViaImage />
          <WebsiteIntroduction />
          <Testimonial />
          <ProductSummaryViaVideo2 />
          <ServiceCard />
          <ServiceShowcase />
          <ImageAndVideoGallery />
          <ProductSummaryViaImage2 />
          <FullWidthImage />
          <FullWidthVideo />
          <Banner1 />
          <Banner3 />
          <Description />
          <FullWidthText />
          <ImageCarousel /> */}
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default PrelemComponent;
