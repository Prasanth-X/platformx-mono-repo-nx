import React from "react";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { AccountCircle } from "@mui/icons-material";
// import "./Sample.css";

const Sample = () => {
  const theme = useTheme();
  const [age, setAge] = React.useState("");

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <>
      <section style={{ marginTop: "10px", padding: "10px" }}>
        <Button variant="primaryButton" className="">
          primaryButton
        </Button>
        <Button variant="secondaryButton" className="">
          secondaryButton
        </Button>
        <Button
          variant="textButton"
          className=""
          endIcon={<ArrowRightAltIcon />}
        >
          textButton
        </Button>
        <div
          style={{
            width: "100%",
            background: "#000",
            padding: "5px",
            margin: "10px 0",
          }}
        >
          <Button variant="tertiaryButton" className="">
            tertiaryButton
          </Button>
        </div>
        <h2>Buttons</h2>
        <Button variant="quaternaryButton" className="sm">
          outline
        </Button>
        <Button variant="quaternaryButtonOutline" className="sm">
          outline
        </Button>
        <Button variant="warningButton" className="sm">
          warning
        </Button>
        <Button variant="warningButtonOutline" className="sm">
          warning
        </Button>
        <Button variant="errorButton" className="sm">
          error
        </Button>
        <Button variant="errorButtonOutline" className="sm">
          error
        </Button>
        <Button variant="successButton" className="sm">
          success
        </Button>
        <Button variant="successButtonOutline" className="sm">
          success
        </Button>
        <h4>Heading</h4>

        {/* <Typography variant="weblarge" color="primaryText">Plateform x</Typography> */}
        <Typography variant="h1largeregular">
          The future is in our hands to shape. H1largeregular
        </Typography>
        <Typography variant="h1regular">
          The future is in our hands to shape. H1regular
        </Typography>
        <Typography variant="h2regular">
          The future is in our hands to shape. H2regular
        </Typography>
        <Typography variant="h3regular">
          The future is in our hands to shape. H3regular
        </Typography>
        <Typography variant="h4regular">
          The future is in our hands to shape. H4regular
        </Typography>
        <Typography variant="h5regular">
          The future is in our hands to shape. H5regular
        </Typography>
        <Typography variant="h6regular">
          The future is in our hands to shape. H6regular
        </Typography>
        <Typography variant="h7regular">
          The future is in our hands to shape. H7regular
        </Typography>

        <Typography variant="h1largeregular" color="primaryText">
          The future is in our hands to shape. H1largeregular
        </Typography>
        <Typography variant="h1regular" color="secondaryText">
          The future is in our hands to shape. H1regular
        </Typography>
        <Typography variant="h2regular" color="successText">
          The future is in our hands to shape. H2regular
        </Typography>
        <Typography variant="h3regular" color="warningText">
          The future is in our hands to shape. H3regular
        </Typography>
        <Typography variant="h4regular" color="errorText">
          The future is in our hands to shape. H3regular
        </Typography>
        <Typography variant="h5regular" color="linkText">
          The future is in our hands to shape. H3regular
        </Typography>

        <h2>Paragraph and heading variants</h2>
        <Typography variant="p1regular">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </Typography>
        <Typography variant="p2regular">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </Typography>
        <Typography variant="p3regular">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </Typography>
        <Typography variant="p4regular">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters
        </Typography>

        <Typography variant="p3regular" color="primaryText">
          primaryText
        </Typography>
        <Typography variant="p1bold" color="secondaryText">
          secondaryText
        </Typography>
        <Typography variant="p1medium" color="errorText">
          errorText
        </Typography>
        <Typography variant="h4bold" color="warningText">
          warningText
        </Typography>
        <Typography variant="h4regular" color="secondaryText">
          successText
        </Typography>
        <Typography
          variant="h2regular"
          color="successText"
          sx={{ color: theme.palette.errorColor[950] }}
        >
          override text success to error
        </Typography>

        <h2>TextBox</h2>
        <Grid container>
          <h5>variant: filled and standard </h5>
          <Grid container gap={1}>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="primary iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="primary iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="primary iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="primary iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <h5>variant: filled and standard success state</h5>
          <Grid container gap={1}>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error..."
                className="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="success iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="success iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="success"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="success iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="success iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <h5>variant: filled and standard error state</h5>
          <Grid container gap={1}>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="error"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="error iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="filled"
                helperText="Example Input Message for success or error"
                className="error iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="error"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="error iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Input Label"
                variant="standard"
                helperText="Example Input Message for success or error"
                className="error iconLeft"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="textfield-icon-left">
                        <AccountCircle />
                      </span>
                      <CloseIcon className="textfield-close-icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <h5>variant: Selectbox filled and standard error state</h5>
          <Grid container gap={1}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="simple-select-standard-label">Age</InputLabel>
              <Select
                labelId="simple-select-standard-label"
                id="simple-select-standard"
                IconComponent={ExpandMoreOutlinedIcon}
                value={age}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="simple-select-filled-label">Age</InputLabel>
              <Select
                labelId="simple-select-filled-label"
                id="simple-select-filled"
                IconComponent={ExpandMoreOutlinedIcon}
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </section>

      {/* <WebsiteIntroduction/>
      <ProductSummaryViaImage/>
      <ProductSummaryViaVideoDemo/>
      <Sponsor/>
      <ArticleDetail />
      <ContactUs/> */}
      {/* <WebsiteIntroduction2 /> */}
      {/* <dynamicTweets /> */}
      {/* <SignBoard/> */}
      {/* <Testimonial/> */}
      {/* <ServiceCards/> */}
      {/* <ProductSummaryViaVideo2/>
      <ServiceShowcase/>
      <ImageAndVideoGallery/>
      <ProductSummaryViaImage2/>
      <ExpertiseShowcase/>
      <FullWidthImage/>
      <FullWidthVideo/>
      <ImageCrousel1/>
      <Banner1/>
      <Description/>
      <Banner2/>
      <Banner3 />
      <FullWidthText/>
      <ImageCards/>
      <VideoBanner1/> */}
      {/* <FullWidthTextWithImage/> */}
      {/* <ServiceCard1/>
      <ServiceCard2/>
      <ServiceCard3/>
      <FeatureBox1/>
      <FeatureBox2/>
      <ServiceCard3 />
      <ServiceCard5 />
      <Services1 />
      <Services2 />
      <Gallery1 />
        <LivestreamFeed />
      <MultiSlot />
      <VideoBanner2 />
      <Gallery2 />
      <ServiceCard6 />
      <AboutUs2 />
      <FAQ1 />
      <Awards1 />
      <DynamicPrelem />
      <ImageVideoCarousel1 />
      <ParagraphWithHeadlineAndCTA />
      <AboutUsThree />
      <ParagraphWithHeadline />
      <Banner4 />
      <LeftAlignParagraphWithHeadline />
      <WebsiteSummaryWithSubHeading />
      <WebsiteSummaryWithSubHeading2 />
      <ProductSummary3 /> */}
      {/* <Statistics /> */}
      {/* <AboutUsFourWithSubHeading />
      <TeamMembers />
      <EcomProduct />
      <FeatureTiles />
      <ServiceShowcase2 />
      <ServiceCard7/>
      <CounterNumberShowcase/>
      <ContentDisplayWithCategories />
      <CustomerTestimonial2 />
      <BlogTiles/>
      <MultiSlot2 />
      <Banner5 />*/}
      {/* <DynamicEcommercePrelem />  */}
    </>
  );
};
export default Sample;
