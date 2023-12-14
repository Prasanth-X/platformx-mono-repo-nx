import { useLazyQuery } from '@apollo/client';
import { Box, Grid, RadioGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import RadioLabelWithSubheading from '../../../components/Common/RadioLabelWithSubheading';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import {
  FETCH_PERMISSION_LIST,
  FETCH_ROLE_LIST,
} from '../../../graphql/fetchQueries';
import {
  capitalizeFirstLetter,
  getSelectedSite,
} from '../../../utils/helperFunctions';
import userManagementAPI from '../../../services/userManagement/UserManagement.api';
import { useCustomStyle } from '../../../components/Quiz/Quiz.style';
import { useStyles } from './CreateUser.styles';
import CommonBoxWithNumber from '../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const RolePermissions = ({
  t,
  roleSelected,
  setRoleSelected,
  state,
  setState,
}) => {
  const [runFetchContentList] = useLazyQuery(FETCH_ROLE_LIST);
  const [runFetchRolesList] = useLazyQuery(FETCH_PERMISSION_LIST);
  const [roleList, setRoleList] = useState<any[]>([]);
  const handleChange = (event) => {
    setRoleSelected(event.target.value);
    const rollName = roleList.find((val) => {
      return event.target.value === val._id;
    });
    setState({ ...state, ['role']: rollName.name });
  };
  const getRoleList = async () => {
    try {
      // const roles = await runFetchContentList();
      const roles: any = await userManagementAPI.fetchRoles({
        pagePath: getSelectedSite(),
      });
      console.log(roles, 'roles');

      const permissions = await runFetchRolesList();
      console.log(permissions);
      // setRoleList(roles?.data?.authoring_rolesList);
      setRoleList(roles?.authoring_rolesList);
    } catch (err) {
      showToastError(t('api_error_toast'));
    }
  };
  useEffect(() => {
    getRoleList();
  }, []);
  const classes = useCustomStyle();
  const classess = useStyles();
  return (
    <Box className={classes.mainStyleWrapper} id='rolepermission'>
      <CommonBoxWithNumber
        number='03'
        title={t('roles_permissions')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Grid container sx={{ width: 'calc(100% + 20px)', margin: '-10px' }}>
          {roleList?.map((value) => {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <Box className={classess.roleandperBox}>
                  <RadioGroup value={roleSelected} onChange={handleChange}>
                    <RadioLabelWithSubheading
                      value={value._id}
                      label={capitalizeFirstLetter(value.name)}
                      subTitle={value.description}
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};

export default RolePermissions;
