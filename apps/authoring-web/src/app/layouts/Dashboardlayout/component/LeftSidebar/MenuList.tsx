/* eslint-disable no-debugger */

import { Box } from '@mui/material';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

import { PollIcon } from '@platformx/utilities';
import MenuItems from './MenuItems';
import { ShowToastError, useUserSession } from '@platformx/utilities';
import { contentTypeSchemaApi } from '@platformx/authoring-apis';
import MenuSitesListDropdown from '../../../../components/MenuSitesListDropdown/MenuSitesListDropdown';
import { MenuData } from '../../../../hooks/useDynamicRoutes/menuData';

export default function Menu(props) {
  const [getSession] = useUserSession();
  const [dynamicMenu, setDynamicMenu] = useState<any>();
  const { permissions } = getSession();
  const filtered = permissions
    ?.map((val) => val?.category?.toLowerCase())
    ?.filter((val, index, arr) => arr.indexOf(val) === index);
  const fetchSchema = async () => {
    return contentTypeSchemaApi.getSchema();
  };
  const getSchema = async () => {
    try {
      const detailsRes: any = await fetchSchema();
      const menu: any = [];

      detailsRes?.authoring_getDocument?.map((val, i) => {
        return menu.push({
          MenuName: val?.title,
          Icon: <img alt='settings' src={PollIcon} />,
          url: `/content/${val?.name}`,
          id: val?.title,
          category: 'content',
          subCategory: '',
        });
      });

      const menuArr = [
        { url: '', Title: 'content', id: 'content', Menu: menu },
      ];
      const temp: any = MenuData.filter((val) => {
        return val.id === 'content' ? val['Menu'].push(...menu) : val;
      });

      setDynamicMenu(temp);
    } catch (err: any) {
      console.info('error in MenuList', err);
      ShowToastError(t('api_error_toast'));
    }
  };
  useEffect(() => {
    getSchema();
  }, []);

  return (
    <Box className="menulist">
      <MenuSitesListDropdown />

      {dynamicMenu?.map((val, index) => {
        const isShow = filtered?.includes(val.id);
        return (
          isShow && (
            <MenuItems
              key={index}
              Title={val.Title}
              MenuName={val.Menu}
              open={props.open}
              roles={val.roles}
              props={val}
              url={val.url}
              handleMenuclose={props.handleMenuclose}
              handleMenuAction={props.handleMenuAction}
            />
          )
        );
      })}
    </Box>
  );
}
