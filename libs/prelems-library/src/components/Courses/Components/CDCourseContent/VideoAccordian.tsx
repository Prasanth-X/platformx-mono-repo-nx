import * as React from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Grid, Typography, styled } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: "0 !important",
  marginBottom: "17px !important",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.prelemType3.BACKGROUND,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function VideoAccordian() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header' className="accoridanHeading">
          <Box className='toptitlebox'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Typography variant='p4regular'>Course Content 1</Typography>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  8 Lectures • 87 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Introduction</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Getting started with your</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Fitness Training</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>FIFA Referee Academy</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Language Courses</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Assessment </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  20 Questions
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header' className="accoridanHeading">
          <Box className='toptitlebox'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Typography variant='p4regular'>Course Content 2</Typography>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  8 Lectures • 87 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Fitness Training</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>FIFA Referee Academy</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Language Courses</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Assessment </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  20 Questions
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header' className="accoridanHeading">
          <Box className='toptitlebox'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Typography variant='p4regular'>Course Content 3</Typography>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  8 Lectures • 87 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Fitness Training</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>FIFA Referee Academy</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Language Courses</Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  10 mins
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box className='videoortime'>
            <Grid container>
              <Grid xs={12} md={8}>
                <Box className='texticonWp'>
                  <Box className='icon'>
                    <PlayCircleFilledIcon />
                  </Box>
                  <Typography variant='p4regular'>Assessment </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4} sx={{ textAlign: { xs: "left", md: "right" } }}>
                <Typography variant='p4regular' className='light'>
                  20 Questions
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
