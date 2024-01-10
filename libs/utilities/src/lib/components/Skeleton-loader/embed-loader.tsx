import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';

interface SkeltonLoaderList {
  maxWidth?: number;
  maxHeight?: number;
}
export default function SkeltonLoader({
  maxWidth = 350,
  maxHeight,
}: SkeltonLoaderList) {
  return (
    <>
      <Card
        sx={{
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          mt: 5,
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <Skeleton
          sx={{ height: 190, marginBottom: 2 }}
          animation='wave'
          variant='rectangular'
        />
        <Skeleton
          animation='wave'
          width='40%'
          height={15}
          style={{ marginBottom: 15 }}
        />
        <Skeleton
          animation='wave'
          height={10}
          width='80%'
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation='wave'
          height={10}
          width='80%'
          style={{ marginBottom: 6 }}
        />
      </Card>
    </>
  );
}
