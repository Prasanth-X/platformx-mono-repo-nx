import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface SkeltonLoaderList {
  maxWidth?: number;
  maxHeight?: number;
}
export default function BlogSkeltonLoader({
  maxWidth = 350,
  maxHeight,
}: SkeltonLoaderList) {
  return (
    <>
      <Card
        sx={{
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          m: 2,
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }

        title={
          <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
          <Skeleton animation="wave" height={10} width="40%" />
        }
      />
      </Card>
      <Card
        sx={{
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          m: 2,
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }

        title={
          <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
          <Skeleton animation="wave" height={10} width="40%" />
        }
      />
      </Card>
    </>
  );
}
