import React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabList from '@mui/lab/TabList';

type BlogHeaderTabMobileViewProps = {
    handleTabChange: any
}

const BlogHeaderTabMobileView = ({ handleTabChange = () => { } }: BlogHeaderTabMobileViewProps) => {

    return (
        <Box
            sx={{
                borderColor: 'rgba(0, 0, 0, 0.12)',
                padding: '0 5px !important',
                height: '48px',
                background: '#FFFFFF',
                borderRadius: '40px',
                margin: '10px 14px 14px 14px',
            }}
        >
            <TabList onChange={handleTabChange} aria-label='lab API tabs example'>
                <Tab label='Write' value='1' />
                <Tab label='Timeline' value='2' />
                <Tab label='Event' value='3' />
            </TabList>
        </Box>
    );
};
export default React.memo(BlogHeaderTabMobileView);
