import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";

const Ratings = () => {
  const [rating, setRating] = useState(0);
  const { t } = useTranslation();
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const renderStars = () => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      stars.push(
        <StarRateIcon
          key={i}
          sx={{ color: isFilled ? "#FF9C00" : "#CED3D9" }}
          onClick={() => handleRatingClick(i)}
        />,
      );
    }

    return stars;
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {renderStars()}
        <Typography
          variant='h7regular'
          sx={{
            marginLeft: "10px",
            marginTop: "0px",
          }}>
          {`( 0 ${t("customer_reviews")} )`}
        </Typography>
      </Box>
    </>
  );
};

export default Ratings;
