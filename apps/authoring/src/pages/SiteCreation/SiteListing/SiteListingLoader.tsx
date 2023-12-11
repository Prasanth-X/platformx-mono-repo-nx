import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material';
import ThemeConstants from '../../../theme/variable';
import useLoaderStyle from './SiteListingLoader.style';

export const SiteListingLoader = () => {
    const isMobile = useMediaQuery(`@media(max-width:${ThemeConstants.SM}px)`);
    const classes = useLoaderStyle()

    return (
        <Box>

            <Grid
                container
                className={classes.container}
            >
                <Grid item xs={12} sm={2}  >
                    <Box className={classes.padding10}>
                        <Skeleton variant="rectangular" className={classes.marginauto} animation='wave' width='146px' height='146px' />
                    </Box>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.boxmargin}>
                        <Skeleton
                            animation='wave'
                            height={15}
                            width='100px'
                            style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation='wave' width='200px' height={15} style={{ marginBottom: 6 }} />
                        <Skeleton className={classes.skelatonmargin} animation='wave' width='300px' height={15} />
                        <Skeleton animation='wave' width='300px' height={15} />
                    </Box>

                </Grid>

                <Grid item xs={12} sm={3} >
                    <Box className={classes.box}>
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} className={classes.margin10} />
                        <Skeleton variant="circular" width={30} height={30} />
                    </Box>
                </Grid>

            </Grid>

            {!isMobile && (<Grid
                container
                className={classes.container}
            >
                <Grid item xs={12} sm={2}  >
                    <Box className={classes.padding10}>
                        <Skeleton variant="rectangular" className={classes.marginauto} animation='wave' width='146px' height='146px' />
                    </Box>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box className={classes.boxmargin}>
                        <Skeleton
                            animation='wave'
                            height={15}
                            width='100px'
                            style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation='wave' width='200px' height={15} style={{ marginBottom: 6 }} />
                        <Skeleton className={classes.skelatonmargin} animation='wave' width='300px' height={15} />
                        <Skeleton animation='wave' width='300px' height={15} />
                    </Box>

                </Grid>

                <Grid item xs={12} sm={3} >
                    <Box className={classes.box}>
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} className={classes.margin10} />
                        <Skeleton variant="circular" width={30} height={30} />
                    </Box>
                </Grid>

            </Grid>)}

        </Box>
    )
}