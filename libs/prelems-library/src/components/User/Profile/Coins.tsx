import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import "service/i18n";
import Coin from "assets/userProfile/coin.png";
import { nullToObject } from "utils/helperFns";

type CoinsProps = {
  secondaryArgs: any;
};

const Coins = (props: CoinsProps) => {
  const { secondaryArgs = {} } = props;
  const { prelemBaseEndpoint: { loyaltyEndPoint = "" } = {} } = nullToObject(secondaryArgs);

  const [userPoints, setUserPoints] = useState(0);
  const [voucherPoints, setVoucherPoints] = useState(0);

  const getUserPoints = (userId: string) => {
    axios
      .get(`${loyaltyEndPoint}v1/user/userPoints?userId=${userId}`)
      .then((res: any) => {
        const points = res?.data?.result || 0;
        setUserPoints(points);
      })
      .catch(() => {
        setUserPoints(0);
      });
  };

  const getVoucherPoints = (userId: string) => {
    axios
      .get(`${loyaltyEndPoint}v1/user/voucherAmount?userId=${userId}`)
      .then((res: any) => {
        const points = res?.data?.result || 0;
        setVoucherPoints(points);
      })
      .catch(() => {
        setVoucherPoints(0);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId?.length) {
      getUserPoints(userId);
      getVoucherPoints(userId);
    }
  }, []);

  return (
    <Box className='CoinsSections'>
      <Grid container>
        <Grid item xs={12} sm={12} md={5}>
          <Box className='coinWrapperBox'>
            <Typography variant='h6semibold' className='marginTopZero'>
              Available Points{" "}
            </Typography>
            <Box className='coinBox'>
              <img src={Coin} alt='coin' className='coinImg' />
              <Typography variant='h2bold' sx={{ textAlign: "left" }}>
                <CountUp enableScrollSpy={true} start={0} end={userPoints} delay={0}>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={2} className='divider'>
          <Divider orientation='vertical' />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box className='coinWrapperBox'>
            <Typography variant='h6semibold' className='marginTopZero'>
              Voucher Value
            </Typography>
            <Box className='coinBox'>
              <img src={Coin} alt='coin' className='coinImg' />
              <Typography variant='h2bold' sx={{ textAlign: "left" }}>
                ${" "}
                <CountUp enableScrollSpy={true} start={0} end={voucherPoints} delay={0}>
                  {({ countUpRef }) => <span ref={countUpRef} />}
                </CountUp>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Coins;
