import { Box, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
// import TabCard from './TabCard';
// import MobileCard from './MobileCard';
// import DesktopCard from './DesktopCard';

import DesktopCard from 'platform-x-prelems/prelems/EmbedDesktopCard';
import MobileCard from 'platform-x-prelems/prelems/EmbedMobileCard';
import TabCard from 'platform-x-prelems/prelems/EmbedTabCard';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ModalContent = ({ selectedItem }) => {
  const [value, setValue] = React.useState(0);
  const { i18n } = useTranslation();
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setICopyStatus(false);
  };
  const pageURL =
    `${process.env.REACT_APP_PUBLISH_URI + i18n.language}/` +
    `embed/video/${selectedItem?.Page}`;

  const content = {
    Title: selectedItem?.Title,
    Description: selectedItem?.Description,
    Thumbnail: selectedItem?.Thumbnail,
    Author: selectedItem?.Author,
    creationDate: selectedItem?.lastModifiedDate,
    Page: pageURL,
  };
  const inlineCss = `
  .Platform-x-Tab-root{
    text-transform: capitalize;
    padding: 8px 25px 7px 21px;
  }
  .Platform-x-Tab-root.Mui-selected{
      border-radius: 5px;
      background-color: #e6eaed;
  }
 `;

  const embededCode0 = `
  <iframe src=${content?.Page} width="286" height="380" style="border:none;overflow:hidden"></iframe>
`;
  const embededCode1 = `
  <iframe src=${content?.Page} width="400" height="450" style="border:none;overflow:hidden"></iframe>
`;
  const embededCode2 = `
<iframe src=${content?.Page} width="560" height="540" style="border:none;overflow:hidden"></iframe>
`;
  //const currentEmbedeCode = {value == 0 ? embededCode0 : value == 1 ? embededCode1 : embededCode2};
  const copyEmbededCode = () => {
    navigator.clipboard.writeText(
      value == 0 ? embededCode0 : value == 1 ? embededCode1 : embededCode2
    );
    setICopyStatus(true);
  };

  return (
    <Box>
      <style>{inlineCss}</style>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            background: '#f5f6f8',
            paddingTop: '30px',
          }}
        >
          <Box>
            <Box
              sx={{
                width: '100%',
                padding: {
                  xs: '10px 18px 0px 42px',
                  md: '10px 18px 204px 42px',
                },
              }}
            >
              <Box
                sx={{
                  paddingLeft: { xs: '10px', md: '0px', lg: '0px' },
                  paddingTop: { xs: '30px', md: '0px' },
                  fontSize: { xs: '14px', md: '16px' },
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Small"
                    {...a11yProps(0)}
                    sx={{ minHeight: '26px', minWidth: '86px' }}
                  />
                  <Tab label="Medium" {...a11yProps(1)} />
                  <Tab label="Large" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <Box
                  sx={{
                    padding: {
                      xs: '24px 0px 24px 0px',
                      sm: '24px 0px 24px 0px',
                      md: '0px 0px 0px 36px',
                      lg: '0px 140px 0px 125px',
                    },
                  }}
                >
                  <MobileCard content={content} />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Box
                  sx={{
                    padding: {
                      xs: '0px 0px 0px 0px',
                      sm: '0px 0px 0px 0px',
                      md: '0px 0px 0px 0px',
                      lg: '0px 0px 0px 0px',
                    },
                  }}
                >
                  <TabCard content={content} />
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Box
                  sx={{
                    padding: {
                      xs: '0px 0px 0px 0px',
                      sm: '0px 0px 0px 0px',
                      md: '0px 0px 0px 0px',
                      lg: '0px 0px 0px 0px',
                    },
                  }}
                >
                  <DesktopCard content={content} />
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          <Box
            sx={{
              paddingRight: { xs: '0px', md: '0px', lg: '42px' },
              paddingTop: { xs: '20px', md: '130px' },
              paddingLeft: { xs: '20px', md: '0px' },
            }}
          >
            <Box>
              <Box>
                <Typography variant="h3medium">Social Embed link</Typography>
              </Box>
              <Box>
                <Typography variant="h7regular" sx={{ color: '#89909a' }}>
                  Embed this content type anywhere on the web
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: { md: '275px', xl: '225px' },
                borderRadius: '5px',
                border: 'solid 1px #ced3d9',
                flexGrow: ' 0',
                margin: { md: '18px 0 0px', lg: '18px 0 34px' },
                padding: '16px 20px 24px 25px',
                overflowWrap: 'break-word',
              }}
            >
              {value == 0
                ? embededCode0
                : value == 1
                ? embededCode1
                : embededCode2}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <Box
                sx={{
                  width: '134px',
                  height: '50px',
                  flexGrow: '0',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  margin: '34px 0 0 40px',
                  padding: '0 18px',
                  borderRadius: '4px',
                  background: '#2d2d39',
                  color: '#f5f6f8',
                  cursor: 'pointer',
                }}
                onClick={copyEmbededCode}
              >
                {copyStatus ? 'Copied' : 'Copy Code'}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ModalContent;
