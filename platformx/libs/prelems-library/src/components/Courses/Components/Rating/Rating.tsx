import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function RatingStar() {
  return (
    <Stack spacing={1}>
      <Rating defaultValue={2} size='small' />
      <Rating defaultValue={2} />
      <Rating defaultValue={2} size='large' />
    </Stack>
  );
}
