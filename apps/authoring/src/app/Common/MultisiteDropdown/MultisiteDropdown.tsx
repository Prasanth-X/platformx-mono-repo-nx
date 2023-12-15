import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
    MenuItem
} from '@mui/material';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { getSelectedSite } from '../../utils/helperFunctions';
import { multisiteApi } from '../../services/MultisiteACL/multisite.api';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        
      },
    },
  };

const MultisiteDropDown = () => {
    const sessions = localStorage.getItem('userSession');
    const [getSession, updateSession] = useUserSession();
    const storedSession = JSON.parse(sessions);
    const selectedSite = getSelectedSite() || storedSession?.userInfo?.default_site;
    const [site, setSite] = useState(selectedSite)


    const handleSiteChange = async (e) => {
        const isSiteSystem = e.target.value?.toLowerCase() === "system";
        try {
        const res = await multisiteApi.getPermissions(e.target.value);

        setSite(e.target.value)
        localStorage.setItem('selectedSite', e.target.value)
        updateSession({
            ...getSession(),
            permissions: res.data?.data?.permissions,
            userInfo: res.data?.data,
            role:res.data?.data?.roles?.find((obj)=> obj.site === res.data?.data?.selected_site)?.name
        });
        const lang = res.data?.data?.preferred_sites_languages?.[e.target.value] || 'en';
        if(isSiteSystem){
            location.replace(`${location.origin}/${e.target.value}/${lang}/sites/site-listing`);
        } else {
            location.replace(`${location.origin}/${e.target.value}/${lang}/dashboard`);
        }
        
    } catch (error) {
            console.log(error);
    }
    };

    return (
        <>

            <Select
                value={site}
                onChange={handleSiteChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={KeyboardArrowDownIcon}
                sx={{ marginRight: '20px' }}
                size='small'
                MenuProps={MenuProps}
            >
                {storedSession?.userInfo?.accessible_sites?.map((val, index) => {
                    return (
                        <MenuItem key={val + index} value={val}>
                            {val}
                        </MenuItem>
                    )
                })
                }

            </Select>

        </>
    );
};
export default React.memo(MultisiteDropDown);
