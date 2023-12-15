import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import FacebookIcon from '../../../../assets/facebooknicon.svg';
import TwitternIcon from '../../../../assets/twitternicon.svg';
import YoutubenIcon from '../../../../assets/youtubenicoon.svg';
import InstagramIcon from '../../../../assets/instagramnicon.svg';
import GsearchIcon from '../../../../assets/svg/Gseachnnicon.svg';
import { Box } from "@mui/system";


interface Channel {
    name: string;
    number: | string | number;
    progress: number;
}

const EngagementChannel: React.FC = () => {
    const channel: Channel[] = [
        { name: "Facebook", number: '16k', progress: 80 },
        { name: "Twitter", number: '12.2k', progress: 60 },
        { name: "Youtube", number: '8k', progress: 90 },
        { name: "Instagram", number: '14.4k', progress: 75 },
        { name: "Google Search", number: '15k', progress: 50 },
    ];

    const style = {
        root: {
            flexGrow: 1
        },
        color: "#4B9EF9"
    }

    return (
        <div>
            {channel.map((course) => (
                <div key={course.number}>
                    <Box style={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                        <Box sx={{
                            display: 'flex',
                            width: '44px',
                            height: '44px',
                            borderRadius: '5px',
                            border: '1px solid #D9DBE9',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            marginBottom: '5px'

                        }}>{course.name === "Facebook" ? <img src={FacebookIcon} />
                            : course.name === "Twitter" ? <img src={TwitternIcon} />
                                : course.name === "Youtube" ? <img src={YoutubenIcon} />
                                    : course.name === "Instagram" ? <img src={InstagramIcon} />
                                        : course.name === "Google Search" ? <img src={GsearchIcon} />
                                            : ""}
                        </Box>
                        <Box>
                            <Box style={{ display: "flex", justifyContent: 'space-between', marginLeft: '15px' }}>
                                <Box>{course.name}</Box>
                                <Box>{course.number}</Box>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{
                                    width: "200px", marginTop: "10px", marginLeft: '14px',
                                    "& .Platform-x-LinearProgress-bar": {
                                        backgroundColor: "#4B9EF9"
                                    },
                                    backgroundColor: "#EFF0F6",
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: 'green'
                                    }
                                }}

                            />
                        </Box>
                    </Box>

                </div>
            ))}
        </div>
    );
};

export default EngagementChannel;
