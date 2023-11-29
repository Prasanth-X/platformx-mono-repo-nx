import { Box } from '@mui/material';
import { MenuData } from '../../Utils/constants';
import MenuItems from './MenuItems';
import useUserSession from '../../../../hooks/useUserSession/useUserSession';
import MenuSitesListdropdown from '../../../../Common/MultisiteDropdown/MenuSitesListdropdown';

export default function Menu(props) {
  const [getSession] = useUserSession();
  const { permissions } = getSession();
  const filtered = permissions?.map((val) => val?.category?.toLowerCase())?.filter((val, index, arr) => arr.indexOf(val) === index)

  return (
    <Box className='menulist'>
      <MenuSitesListdropdown/>
      {MenuData.map((val, index) => {
        const isShow = filtered?.includes(val.id)
        return isShow && (
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
        );
      })}
    </Box>
  );
}
