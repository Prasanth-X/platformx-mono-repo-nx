import { Typography } from '@mui/material';

export const getStepperCount = (stages: any[]) => {
  let count = 0;
  stages.forEach((stage) => {
    if (stage.status === 'Completed') {
      count++;
    }
  });
  return count;
};

export const lineBreak = (status: any, username: any) => {
  return (
    <>
      <Typography variant="h6bold">{status}</Typography> <br />
      <Typography variant="h6regular">{username}</Typography>
    </>
  );
};
