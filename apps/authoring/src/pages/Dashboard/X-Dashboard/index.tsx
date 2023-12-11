import { useState } from "react";
import { Box, Typography} from '@mui/material';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LanguageIcon from '@mui/icons-material/Language';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import BookLms from '../../../assets/booklms.svg';
import WebsiteDashboard from "./websiteDashboard";
import EcomDashboard from "./ecomDashboard";
import RewardDashboard from "./rewardDashboard";
// import { tokens } from "./theme";
import { useTranslation } from 'react-i18next';
import Title from '../../../components/Common/Title';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import { useStyles } from '../Dashboard.styles';
import { styled } from "@mui/system";
import LmsDashboard from "./lmsDashboard";
 
const StyledTabs = styled(Tabs)({
    gridTemplateColumns: "repeat(12, 1fr)",
  });
  
  const StyledTab = styled(Tab)(({ theme }) => ({
    display: "flex",
    height: "50px",
    textTransform: "capitalize",
    minHeight: "50px",
    minWidth: '200px',
    maxWidth: "100%",
    padding: "12px 20px",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: "1 0 0",
    borderRadius: "5px",
    background: "#EFF0F7",
    color: theme.palette.text.primary,
    "& .MuiTab-labelIcon": {
      minHeight: "unset",
      marginTop: 0,
      marginRight: "8px",
    },
    "& .MuiTab-wrapper": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "6px",
    },
    "&.Mui-selected": {
      background: "#FFF",
    },
    "& .Platform-x-Tab-iconWrapper": {
       marginRight: "10px",
      },
  }));

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className={classes.container}>
        <Box>
          <Title
            titleVarient='h1bold'
            titleColor='#4B9EF9'
            padding='0'
            title={t('greets_x')}
          />
        </Box>
        <Box>
          <Title titleVarient='h1bold' padding='0' title={userInfo?.name} />
        </Box>
        <Box sx={{marginTop: '10px', marginBottom: '24px'}}>
            <Typography>You have 3 new task and 1 overdue task which has an urgency</Typography>
        </Box>
    <Box>
      <StyledTabs variant="scrollable" value={value} onChange={handleChange}>
        <StyledTab
          label="Website Dashboard"
          icon={<LanguageIcon />}
          disabled
        />
        <StyledTab
          label="E Commerce Dashboard"
          icon={<LocalMallIcon />}
        />
        <StyledTab
          label="Reward Dashboard"
          icon={<CardGiftcardIcon />}
          disabled
        />
         <StyledTab
          label="LMS Dashboard"
          icon={<img src={BookLms} />}
        />
      </StyledTabs>

      {/* Render content based on selected tab */}
      {value === 0 && <div><WebsiteDashboard /></div>}
      {value === 1 && <div><EcomDashboard /></div>}
      {value === 2 && <div><RewardDashboard /></div>}
      {value === 3 && <div><LmsDashboard /></div>}
    </Box>
      </Box>
    </>
  );
};

export default Index;
