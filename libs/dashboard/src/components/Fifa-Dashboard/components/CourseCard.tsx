import { Favorite } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { CalenderIcon, InsertIcon } from '@platformx/utilities';
interface Course {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  image: string;
  lessons: number;
  weeks: number;
}
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card
      sx={{
        minHeight: '454px',
        position: 'relative',
        display: 'block',
        cursor: 'pointer',
        minWidth: '23.9%',
        maxWidth: '100%',
        marginBottom: '5px',
      }}
    >
      <Box position='relative' sx={{ width: '100%' }}>
        <CardMedia
          component='img'
          height='200'
          image={course.image}
          alt={course.title}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            // color: '#3C91FF',
          }}
          aria-label='Add to favorites'
        >
          <Favorite />
        </IconButton>
      </Box>
      <CardContent>
        <CardActions style={{ padding: 0 }}>
          <Typography variant='h7bold'>
            <div style={{ display: 'flex' }}>
              {/* <img src={InsertIcon} alt='insert'/> */}
              <p style={{ marginLeft: '5px' }}>{course.lessons} Lessions</p>
            </div>
          </Typography>
          <Typography variant='h7bold'>
            <div style={{ display: 'flex' }}>
              {/* <img src={CalenderIcon} />{' '} */}
              <p style={{ marginLeft: '7px' }}>{course.weeks} Weeks</p>
            </div>
          </Typography>
        </CardActions>
        <CardActions style={{ padding: 0 }}>
          <Typography
            variant='h4bold'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
              wordBreak: 'break-all',
            }}
          >
            {course.title}
          </Typography>
        </CardActions>
        <CardActions style={{ borderBottom: '1px solid #D9DBE9', padding: '8px 0' }}>
          <Typography
            variant='h6regular'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
              wordBreak: 'break-all',
            }}
          >
            {course.description.replace(/(<([^>]+)>)/gi, '')}
          </Typography>
        </CardActions>
        <CardActions style={{ padding: '8px 0' }}>
          <Typography variant='h6medium'>{course.author}</Typography>
          <Typography variant='h6regular'> |</Typography>
          <Typography variant='h6regular'>
            {format(new Date(course.date), 'MMM d, yyyy')}
          </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
