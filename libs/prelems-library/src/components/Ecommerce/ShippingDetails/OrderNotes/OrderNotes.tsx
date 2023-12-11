import React from "react";
import { Box, Typography } from "@mui/material";
import "./OrderNotes.css";
import StringTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnChangeTextBox";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";

const EcomOrderNotes = () => {
  const { t } = useTranslation();
  return (
    <Box className='order-notes'>
      <Typography variant='h4bold'>{`${t("order_note")}(${t("optional")})`}</Typography>
      <StringTextBox
        name='city'
        label=''
        rows={3}
        multiline={true}
        cssClass='input-control-textbox'></StringTextBox>
    </Box>
  );
};

export default EcomOrderNotes;
