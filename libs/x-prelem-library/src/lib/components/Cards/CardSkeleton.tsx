import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function CardSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton variant='rectangular' sx={{ height: "200px" }} />
    </Stack>
  );
}
