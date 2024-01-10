import { CalendarTodayOutlined } from '@mui/icons-material'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { handleHtmlTags } from 'utils/helperFns'
import FallbackImage from '../../../assets/fallBackImage.png'
import { useCustomStyle } from './LearningCard.style'

const LearningCard = ({ viewCourse, item }: any) => {
  const classes = useCustomStyle()
  return (
    <Container
      className={`${classes.learningCardWrapper} grid_container learningCard`}
    >
      <Box className="CardMainWp">
        <Grid container>
          <Grid xs={12} md={4} lg={3}>
            <Box className="leftImgWrapper">
              <img src={item?.teaser_image || FallbackImage} alt="" />
            </Box>
          </Grid>
          <Grid xs={12} md={8} lg={9}>
            <Box className="RightContentWrapper">
              <Box className="topWrapper">
                <Typography variant="p2medium" mt={0}>
                  {item?.title}
                </Typography>
                <Typography
                  variant="p4regular"
                  className="learningCardDescription"
                >
                  {handleHtmlTags(item?.description)}
                </Typography>
              </Box>
              <Box className="bottomWrapper">
                <Box className="botLeftWp">
                  <Typography variant="p4regular">
                    Created by <strong>{item?.publisher}</strong>
                  </Typography>
                  <ul>
                    <li>
                      <CalendarTodayOutlined />
                      <Typography variant="p4semibold">
                        {item?.teaser}
                      </Typography>
                    </li>
                  </ul>
                </Box>
                <Box className="botRightWp">
                  <Button
                    variant="primaryButton2"
                    className="sm"
                    onClick={() => viewCourse(item)}
                  >
                    View Course
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default LearningCard
