import React, { useEffect, useState } from 'react';
import { Box, FormControl, Grid, InputLabel, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useStyles } from './MemberDetails.styles';
import TitleSubTitle from '../../Common/TitleSubTitle';
import userManagementAPI from '../../../services/userManagement/UserManagement.api';
import AutoCompleteMultiSelect from '../../../Common/Dropdown/AutoCompleteMultiSelect';

export default function MemberDetails() {
  const [role, setRole] = React.useState('');
  const classes = useStyles();
  const handleSelectChangeofRole = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };
  const [users, setUsers] = useState([]);

  const { t } = useTranslation();
  const getUsers = async () => {
    try {
      const response: any = await userManagementAPI.fetchUsers({
        start: 0,
        rows: 5000,
      });
      if (
        response?.authoring_userList &&
        response?.authoring_userList?.length > 0
      ) {
        const userList = [...(response?.authoring_userList || [])];
        const sortedUserList = userList?.map(
          (obj) => `${obj.first_name} ${obj.last_name}`
        );
        setUsers(sortedUserList);
      }
    } catch (err: any) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Box
        id='titleDescription'
        className={`${classes.container} main-container`}
      >
        <TitleSubTitle
          title='Member'
          subTitle={t('subhead')}
          titleVarient='h3medium'
          subTitleVarient='h7regular'
        />

        <Grid container rowSpacing={1}>
          {/*template */}
          <Grid item xs={12} sm={5} md={4} className='grid'>
            <TitleSubTitle
              title='Choose Member'
              subTitle={t('event_subdescription')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={8} className='rightGrid'>
            {/* <AutoCompleteMultiSelect
              options={users}
              inputLabel={t('community_member')}
            /> */}
          </Grid>
          <Grid item xs={12} sm={5} md={4} className='grid'>
            <TitleSubTitle
              title='Choose Role'
              subTitle={t('event_subdescription')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={8} className='rightGrid'>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={role}
                label='Role'
                onChange={handleSelectChangeofRole}
              >
                <MenuItem value='10'>ten</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
