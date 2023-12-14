import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import LanguageIcon from '@mui/icons-material/Language';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
interface Course {
  name: string;
  number: number;
  progress: number;
}
const TopCourses: React.FC = () => {
  const courses: Course[] = [
    { name: 'How To Analyze A Football Match', number: 166, progress: 80 },

    { name: 'Learn Ethical Hacking From Scratch', number: 2666, progress: 60 },

    {
      name: 'AWS Certified Cloud Practitioner - AWS Certification',
      number: 33434,
      progress: 90,
    },

    {
      name: 'Introduction To Football (soccer) Tactics',
      number: 455,
      progress: 75,
    },

    {
      name: 'Understand Football (soccer) Better With Phases Of Play',
      number: 566,
      progress: 50,
    },

    {
      name: 'Why Is Selecting The Right Niche Important In Affiliate Marketing?',
      number: 666,
      progress: 70,
    },
    {
      name: 'AWS Certified Cloud Practitioner - AWS Certification',
      number: 33434,
      progress: 90,
    },

    {
      name: 'Introduction To Football (soccer) Tactics',
      number: 455,
      progress: 75,
    },
  ];
  return (
    <Box sx={{ width: '100%' }}>
      {courses.map((course) => (
        <Box key={course.number} sx={{ marginBottom: '5px' }}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                width: '44px',
                height: '44px',
                borderRadius: '5px',
                border: '1px solid #D9DBE9',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                marginBottom: '5px',
              }}
            >
              <LanguageIcon style={{ marginLeft: '2px' }} />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginLeft: '8px',
                }}
              >
                <Typography variant="p4regular">{course.name}</Typography>
                <Typography variant="p4regular">{course.number}</Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={course.progress}
                sx={{
                  width: '98%',
                  marginTop: '5px',
                  marginLeft: '10px',
                  borderRadius: '5px', // Make the progress bar rectangular
                  height: '7px', // Increase the height of the progress bar
                  '& .Platform-x-LinearProgress-bar': {
                    backgroundColor: '#3C91FF',
                  },
                  backgroundColor: '#EFF0F6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'green',
                  },
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
