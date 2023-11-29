import * as React from "react";
import Box from "@mui/material/Box";
import "./TabDocument.css";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Container, Typography } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import DOMPurify from "isomorphic-dompurify";
import { useTranslation } from "react-i18next";
import { useCustomStyle } from "./TabDocument.style";
import "../../../../service/i18n";

const TabDocument = (_props: any = {}) => {
  const classes = useCustomStyle();
  const { productFullDetails = {} } = _props;
  const [value, setValue] = React.useState("1");
  const { t } = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box
      className={`product-detail-tab-wrapper ${classes.productDetailTabWrapper} full-row-tabcontainer`}>
      <TabContext value={value}>
        <Container className='grid_container'>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label='Product details tab'
              className='product-detail-tabs'>
              <Tab label={t("description")} value='1' className={`product-detail-tab-item`} />
              <Tab
                label={t("additional_inforamtion")}
                value='2'
                className='product-detail-tab-item'
              />
              <Tab label={`${t("review")} (0)`} value='3' className='product-detail-tab-item' />
            </TabList>
          </Box>
        </Container>
        <Box className='tab-detail-wrapper'>
          <Container className='grid_container prelem-py'>
            <TabPanel value='1' className='tab-detail'>
              <Typography
                variant='p3regular'
                color='tertiaryParagraph'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(productFullDetails?.ecomx_desc || ""),
                }}></Typography>
            </TabPanel>
            <TabPanel value='2' className='tab-detail'>
              <Typography variant='p3regular' color='tertiaryParagraph'>
                {t("no_additional_information")}
              </Typography>
            </TabPanel>
            <TabPanel value='3' className='tab-detail'>
              <Typography variant='p3regular' color='tertiaryParagraph'>
                {t("no_reviews")}
              </Typography>
            </TabPanel>
          </Container>
        </Box>
      </TabContext>
    </Box>
  );
};

export default TabDocument;
