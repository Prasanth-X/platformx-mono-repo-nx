import { Box } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import SpaceListingHeader from './Components/SpaceListingHeader';
import SpaceListingCard from './Components/SpaceListingCard';
import { useStyles } from './Space.styles';
import ContentListLoader from '../../components/Loader/ContentListLoader';
import NoResultsFound from '../../Common/NoResultsFound';
import { getSpacesList } from './SpacesHelper';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { useMutation } from '@apollo/client';
import {
  DELETE_SPACE,
  INVITE_MEMBERS_TO_SPACE,
  JOIN_SPACE,
  LEAVE_SPACE,
} from '../../graphql/Community/SpaceQueries';

export default function Space() {
  const { t } = useTranslation();
  const defaultRow = 20;
  const [deleteSpace] = useMutation(DELETE_SPACE);
  const [leaveSpace] = useMutation(LEAVE_SPACE);
  const [joinSpace] = useMutation(JOIN_SPACE);
  const [inviteMembersToSpace] = useMutation(INVITE_MEMBERS_TO_SPACE);
  const [spaceList, setSpaceList] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const classes = useStyles();
  const [searchTerms, setSearchTerms] = useState({
    start: 0,
    searchTerm: '',
  });
  const isSearch = useRef(false);
  const assignSpacestoStateLogic = useCallback(
    async (searchTermsData: any) => {
      try {
        const spaceListResponse = await getSpacesList(searchTermsData);
        if (spaceListResponse.length < 20) {
          setIsNext(false);
        } else {
          setIsNext(true);
        }
        if (isSearch.current) {
          setSpaceList(spaceListResponse);
        } else {
          setSpaceList((prevState) => {
            return [...prevState, ...spaceListResponse];
          });
        }
      } catch (err) {
        showToastError(t('api_error_toast'));
      }
      isSearch.current = false;
    },
    [t]
  );

  const deleteSpaceHandler = async (id: string, title: string) => {
    try {
      const response = await deleteSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        isSearch.current = true;
        setSearchTerms((prevState) => {
          return {
            ...prevState,
            start: 0,
          };
        });
        showToastSuccess(`${title} ${t('deleted_toast')}`);
      }
    } catch (error: any) {
      showToastError(error?.graphQLErrors[0]?.message || t('api_error_toast'));
    }
  };

  const leaveSpaceHandler = async (id: string, title: string) => {
    try {
      const response = await leaveSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        isSearch.current = true;
        setSearchTerms((prevState) => {
          return {
            ...prevState,
            start: 0,
          };
        });
        showToastSuccess(t('left_toast'));
      }
    } catch (error: any) {
      showToastError(error?.graphQLErrors[0]?.message || t('api_error_toast'));
    }
  };
  const joinSpaceHandler = async (id: string, title: string) => {
    try {
      const response = await joinSpace({
        variables: {
          id: id,
        },
      });
      if (response) {
        isSearch.current = true;
        setSearchTerms((prevState) => {
          return {
            ...prevState,
            start: 0,
          };
        });
        showToastSuccess(t('join_toast'));
      }
    } catch (error: any) {
      showToastError(error?.graphQLErrors[0]?.message || t('api_error_toast'));
    }
  };
  const inviteMembersHandler = async (
    id: string,
    removeMembers: any,
    inviteMembers: any,
    cancleMembers: any
  ) => {
    try {
      const response = await inviteMembersToSpace({
        variables: {
          spaceId: id,
          removeMembers: removeMembers,
          inviteMembers: inviteMembers,
          cancelMembers: cancleMembers,
        },
      });
      if (response) {
        isSearch.current = true;
        setSearchTerms((prevState) => {
          return {
            ...prevState,
            start: 0,
          };
        });
        showToastSuccess(t('invite_toast'));
      }
    } catch (error: any) {
      showToastError(error?.graphQLErrors[0]?.message || t('api_error_toast'));
    }
  };

  const pagination = () => {
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        start: prevState.start + defaultRow,
      };
    });
  };

  const handleSearch = useCallback((data: string) => {
    isSearch.current = true;
    setSearchTerms((prevState) => {
      return {
        ...prevState,
        start: 0,
        searchTerm: data,
      };
    });
  }, []);

  useEffect(() => {
    assignSpacestoStateLogic(searchTerms);
  }, [assignSpacestoStateLogic, searchTerms]);

  return (
    <Box className={`${classes.container} main-container`}>
      <Box className='spaceHeader'>
        <SpaceListingHeader title='space' handleSearch={handleSearch} />
      </Box>
      <Box id='scrollableDiv' className='spaceListing'>
        {isNext || spaceList?.length > 0 ? (
          <InfiniteScroll
            next={pagination}
            dataLength={spaceList?.length || 0}
            loader={<ContentListLoader />}
            scrollableTarget='scrollableDiv'
            style={{ overflowX: 'hidden' }}
            hasMore={isNext}
          >
            <Box className='spacelistCard'>
              <Box>
                {spaceList?.map((item, index) => (
                  <SpaceListingCard
                    key={`${item.id} ${index.toString()}`}
                    dataList={item}
                    dataType='Space'
                    deleteSpace={deleteSpaceHandler}
                    leaveSpace={leaveSpaceHandler}
                    joinSpace={joinSpaceHandler}
                    inviteMembers={inviteMembersHandler}
                  />
                ))}
              </Box>
            </Box>
          </InfiniteScroll>
        ) : (
          <NoResultsFound />
        )}
      </Box>
    </Box>
  );
}
