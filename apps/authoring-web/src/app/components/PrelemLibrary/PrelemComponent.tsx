import { Box } from "@mui/material";
import { PrelemTheme, ToastContainerHandle } from "@platformx/utilities";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { unstable_ClassNameGenerator } from "@mui/material/utils";
import {
  // AnimationOnPageScroll,
  ArticleDetail,
  Banner7,
  // ContactUsForm,
  CoreHighlights,
  FullWidthBanner3,
  ImageAndVideoGallery,
  InfoBox,
  ProductSummaryViaImage,
  ProductSummaryViaImage2,
  ProductSummaryViaVideo2,
  Quote,
  ServiceCard,
  ServiceShowcase,
  Sponsor,
  Testimonial,
  WebsiteIntroduction,
  WebsiteIntroduction2,
  WebsiteIntroduction4,
} from "@platformx/x-prelem-library";
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
          {/* <ContactUsForm /> */}
          {/* <AboutUs2 />
          <FullWidthBanner3 />
          <WebsiteIntroduction4 />
          <InfoBox /> */}
          <Banner7 />
          {/* <CoreHighlights />
          <WebsiteIntroduction2 />
          <ArticleDetail />
          <Quote />
          <Sponsor />
          <ProductSummaryViaImage />
          <WebsiteIntroduction />
          <Testimonial />
          <ProductSummaryViaVideo2 />
          <ServiceCard /> */}
          <ServiceShowcase />
          <ImageAndVideoGallery />
          <ProductSummaryViaImage2 />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default PrelemComponent;
