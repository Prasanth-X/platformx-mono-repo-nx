import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  Grid,
  LinearProgress,
} from "@mui/material";
import { tokens } from "./theme";
import { useTranslation } from "react-i18next";
import Title from "../../../components/Common/Title";
import useUserSession from "../../../hooks/useUserSession/useUserSession";
import { useStyles } from "../Dashboard.styles";
import { mockTransactions } from "./data/mockData";
import { mockProductdeatails } from "./data/mockData";
import { mockTopdeatails } from "./data/mockData";

import LineChart from "./components/LineChart";
import GeographyChart from "./components/GeographyChart";
import BarChart from "./components/BarChart";
import StatBox from "./components/StatBox";
import ProgressCircle from "./components/ProgressCircle";
import MuiPieChart from "./components/PieChart";
import mallicon from "../../../assets/local_mall.svg";
import group from "../../../assets/group.svg";
import grade from "../../../assets/grade.svg";
import editnewicon from "../../../assets/svg/editnewicon.svg"
import proudctimage from "../../../assets/svg/productimage.svg"
import arrowOutward from "../../../assets/arrow_outward.svg";
import RecentOrders from "./components/RecentOrders";
import { linearProgressClasses } from '@mui/material/LinearProgress';
import { margin, styled } from "@mui/system";
import EngagementChannel from "./components/EngagementChannel";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EcomDashboardProps { }

const EcomDashboard: React.FC<EcomDashboardProps> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <>
      <Box>
        <Box mt="30px">
          <Grid container spacing={3} sx={{ margin: '0' }}>
            {/* ROW 1 */}
            <Grid item xs={12} sm={6} md={6} lg={3} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#D7ECFD' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <StatBox
                  heading="Total Sale"
                  title={parseFloat("76987.26")}
                  subtitle="46.3%"
                  increase="+15.5k this week"
                  icon={mallicon}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#DEF5D9' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <StatBox
                  heading="Visitor"
                  title={parseInt("4456772")}
                  subtitle="34.3%"
                  increase="+11.5k this week"
                  icon={group}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#FFF2D9' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <StatBox
                  heading="Total Order"
                  title={parseFloat("4456")}
                  subtitle="23.3%"
                  increase="+13.5k this week"
                  icon={grade}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3} sx={{ paddingRight: '18px' }}>
              <Box
                sx={{ backgroundColor: '#EFF0F6' }}
                display="flex"
                alignItems="center"
                borderRadius="5px"
                justifyContent="center"
                height={150}
              >
                <StatBox
                  heading="Abandoned cart"
                  title={parseFloat("10.14")}
                  subtitle="33.3%"
                  increase="+21.5k this week"
                  icon={grade}
                />
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
                  <Box>
                    <Typography variant="h6regular">This Month</Typography>
                    <Typography variant="h4bold">$156477</Typography>
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  <LineChart isDashboard />
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
                  p="15px"
                >
                  <Typography variant="h5bold">
                    Best Selling Categories
                  </Typography>
                </Box>
                <Box>
                  {mockTransactions.map((transaction, i) =>
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ borderBottom: "1px solid #D9DBE9" }}
                      p="15px"

                    >
                      <Box>
                        <Typography variant="h6medium">
                          {transaction.txId}
                        </Typography>
                        <Typography variant="h7regular">
                          {transaction.user}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "#DEF5D9",
                          display: "flex",
                          alignItems: "center",
                          p: "5px 10px",
                          borderRadius: "4px",
                        }}
                      >
                        <img src={arrowOutward} alt="" />
                        <Typography variant="h6medium" sx={{ marginLeft: "5px" }}>
                          {transaction.cost}%
                        </Typography>
                      </Box>
                    </Box>
                  )}
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
                <Typography variant="h5bold">Product Status</Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <MuiPieChart />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={8} sx={{ paddingRight: "12px" }}>
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
                <Typography variant="h5bold"> Recent Orders </Typography>
                <Box sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  lineHeight: "18px",
                  fontSize: "12px",
                  marginTop: "-21px",

                }}>
                  <Typography variant="h5bold">See All</Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "5px 5px 0px 0px",
                    border: "1px solid #D9DBE9",
                    marginTop: "8px",
                    overflowX: "auto"
                  }}
                >
                  <RecentOrders />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={12} lg={4}
              sx={{
                overflow: "auto",
                mt: "25px",
                paddingRight: '12px'
              }}>
              <Box
                sx={{
                  backgroundColor: "#F7F7FC",
                  borderRadius: "5px",
                  border: "1px solid #EFF0F6",
                  height: "485px",
                  padding: "12px",
                  marginBottom: "5px"
                }}
              >
                <Typography variant="h5bold">Engagement per Channel</Typography>
                <EngagementChannel />
              </Box>
            </Grid>
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
                  height: "491px",
                  padding: "12px",
                }}
              >
                <Typography variant="h5bold">Abandoned cart</Typography>
                <Box sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  lineHeight: "18px",
                  fontSize: "12px",
                  marginTop: "-21px",

                }}>
                  <Typography variant="h5bold">See All</Typography>
                </Box>
                <Box>
                  {mockProductdeatails.map((transaction, i) =>
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ borderBottom: "1px solid #D9DBE9" }}
                      p="15px"

                    >
                      <Box>
                        <Typography variant="h6medium">
                          {transaction.txId}
                        </Typography>
                        <Typography variant="h7regular">
                          {transaction.user}
                        </Typography>
                      </Box>
                      <Button sx={{
                        borderRadius: '5px',
                        border: "1px solid #14142B",
                      }}>View Details</Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
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
                  height: "491px",
                  padding: "12px",
                }}
              >
                <Typography variant="h5bold">Products Need Correction</Typography>
                <Box sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  lineHeight: "18px",
                  fontSize: "12px",
                  marginTop: "-21px",

                }}>
                  <Typography variant="h5bold">See All</Typography>
                </Box>
                <Box>
                  {mockTopdeatails.map((transaction, i) =>
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ borderBottom: "1px solid #D9DBE9" }}
                      p="15px"

                    >
                      <Box sx={{
                        width: '51px',
                        height: '51px',
                        borderRadius: '5px',
                        border: "1px solid #EFF0F6",
                        backgroundColor: "#F7F7FC"
                      }}
                      >
                        <img src={proudctimage} alt="productimage" />
                      </Box>
                      <Box>

                        <Typography variant="h6medium">
                          {transaction.txId}
                        </Typography>
                        <Typography variant="h7regular">
                          {transaction.user}
                        </Typography>
                      </Box>
                      <img src={editnewicon} alt="editnewicon" />
                    </Box>
                  )}
                </Box>


              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default EcomDashboard;
