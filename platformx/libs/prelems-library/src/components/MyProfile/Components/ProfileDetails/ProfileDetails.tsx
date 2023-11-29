import { Box, Button, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useStyles } from "./ProfileDetails.styles";

const ProfileDetails = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Grid container gap={3}>
        <Grid item xs={12} md={12}>
          <Typography variant='h4bold' className={classes.typoMargin}>
            Public profile
          </Typography>
          <Typography variant='h6regular' className={`${classes.typoMargin} ${classes.gray}`}>
            Add information about yourself
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={1.5}>
            <Avatar className={classes.avatar}>PD</Avatar>
          </Grid>
          <Grid item xs={7.5}>
            <Typography variant='h5bold' className={classes.typoMargin}>
              Paul Dev
            </Typography>
            <Typography variant='h6regular' className={`${classes.typoMargin} ${classes.gray}`}>
              paul@jocdk.com
            </Typography>
            <Typography variant='h6regular' className={`${classes.typoMargin} ${classes.gray}`}>
              India
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.editButtonContainer}>
            <Button variant='blackbutton' className={classes.editButton}>
              edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileDetails;
