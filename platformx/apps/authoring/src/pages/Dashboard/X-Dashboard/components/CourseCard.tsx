import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import InsertIcon from '../../../../assets/inserticon.svg'
import CalenderIcon from '../../../../assets/calendericon.svg'
import HeartlmsIcon from '../../../../assets/hearticon.svg'

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
    <Card sx={{minHeight: '570px'}}>
      <Box position="relative" sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="300"
          image={course.image}
          alt={course.title}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            // color: '#3C91FF',
          }}
          aria-label="Add to favorites"
        >
          <img src={HeartlmsIcon} />
        </IconButton>
      </Box>
       <CardContent>
       <CardActions>
        <Typography  variant="h7bold">
          <div style={{display: "flex"}}>
        <img src={InsertIcon} /><p style={{marginLeft: "5px"}}>{course.lessons}  Lessions</p> 
        </div>
        </Typography>
        <Typography variant="h7bold">
        <div style={{display: "flex"}}>
       <img src={CalenderIcon} /> <p style={{marginLeft: "7px"}}>{course.weeks} Weeks</p>
       </div>
        </Typography>
        </CardActions>
        <CardActions>
        <Typography variant="h3bold" >
        {course.title}
        </Typography>
        </CardActions>
        <CardActions style={{borderBottom: '1px solid #D9DBE9'}}>
        <Typography variant="h6regular">
          {course.description}
        </Typography>
        </CardActions>
        <CardActions>
        <Typography variant="h6medium">
           {course.author}
        </Typography>
        <Typography variant="h6regular">  |
        </Typography>
        <Typography variant="h6regular">
            {course.date}
        </Typography>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CourseCard;