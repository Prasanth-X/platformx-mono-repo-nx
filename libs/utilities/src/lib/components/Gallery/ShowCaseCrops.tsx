import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formCroppedUrl, nullToObject } from '../../utils/helperFns';
import { Loader } from '../Loader';
import { ratios } from './utils/constants';

const ShowCaseCrops = (props: any = {}) => {
  const {
    open,
    Images = [],
    backTo,
    handleEdit,
    extension,
  } = nullToObject(props);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={backTo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: '100%',
          height: 'calc(100% - 40px)',
          maxHeight: 'calc(100% - 40px)',
          margin: '20px',
        },
      }}
    >
      <DialogContent sx={{ padding: '5px' }}>
        <Box className="casecropsbox">
          {loading && <Loader />}
          <Grid container sx={{ paddingRight: '50px' }}>
            {Images.map(
              (
                { visibility = '', folder_path = '', aspect_ratio = '' },
                key
              ) => {
                return (
                  <>
                    <Box className="boxwp">
                      <Box className="imgbox">
                        <img src={formCroppedUrl(folder_path, extension)} />
                        <Typography variant="h6regular" component="h6">
                          {ratios[aspect_ratio]}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                );
              }
            )}
            <Button
              className="editIconfixed"
              onClick={() => handleEdit()}
              startIcon={<EditIcon />}
            ></Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ShowCaseCrops);
