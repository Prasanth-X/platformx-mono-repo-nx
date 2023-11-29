import { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../Common/TitleSubTitle';
import { useStyles } from './InviteMembers.styles';
import AutoCompleteMultiSelect from '../../../Common/Dropdown/AutoCompleteMultiSelect';
import spaceManagementAPI from '../../../pages/SpaceManagement/Space.api';

export default function InviteMembers({ stateSpace, setStateSpace }) {
  const [members, setMembers] = useState([]);
  const { t } = useTranslation();
  const classes = useStyles();
  const onChange = useCallback(
    (_, newInputValue) => {
      setStateSpace((prevState: any) => {
        return {
          ...prevState,
          invitedMembers: [...newInputValue],
        };
      });
    },
    [setStateSpace]
  );
  const getMemberList = async () => {
    try {
      const response: any = await spaceManagementAPI.getMembersToInvite({
        searchTerm: '',
        currentUser: 'soorajshukla',
        spaceIdentifier: '',
      });
      if (
        response?.authoring_searchExoMemberToInvite &&
        response?.authoring_searchExoMemberToInvite.length > 0
      ) {
        const memberList = response?.authoring_searchExoMemberToInvite || [];
        setMembers(memberList);
      }
    } catch (err: any) {
      return err;
    }
  };
  useEffect(() => {
    getMemberList();
  }, []);
  return (
    <Box className={`${classes.container} main-container`}>
      <TitleSubTitle
        title={t('invite_members')}
        subTitle={t('subhead')}
        titleVarient='h3medium'
        subTitleVarient='h7regular'
      />

      <Grid container rowSpacing={1}>
        <Grid item xs={12} sm={5} md={5} className='grid'>
          <TitleSubTitle
            title={t('community_member')}
            subTitle={t('space_invite_members_sub')}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          md={7}
          className='margintopClassforInviteMembers'
        >
          <AutoCompleteMultiSelect
            className='inviteMembersAutoComplete'
            options={members}
            placeholder={t('community_member')}
            values={stateSpace.invitedMembers}
            onChange={onChange}
            getOptionLabel={(option: any) => option?.title}
            optionFormat='title'
          />
        </Grid>
      </Grid>
    </Box>
  );
}
