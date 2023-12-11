import React from "react";
import { Box, } from '@mui/material';
import Divider from '@mui/material/Divider';
import Close from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import ThemeConstants from "../../../../theme/variable";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import FormatQuoteOutlinedIcon from '@mui/icons-material/FormatQuoteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import "./BlogContent.css";

const useStyles = makeStyles({
    buttonArea: {
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        border: `1px solid #ced3d9`,
        borderRadius: 2,
        backgroundColor: '#fff ',
        height: '42px',
        '& .MuiButtonBase-root ': {
            borderRadius: '0px !important',
            width: '40px ',
            fontSize: '18px',
            height: '40px ',
            '& .Platform-x-SvgIcon-root ': {
                fontSize: '18px',
            },
            '&:hover, &.Mui-focusVisible ': {
                backgroundColor: '#f5f6f8 ',
                color: '#2d2d39 ',
                borderRadius: '0px !important ',
            },

            ':disabled ': { color: '#5c6574 !important ' },
        },
    },
    button: {
        border: '1px solid #89909a !important',
        color: '#89909a !important ',
        height: '40px !important ',
        '&:hover, &.Mui-focusVisible ': { backgroundColor: '#ced3d9 ' },
    },
    saveDisabled: {
        border: '1px solid #89909a !important',
        color: '#89909a !important ',
        height: '40px !important ',
        fontSize: `${ThemeConstants.FONTSIZE_H6}!important`,
    },
    publishDisabled: {
        border: '1px solid #89909a !important',
        backgroundColor: '#ced3d9 !important',
        color: '#89909a !important ',
        height: '40px !important ',
        fontSize: `${ThemeConstants.FONTSIZE_H6}!important`,
    },
    publishActive: {
        backgroundColor: '#2D2D39 !important',
        color: '#fff',
        height: '40px !important ',
        padding: '8px 15px',
        minWidth: '110px',
        '&:hover': {
            color: '#fff',
        },
    },
    saveActive: {
        color: '#2D2D39 !important',
        border: '1px solid #2D2D39 !important',
        height: '40px !important ',
        padding: '8px 15px',
        minWidth: '110px',
    },
});

const BlogContentTypeWeb = (_props: any) => {
    const {
        isStar = false,
        isCode = false,
        contentItem = {},
        selectedVideo = {},
        selectedImage = {},
        isQuoteOpen = false,
        showGallery = () => { },
        onRemoveImage = () => { },
        onRemoveVideo = () => { },
        starClickHandel = () => { },
        codeClickHandel = () => { },
        quoteClickHandel = () => { },
        onRemoveContentType = () => { },
    } = _props;

    const { Thumbnail: imgThumbnail = "" } = selectedImage;
    const { Thumbnail: videoThumbnail = "" } = selectedVideo;
    const { Thumbnail: { Url: contentThumbnail = "" } = {} } = contentItem;
    const classes = useStyles();
    const tempHide = false;

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' } }}>

                <Box
                    className={classes.buttonArea}
                    sx={{ mr: 2, '@media (width:1280px)': { marginRight: '8px' } }}
                >

                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '',
                        }}
                    >
                        {/* image */}
                        {imgThumbnail ?
                            <Box className="imageThumbnailWrapper">
                                <IconButton onClick={onRemoveImage}>
                                    <Close />
                                </IconButton>
                                <img className="img-background"
                                    alt="thumbImg1"
                                    src={imgThumbnail}
                                />
                            </Box> :
                            <Box>
                                <IconButton disabled={isQuoteOpen} onClick={() => showGallery('Images')}>
                                    <InsertPhotoOutlinedIcon />
                                </IconButton>
                            </Box>}
                    </Box>
                    <Divider orientation='vertical' flexItem />

                    {/* video */}
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '',
                        }}
                    >
                        {videoThumbnail ?
                            <Box className="videoThumbnailWrapper">
                                <IconButton onClick={onRemoveVideo}>
                                    <Close />
                                </IconButton>
                                <img className="img-background"
                                    alt="thumbImg1"
                                    src={videoThumbnail}
                                />
                            </Box> :
                            <Box>
                                <IconButton disabled={isQuoteOpen} onClick={() => showGallery('Videos')}>
                                    <PlayCircleOutlineIcon />
                                </IconButton>
                            </Box>
                        }
                    </Box>

                    <Divider orientation='vertical' flexItem />

                    {/* contentType */}
                    <Box
                        sx={{
                            backgroundColor: '#fff',
                            borderRadius: '',
                        }}
                    >
                        {contentThumbnail ?
                            <Box className="contentThumbnailWrapper">
                                <IconButton onClick={onRemoveContentType}>
                                    <Close />
                                </IconButton>
                                <img className="img-background"
                                    alt="thumbImg1"
                                    src={contentThumbnail}
                                />
                            </Box> :
                            <Box>
                                <IconButton disabled={isQuoteOpen} onClick={() => showGallery('content')}>
                                    <CollectionsOutlinedIcon />
                                </IconButton>
                            </Box>
                        }
                    </Box>
                </Box>

                <Box className={classes.buttonArea}>

                    {tempHide &&
                        <IconButton
                            onClick={codeClickHandel}
                            sx={{
                                backgroundColor: isCode ? '#e6eaed' : '#fff',
                                borderRadius: isCode ? '0px' : '',
                            }}
                            disabled={isQuoteOpen}
                        >
                            <UnfoldMoreOutlinedIcon className='rotateIcon90' />
                        </IconButton>
                    }

                    <Divider orientation='vertical' flexItem />
                    <IconButton
                        onClick={quoteClickHandel}
                        sx={{
                            backgroundColor: isQuoteOpen ? '#e6eaed' : '#fff',
                            borderRadius: isQuoteOpen ? '0px' : '',
                        }}
                        disabled={(imgThumbnail || videoThumbnail || contentThumbnail) ? true : false}
                    >
                        <FormatQuoteOutlinedIcon />
                    </IconButton>
                    <Divider orientation='vertical' flexItem />
                    <IconButton
                        onClick={starClickHandel}
                        sx={{
                            backgroundColor: isStar ? '#e6eaed' : '#fff',
                            borderRadius: isStar ? '0px' : '',
                        }}
                    >
                        <StarOutlineOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};
export default React.memo(BlogContentTypeWeb);
