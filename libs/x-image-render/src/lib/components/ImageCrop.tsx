import LoadingButton from '@mui/lab/LoadingButton';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { BREAKPOINTS } from '../utils/constants';
import SelectedImageCrop from './SelectedImageCrop';
import { nullToObject } from '@platformx/utilities';
import useImageCrop from '../hooks/useImageCrop';

const ImageCrop = (props: any = {}) => {
    const {
        open,
        cropImages = {},
        backTo,
        doneCropCompleted,
    } = useMemo(() => nullToObject(props), [props]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {
        doneLoader,
        isLoading: doneCropLoading,
        crops,
        handleDone,
        onCropChange,
    } = useImageCrop(cropImages);

    const { Thumbnail } = cropImages || {};

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={backTo}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Grid
                container
                sx={{
                    borderBottom: '1px solid #ced3d9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: { xs: '10px 15px', md: '0px 24px' },
                }}
            >
                <Grid xs={12} md={8}>
                    <Typography variant='h4bold'>Crop your Image</Typography>
                </Grid>
                <Grid
                    xs={12}
                    md={4}
                    sx={{
                        textAlign: { xs: 'left', md: 'right' },
                        padding: { xs: '10px 0', md: '8px' },
                    }}
                >
                    <Button
                        variant="secondaryButton"
                        onClick={() => backTo()}
                        sx={{ marginRight: '12px' }}
                    >
                        Back
                    </Button>
                    <LoadingButton
                        onClick={() => handleDone()}
                        loading={doneLoader}
                        loadingPosition='start'
                        variant="primaryButton"
                        disabled={doneCropLoading}
                    >
                        Done
                    </LoadingButton>
                </Grid>
            </Grid>
            <DialogContent>
                <Box
                    className='wholecontainer'
                    sx={{
                        background: { xs: '#f7f7f7', sm: '#fff' },
                        padding: { xs: '11px', sm: '0px' },
                    }}
                >
                    {isLoading && (
                        <Box
                            sx={{
                                marginTop: '350px',
                                marginBottom: '100px',
                                textAlign: 'center',
                                position: 'absolute',
                                zIndex: '99',
                                left: '0',
                                right: '0',
                            }}
                        >
                            <CircularProgress
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    color: '#2d2d39',
                                }}
                            />
                        </Box>
                    )}

                    <Grid container spacing={1}>
                        {BREAKPOINTS.map(({ aspectRatio, ratioName, aspectRatioName }, key) => (
                            <Grid xs={12} md={6} em={4} sx={{ padding: '8px' }} key={key}>
                                <SelectedImageCrop
                                    crop={`crop${key + 1}`}
                                    aspect={aspectRatio}
                                    ratio={`${ratioName}(${aspectRatioName})`}
                                    imageSrc={Thumbnail}
                                    onCropChange={(data: any) => onCropChange(data, key)}
                                    setIsLoading={setIsLoading}
                                    isLoading={isLoading}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default React.memo(ImageCrop);
