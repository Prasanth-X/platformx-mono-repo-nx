import React from "react";
import {
  Box,
  Typography,
  Grid,
  Autocomplete,
  TextField,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import MuiPieChart from "./components/PieChart";
import RadicalChart from "./components/RadicalBar";
import AccountBalanceWallet from '../../../assets/account_balance_wallet.svg';
import grade from "../../../assets/grade.svg";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Book from '../../../assets/svg/ReadBook.svg';
import Progress from '../../../assets/Frame.svg';
import LmsStatBox from "./components/LmsStatBox";
import TopCourses from "./components/TopCourses";
import TopStudents from "./components/TopStudent";
import CourseCard from "./components/CourseCard";
import course1 from "../../../assets/course1.png";
import TotalrevIcon from "../../../assets/totalrev.svg";
import course2 from "../../../assets/course2.png";
import course3 from "../../../assets/course3.png";
import AllStudents from "./components/AllStudents";
import SalesChart from "./components/SalesChart";
import FilterlmsIcon from "../../../assets/filterlms.svg"

const courses = [
  {
    id: 1,
    title: "Basic Referee Training Course",
    author: "John Doe",
    date: "Oct 10, 2022",
    description: "Learn the basics of React and build your first application.",
    image: course1,
    lessons: 12,
    weeks: 4,
  },
  {
    id: 2,
    title: "Advanced Referee Training Course",
    author: "Jane Smith",
    date: "Nov 5, 2022",
    description: "Master the fundamentals of JavaScript programming language.",
    image: course2,
    lessons: 20,
    weeks: 6,
  },
  {
    id: 3,
    title: "Officiating at Local Matches Course",
    author: "Jane Smith",
    date: "Nov 5, 2022",
    description: "Master the fundamentals of JavaScript programming language.",
    image: course3,
    lessons: 20,
    weeks: 6,
  },
];

const weekend = [
  { label: 'week' },
  { label: 'Month' },
  { label: 'Year' }
]

const student = [
  { label: 'All' },

]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EcomDashboardProps { }

const LmsDashboard: React.FC<EcomDashboardProps> = () => {

  return (
    <>
      <Box>
        <Box mt="30px">
          <Grid container spacing={3} sx={{ margin: '0' }}>
            {/* ROW 1 */}
            <Grid item xs={12} sm={6} md={4} lg={4} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#D7ECFD' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <LmsStatBox
                  heading="Total Revenue"
                  subtitle="$10800"
                  increase="$108"
                  icon1={AccountBalanceWallet}
                  icon2={Progress}
                />
                <img style={{ position: "relative", marginTop: "-82px", right: "35px" }} src={TotalrevIcon} alt="total" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#DEF5D9' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <LmsStatBox
                  heading="Visitor"
                  subtitle="34.3%"
                  increase="106"
                  icon1={grade}
                  icon2={Progress}
                />
                <img style={{ position: "relative", marginTop: "-82px", right: "35px" }} src={TotalrevIcon} alt="total" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#FFF2D9' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <LmsStatBox
                  heading="Total Order"
                  subtitle="4335"
                  increase="78"
                  icon1={Book}
                  icon2={Book}
                />
                <img style={{ position: "relative", marginTop: "-82px", right: "35px" }} src={TotalrevIcon} alt="total" />
              </Box>
            </Grid>
          </Grid>


          {/* ROW 2 */}
          <Grid container spacing={3} sx={{ margin: '0' }}>
            <Grid item xs={12} md={12} lg={8} sx={{ paddingRight: '18px' }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: "415px",
                  marginTop: "24px",
                }}>
                <Box
                  mt="25px"
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5bold">
                    Sales and Enrolment
                  </Typography>
                  {/* Calendar icon */}
                  {/* Dropdown filters */}
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <img src={FilterlmsIcon} style={{
                        borderRadius: '5px',
                        height: '28px',
                        width: '28px'
                      }} />
                    </IconButton>
                    <Select sx={{
                      minWidth: '120px',
                      height: "28px"
                    }}

                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      label="Age"
                      defaultValue={10}
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <MenuItem value={10}>Week</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  {/* <LineChart isDashboard={true} /> */}
                  {/* <BarChart isDashboard={true} /> */}
                  <SalesChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4} sx={{ paddingRight: "12px" }}
            >
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: "419px",
                  marginTop: "23px",
                  overflow: "auto",
                }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p="14px"
                  mr="5px"
                >
                  <Typography variant="h5bold">
                    Active Courses
                  </Typography>

                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <img src={FilterlmsIcon} style={{ borderRadius: '5px', height: '28px', width: '28px' }} />
                    </IconButton>
                    <Select sx={{
                      minWidth: '120px',
                      height: "28px"
                    }}

                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      label="Age"
                      defaultValue={10}
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <MenuItem value={10}>Week</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <MuiPieChart />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ROW 3 */}
          <Grid container spacing={3} sx={{ margin: '0' }}>
            <Grid item xs={12} md={12} lg={4}
              sx={{
                overflow: "auto",
                mt: "25px",
                paddingRight: '12px'
              }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: "500px",
                  padding: "12px",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p="14px"
                  mr="5px"
                >
                  <Typography variant="h5bold">
                    Top Courses
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <img src={FilterlmsIcon} style={{ borderRadius: '5px', height: '28px', width: '28px' }} />
                    </IconButton>
                    <Select sx={{
                      minWidth: '120px',
                      height: "28px"
                    }}

                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      label="Age"
                      defaultValue={10}
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <MenuItem value={10}>Week</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  {/* <MuiPieChart /> */}
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <TopCourses />
                  {/* <MuiPieChart /> */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={4} sx={{ paddingRight: "12px" }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: "500px",
                  padding: "12px",
                  mt: "25px",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p="14px"
                  mr="5px"
                >

                  <Typography
                    variant="h5bold"
                  >
                    Top Cities
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <img src={FilterlmsIcon} style={{ borderRadius: '5px', height: '28px', width: '28px' }} />
                    </IconButton>
                    <Select sx={{
                      minWidth: '120px',
                      height: "28px"
                    }}

                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      label="Age"
                      defaultValue={10}
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <MenuItem value={10}>Week</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                  </Box>
                </Box>


                <Box>
                  <RadicalChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ paddingRight: "12px" }}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: { xs: "auto", md: "auto", lg: "500px" },
                  padding: "12px",
                  mt: "25px",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p="14px"
                  mr="5px"
                >
                  <Typography
                    variant="h5bold"
                  >
                    Top Student
                  </Typography>


                  <Select sx={{
                      minWidth: '120px',
                      height: "28px"
                    }}

                      labelId="simple-select-standard-label"
                      id="simple-select-standard"
                      label="Age"
                      defaultValue={10}
                    >
                      <MenuItem value="">
                      </MenuItem>
                      <MenuItem value={10}>All</MenuItem>
                      <MenuItem value={20}>rishabh.khurana@hcl.com</MenuItem>
                      <MenuItem value={30}>gkcl.k@hcl.com</MenuItem>
                    </Select>
                </Box>

                <Box sx={{ backgroundColor: '#fff', }}>
                  <TopStudents />
                </Box>
              </Box>
            </Grid>
          </Grid>
          {/* ROW 4 */}
          <Grid container spacing={3} sx={{ margin: '0' }}></Grid>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              border: "1px solid #EFF0F6",
              // height: "535px",
              marginTop: "23px",
              padding: "20px",
            }}
          >
            <Grid container spacing={3} sx={{ margin: '0' }}>
              <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                <Typography variant="h5bold">
                  All Courses
                </Typography>
              </Grid>
              {courses.map((course) => (
                <Grid item xs={12} md={12} lg={4} sx={{ paddingRight: "24px" }} key={course.id}>
                  <CourseCard key={course.id} course={course} />
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* ROW 5 */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "5px",
              border: "1px solid #EFF0F6",
              marginTop: "23px",
              padding: "20px",
            }}
          >
            <Grid container spacing={3} sx={{ margin: '0' }}>
              <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                <Typography variant="h5bold">
                  All Students
                </Typography>
              </Grid>
              <Grid item xs={12} md={12} lg={12} sx={{ paddingRight: "24px" }}>
                <Box sx={{ overflowX: "auto" }}>
                  <AllStudents />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LmsDashboard;
