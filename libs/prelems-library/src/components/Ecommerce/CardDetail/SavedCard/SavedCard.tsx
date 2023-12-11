import React from "react";
import { Box, Button, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTranslation } from "react-i18next";
import IconVisaCardSvg from "../../../../assets/svgIcon/VisaCard.svg";
import IconMasterCardSvg from "../../../../assets/svgIcon/MasterCard.svg";
import IconDelete1svg from "../../../../assets/svgIcon/Delete1.svg";
import "./SavedCard.css";
import "../../../../service/i18n";
import { useCustomStyle } from "./SavedCard.style";

const SavedCard = () => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const savedCardArr = [
    {
      bank: "State Bank of India",
      card: "xxxx  xxxx  xxxx 2222",
      image: IconVisaCardSvg,
    },
    {
      bank: "ICICI Bank",
      card: "xxxx  xxxx  xxxx 9222",
      image: IconMasterCardSvg,
    },
    {
      bank: "ICICI Bank",
      card: "xxxx  xxxx  xxxx 6522",
      image: IconVisaCardSvg,
    },
    {
      bank: "HDFC Bank",
      card: "xxxx  xxxx  xxxx 6922",
      image: IconMasterCardSvg,
    },
  ];
  return (
    <>
      <Box mb={4} className={`saved-cards-wrapper ${classes.saveCardWrapper} saveCardSection`}>
        <Typography variant='h4bold' id='billing-radio-group' pb={2}>
          {t("saved_cards")}
        </Typography>
        {savedCardArr.map((item: any, index: number) => {
          return (
            <Box
              // className="saved-cards"
              key={"saved-card-" + index.toString()}
              className={`saved-cards borderLine`}>
              <Box className='card-type'>
                <img src={item.image} alt='visa' />
              </Box>
              <Box className='card-information'>
                <Typography variant='p4regular'>{item.bank}</Typography>
                <Typography variant='p4regular'>{item.card}</Typography>
              </Box>
              <Box className='actions'>
                <Button
                  variant='graybuttonsmall'
                  className='edit ecom-delete-button-small'
                  startIcon={<EditOutlinedIcon />}></Button>
                <Button
                  variant='graybuttonsmall'
                  className='edit ecom-delete-button-small'
                  startIcon={<img src={IconDelete1svg} alt='delete' />}></Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default SavedCard;
