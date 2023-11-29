
import { Avatar, Box, Input, InputAdornment, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SitesdropIcon from '../../assets/sitesdropIcon.svg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SettingNewIcon from '../../assets/settingnewicon.svg'
import axios from 'axios';
import { useState } from 'react';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { getSelectedSite } from '../../utils/helperFunctions';
import usePopupStyle from './SiteListing/SitesPopup.style';
import SitesSearchBox from './SiteListing/SitesSeachbox';
import CloseIcon from '@mui/icons-material/Close';
import { getFirstTwoletters } from '../../utils/helperFunctions';

export default function SiteDialog(props) {

    const { isVisible, setIsVisible } = props;
    const handleClose = () => {
        setIsVisible(false)
    }
    const classes = usePopupStyle();
    const sessions = localStorage.getItem('userSession');
    const [baseUsers, setBaseUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [getSession, updateSession] = useUserSession();
    const storedSession = JSON.parse(sessions);
    const selectedSite = getSelectedSite() || storedSession?.userInfo?.default_site;
    const [site, setSite] = useState(selectedSite);
    const [filteredSites, setfilteredSites] = useState(storedSession?.userInfo?.accessible_sites.filter(a => a != 'System'))

    const handleSearch = (value) => {
        setfilteredSites(storedSession?.userInfo?.accessible_sites.filter(a => a.includes(value)).filter(a => a != 'System'))

    };
    const handleSiteChange = async (e) => {
        const isSiteSystem = e.target.textContent?.toLowerCase() === "administration";
        try {
            const res = await axios.get(process.env.REACT_APP_API_URI + `auth/get-site-permissions/${e.target.textContent}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache',
                },
                withCredentials: true,
            });

            setSite(e.target.textContent)
            localStorage.setItem('selectedSite', e.target.textContent)
            updateSession({
                ...getSession(),
                permissions: res.data?.data?.permissions,
                userInfo: res.data?.data,
                role: res.data?.data?.roles?.find((obj) => obj.site === res.data?.data?.selected_site)?.name
            });
            const lang = res.data?.data?.preferred_sites_languages?.[e.target.textContent] || 'en';
            if (isSiteSystem) {
                location.replace(`${location.origin}/System/${lang}/sites/site-listing`);
            } else {
                location.replace(`${location.origin}/${e.target.textContent}/${lang}/dashboard`);
            }

        } catch (error) {
            console.log(error);
        }
    };
    return (

        <Box>
            <Dialog
                open={isVisible}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <Box
                >
                    <Box className={classes.boxsize}
                    >
                        <Box className={classes.toptypography}
                        >
                            <Typography variant='h5medium' >Your Site</Typography>
                            <Box
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </Box>
                        </Box>

                        <Box
                        >
                            <SitesSearchBox handleSearch={handleSearch} />
                        </Box>
                        {filteredSites.map((val, index) => {
                            return (
                                <Box className={classes.container}
                                >
                                    <Box className={classes.innercontainer}
                                        onClick={handleSiteChange}
                                    >
                                        <Avatar className={classes.avatarbox}> {getFirstTwoletters(val)}</Avatar>
                                        <Box className={classes.sitescontent}>
                                            <Typography variant='h5medium' className={classes.sitescontent}>{val}</Typography>
                                            <KeyboardArrowRightIcon className={classes.keyrighticon} />
                                        </Box>
                                    </Box>

                                </Box>
                            )
                        })
                        }
                        <Box className={classes.borderbottomtype}></Box>
                        <Box onClick={handleSiteChange} className={classes.typographyadmin}
                        >
                            <img className={classes.settingicon} src={SettingNewIcon} alt="icon" />
                            <Typography variant='h6medium'>Administration</Typography>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </Box>
    );
}

