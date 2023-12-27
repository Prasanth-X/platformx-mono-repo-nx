import { useLazyQuery } from '@apollo/client';
import { Box, Grid, RadioGroup } from '@mui/material';
import {
  UserManagementQueries,
  userManagementAPI,
} from '@platformx/authoring-apis';
import {
  CommonBoxWithNumber,
  RadioLabelWithSubheading,
  ShowToastError,
  capitalizeFirstLetter,
  getSelectedSite,
} from '@platformx/utilities';
import { useEffect, useState } from 'react';
import { useStyles } from './CreateUser.styles';
import { useCustomStyle } from './RolePermissions.style';

const RolePermissions = ({
  t,
  roleSelected,
  setRoleSelected,
  state,
  setState,
}: any) => {
  const [runFetchContentList] = useLazyQuery(
    UserManagementQueries.FETCH_ROLE_LIST
  );
  const [runFetchRolesList] = useLazyQuery(
    UserManagementQueries.FETCH_PERMISSION_LIST
  );
  const [roleList, setRoleList] = useState<any[]>([]);
  const handleChange = (event: any) => {
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
      ShowToastError(t('api_error_toast'));
    }
  };
  useEffect(() => {
    getRoleList();
  }, []);
  const classes = useCustomStyle();
  const classess = useStyles();
  return (
    <Box className={classes.mainStyleWrapper} id="rolepermission">
      <CommonBoxWithNumber
        number="03"
        title={t('roles_permissions')}
        titleVarient="p3semibold"
        subTitleVarient="p4regular"
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
