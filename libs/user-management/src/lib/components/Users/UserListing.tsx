import { Box } from '@mui/material';
import { userManagementAPI } from '@platformx/authoring-apis';
import {
    ContentListDesktopLoader,
  ContentGridLoader,
  capitalizeWords,
} from '@platformx/utilities';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../UserManagement.css';
import ListView from './ListView';
import TopHeader from './TopHeader';
import './User.css';
import { USERTYPES } from './Utils/constant';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [baseUsers, setBaseUsers] = useState([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState(USERTYPES.AUTHORINGUSER);
  const gridListViewLoaderDesktop = (viewType = '') => {
    if (viewType === 'List') {
      return < ContentListDesktopLoader />;
    }
    return <ContentGridLoader />;
  };

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response: any = await userManagementAPI.fetchUsers({
        start: 0,
        rows: 5000,
        isAuthoringUser: filterValue === USERTYPES.AUTHORINGUSER,
        isRenderingUser: filterValue === USERTYPES.ENDUSER,
        isCommunityUser: filterValue === USERTYPES.COMMUNITYUSER,
      });
      if (
        response?.authoring_userList &&
        response?.authoring_userList?.length > 0
      ) {
        const userList = [...(response?.authoring_userList || [])];
        const sortedUserList: any = userList?.sort(
          (a, b) => b?.created_timestamp - a.created_timestamp
        );
        setBaseUsers(sortedUserList);
        setUsers(sortedUserList);
      }
      setIsLazyLoad(false);
      setLoading(false);
    } catch (err: any) {
      setIsLazyLoad(false);
      setLoading(false);
    }
  }, [filterValue]);

  useEffect(() => {
    getUsers();
  }, [filterValue, getUsers]);

  const handleSearch = useCallback(
    (query: string) => {
      const filteredUsers = baseUsers.filter((user) =>
        Object.values(user).some(
          (value) =>
            typeof value === 'string' && value.toLowerCase().includes(query)
        )
      );
      setUsers(filteredUsers);
    },
    [baseUsers]
  );

  return (
    <>
      <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
        <TopHeader
          handleSearch={handleSearch}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </Box>
      <Box
        id="scrollableDiv"
        sx={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
      >
        {isloading ? (
          <>{gridListViewLoaderDesktop('List')} </>
        ) : (
          <InfiniteScroll
            dataLength={getUsers ? getUsers?.length : 0}
            next={getUsers}
            hasMore={isLazyLoad}
            loader={gridListViewLoaderDesktop('List')}
            scrollableTarget="scrollableDiv"
            style={{ overflowX: 'hidden' }}
          >
            {users?.length > 0 && (
              <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
                <Box>
                  {users?.map((item: any) => {
                    return (
                      <ListView
                        key={item.user_id}
                        enabled={item.enabled}
                        first_name={capitalizeWords(item.first_name)}
                        last_name={capitalizeWords(item.last_name)}
                        image={item.image}
                        email={item.email}
                        user_id={item.user_id}
                        timezone={item.timezone}
                        action_pending={item.action_pending}
                        created_timestamp={item.created_timestamp}
                        handleReload={getUsers}
                        roles={item.roles}
                        filterValue={filterValue}
                        adminAction={item?.admin_action}
                      />
                    );
                  })}
                </Box>
              </Box>
            )}
          </InfiniteScroll>
        )}
      </Box>
    </>
  );
};

export default UserListing;
