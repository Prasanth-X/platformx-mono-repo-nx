import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import LanguageIcon from '@mui/icons-material/Language';
import { Box } from "@mui/system";
interface Course {
  name: string;
  number: number;
  progress: number;
}
const TopCourses: React.FC = () => {
  const courses: Course[] = [
    { name: "Course 1", number: 166, progress: 80 },
    { name: "Course 2", number: 2666, progress: 60 },
    { name: "Course 3", number: 33434, progress: 90 },
    { name: "Course 4", number: 455, progress: 75 },
    { name: "Course 5", number: 566, progress: 50 },
    { name: "Course 6", number: 666, progress: 70 }
  ];
  return (
    <Box sx={{width: '100%'}}>
      {courses.map((course) => (
        <Box key={course.number} sx={{marginBottom: '20px'}}>
          <Box style={{ display: "flex", alignItems: "center"}}>
            <Box sx={{
               display: 'flex',
               width: '44px',
               height: '44px',
               borderRadius: '5px',
               border: '1px solid #D9DBE9',
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: '#fff',
               marginBottom: '5px'
            }}><LanguageIcon style={{ marginLeft: "2px" }} /></Box>
            <Box>
            <Box style={{ display: "flex", justifyContent: 'space-between', marginLeft: '8px' }}>
            <Box>{course.name}</Box>
            <Box>{course.number}</Box>
            </Box>
            <LinearProgress
            variant="determinate"
            value={course.progress}
             sx={{
                  width: "300px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  borderRadius: "5px", // Make the progress bar rectangular
                  height: "10px", // Increase the height of the progress bar
                    "& .Platform-x-LinearProgress-bar":{
                      backgroundColor:"#3C91FF",
                  },
                  backgroundColor: "#EFF0F6",
                  '& .MuiLinearProgress-bar': {
                      backgroundColor: 'green'
                  }
                }}
          />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TopCourses;
