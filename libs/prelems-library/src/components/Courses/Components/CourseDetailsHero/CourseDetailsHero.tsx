import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LanguageIcon from '@mui/icons-material/Language'
import { Box, Container, Grid, Typography } from '@mui/material'
import { format } from 'date-fns'
import { handleHtmlTags } from 'utils/helperFns'
import '../../../../Style.css'
import RightCard from '../RightCard/RightCard'
import { useCustomStyle } from './CourseDetailsHero.style'

const CourseDetailsHero = ({ content, setIsCourseFrame }: any) => {
  const classes = useCustomStyle()
  return (
    <div className={`${classes.CourseDetailsHeroWrapper} CourseDetailsHero`}>
      <Container className="grid_container">
        <Grid container>
          <Grid xs={12} md={8} sx={{ paddingRight: { xs: 0, md: '45px' } }}>
            <Typography variant="h1bold">{content?.displayname}</Typography>
            <Typography variant="p3regular">
              {handleHtmlTags(content?.title)}
            </Typography>
            <Typography
              variant="labelregular"
              sx={{ textTransform: 'capitalize' }}
            >
              Created by{' '}
              <Typography variant="labelbold">
                {content?.authors} | 853 enrolled on this course
              </Typography>
            </Typography>
            <Box>
              <Box className="bottomBlackWrapper">
                <ul>
                  <li>
                    <LanguageIcon />
                    <Typography variant="labelregular">
                      {content?.mainlanguage}
                    </Typography>
                  </li>
                  <li>
                    <AccessTimeIcon />
                    <Typography variant="labelregular">
                      Published on{' '}
                      {content?.mainlanguage &&
                        format(
                          new Date(content?.published_date),
                          'LLL dd, yyyy',
                        )}
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={4} sx={{ position: 'relative' }}>
            <RightCard content={content} setIsCourseFrame={setIsCourseFrame} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default CourseDetailsHero
