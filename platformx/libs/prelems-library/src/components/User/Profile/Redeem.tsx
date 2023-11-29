import React, { useState, useRef } from "react";
import { Box, Grid, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { ethers } from "ethers";
import { useTranslation } from "react-i18next";
import { errorRequest } from "Common/ConstantData";
import ToastService from "Common/ToastContainer/ToastService";
import StringOnBlurTextBox from "Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import "service/i18n";
import Confirmation from "components/Ecommerce/Common/Confirmation/Confirmation";
import GreenTick from "assets/userProfile/greenTick.png";
import { nullToObject } from "utils/helperFns";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`redeem-tabpanel-${index}`}
      aria-labelledby={`redeem-tab-${index}`}>
      <Box className={`redeemTabs ${value === index ? "blockItem" : "noneItem"}`}>{children}</Box>
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `redeem-tab-${index}`,
    "aria-controls": `redeem-tabpanel-${index}`,
  };
};

type RedeemProps = {
  secondaryArgs: any;
};

const Redeem = (props: RedeemProps) => {
  const { secondaryArgs = {} } = props;
  const { prelemBaseEndpoint: { loyaltyEndPoint = "", loyaltyPortalEndPoint = "" } = {} } =
    nullToObject(secondaryArgs);

  const { t } = useTranslation();
  const [itemValue, setItemValue] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const messageRef = useRef("");
  const [stateRedeem, setstateRedeem] = useState<any>({
    pointsToConvert: "",
    voucherValue: "",
  });
  const [stateToken, setStateToken] = useState<any>({
    pointsToConvertToken: "",
    tokenValue: "",
  });

  const getVoucherValue = (points: number, type: string) => {
    if (points) {
      const url = `${loyaltyPortalEndPoint}v1/reward/getRewardPoints?points=${points}`;
      axios
        .get(url)
        .then((res: any) => {
          const voucherValue = res?.data?.result || 0;
          // console.log('res', res);
          if (type === "voucher") {
            setstateRedeem((prevState: any) => ({
              ...prevState,
              voucherValue: voucherValue,
            }));
          } else if (type === "token") {
            setStateToken((prevVal: any) => ({
              ...prevVal,
              tokenValue: voucherValue,
            }));
          }
        })
        .catch(() => {});
    }
  };

  const handleInputChange = (event: any) => {
    event.preventDefault && event.preventDefault();
    const { name = "", value = "" } = event?.target || {};
    setstateRedeem({
      ...stateRedeem,
      [name]: value,
    });
    name === "pointsToConvert" && getVoucherValue(value, "voucher");
  };

  const convertToVoucher = (event: any) => {
    event.preventDefault && event.preventDefault();
    const userId = localStorage.getItem("userId");
    if (userId?.length) {
      const apiUrl = `${loyaltyEndPoint}v1/user/vocherGeneration`;
      const postData = {
        userId: userId,
        points: stateRedeem.pointsToConvert,
      };
      axios
        .post(apiUrl, postData)
        .then((res: any) => {
          const text = res?.data?.VoucherValueInDoller || 0;
          messageRef.current = `${t("your_voucher_value")} $ ${text}`;
          setShowPopup(true);
        })
        .catch(() => {
          ToastService.failToast(t(errorRequest));
        });
    }
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setItemValue(newValue);
    setstateRedeem({
      pointsToConvert: "",
      voucherValue: "",
    });
    setStateToken({
      pointsToConvertToken: "",
      tokenValue: "",
    });
  };
  const initializeMetaMask = async () => {
    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const accounts = await (window as any).ethereum.enable();
      const userId = localStorage.getItem("userId");
      // console.log("Account:", address);
      if (userId?.length && accounts?.[0]) {
        const apiUrl = `${loyaltyEndPoint}v1/user/tokenConversion`;
        const postData = {
          userId: userId,
          address: accounts[0], //"0x0Bf3d06DE2b696b97610E4B8bA67A928efBeDD17"
          points: stateToken.pointsToConvertToken,
        };
        axios
          .post(apiUrl, postData)
          .then((res: any) => {
            const text = res?.data?.LoyaltyCryptoTokens || 0;
            const message = `${t("awarded_with")} ${text} ${t("token")}`;
            ToastService.SuccessToast(message);
          })
          .catch(() => {
            ToastService.failToast(t(errorRequest));
          });
      }
    } catch (err) {
      ToastService.failToast(t(errorRequest));
    }
  };

  const convertTotoken = (event: any) => {
    event.preventDefault && event.preventDefault();
    initializeMetaMask();
  };
  const handleTokenInputChange = (event: any) => {
    event.preventDefault && event.preventDefault();
    const { name = "", value = "" } = event?.target || {};
    setStateToken({
      ...stateToken,
      [name]: value,
    });
    name === "pointsToConvertToken" && getVoucherValue(value, "token");
  };

  const confirmationClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Box className='redeemWrapper'>
        <Box className='tabTopBox'>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={itemValue}
              onChange={handleTabChange}
              aria-label='redeem tabs'
              className='tabItemWrapper'>
              <Tab label={t("convert_voucher")} {...a11yProps(0)} className='tabItem' />
              <Tab label={t("convert_token")} {...a11yProps(1)} className='tabItem' />
            </Tabs>
          </Box>
          <CustomTabPanel value={itemValue} index={0}>
            <Box className='profilePageWrapper'>
              <Box className='profileForm'>
                <Grid container className='formContainer'>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <StringOnBlurTextBox
                        maxLength={12}
                        name='pointsToConvert'
                        label={t("points_to_convert")}
                        isDisabled={false}
                        isCloseIcon={true}
                        cssClass='input-control-textbox'
                        value={stateRedeem.pointsToConvert}
                        handleChange={handleInputChange}
                        customInPutAllowField={"number"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <StringOnBlurTextBox
                        maxLength={12}
                        name='voucherValue'
                        label={t("voucher_value")}
                        isDisabled={true}
                        isCloseIcon={false}
                        cssClass='input-control-textbox'
                        value={stateRedeem.voucherValue}
                        handleChange={handleInputChange}
                        customInPutAllowField={"number"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <Button
                        variant='primaryButton1'
                        type='button'
                        onClick={convertToVoucher}
                        disabled={
                          stateRedeem?.voucherValue && stateRedeem?.pointsToConvert ? false : true
                        }>
                        {t("convert_to_voucher")}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={itemValue} index={1}>
            <Box className='profilePageWrapper'>
              <Box className='profileForm'>
                <Grid container className='formContainer'>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <StringOnBlurTextBox
                        maxLength={12}
                        name='pointsToConvertToken'
                        label={t("points_to_convert")}
                        isDisabled={false}
                        isCloseIcon={true}
                        cssClass='input-control-textbox'
                        value={stateToken.pointsToConvertToken}
                        handleChange={handleTokenInputChange}
                        customInPutAllowField={"number"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <StringOnBlurTextBox
                        maxLength={12}
                        name='tokenValue'
                        label={t("token_value")}
                        isDisabled={true}
                        isCloseIcon={false}
                        cssClass='input-control-textbox'
                        value={stateToken.tokenValue}
                        handleChange={handleTokenInputChange}
                        customInPutAllowField={"number"}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} em={12} className='gap'>
                    <Box className='itemGap'>
                      <Button
                        variant='primaryButton1'
                        type='button'
                        disabled={
                          stateToken?.pointsToConvertToken && stateToken?.tokenValue ? false : true
                        }
                        onClick={convertTotoken}>
                        {t("convert_to_token")}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CustomTabPanel>
        </Box>
      </Box>
      {showPopup && (
        <Confirmation
          open={true}
          img={GreenTick}
          text={messageRef.current}
          title={t("voucher_generated")}
          handleClose={confirmationClose}
        />
      )}
    </>
  );
};

export default Redeem;
