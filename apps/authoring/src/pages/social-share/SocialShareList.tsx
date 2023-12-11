import { useLazyQuery, useMutation } from '@apollo/client';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommonDeskTopFilter from '../../Common/CommonFilter/CommonDeskTopFilter';
import CommonMobileFilter from '../../Common/CommonFilter/CommonMobileFilter';
import PlateformXDialog from '../../components/Modal';
import PlateformXSocialDialog from '../../components/SocialShareModal/socialShareModal';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import {
  cancelSocialSharePost,
  fetchSocialShareList,
} from '../../services/socialShare/socialShare.api';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { nullToArray, nullToObject } from '../../utils/helperFunctions';
import ArticelSearchHeader from '../articles/article-search-header/ArticleSearchHeader';
import SocialShareDeskTopView from './SocialShareDeskTopView';
import SocialShareMobileView from './SocialShareMobileView';

const arrayData = [
  {
    id: 1,
    label: 'All',
    value: 'ALL',
  },
  {
    id: 2,
    label: 'Scheduled',
    value: 'SCHEDULED_PUBLISH',
  },
  {
    id: 2,
    label: 'Shared',
    value: 'PUBLISHED',
  },
];

const SocialShareList = () => {
  const { t } = useTranslation();
  const searchPageUrl = new URL(window.location.href);
  const rowList = 20;
  const listApiCalledOrNot = useRef<boolean>(false); //list api call is trigger detect
  const [runFetchContentList] = useLazyQuery(fetchSocialShareList);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(false);
  const [isMoreLoad, setIsMoreLoad] = useState<boolean>(true);
  const [socialShareListResponse, setSocialShareListResponse] = useState<any>(
    {}
  );
  const [socialShareSelectedResponse, setSocialShareSelectedResponse] =
    useState<any>();
  const [listResponseArray, setListResponseArray] = useState<any>([]);
  const [listItem, setSelectedUserdata] = useState<any>([]);
  const [isCancel, setIsCancel] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchPageUrl.searchParams.get('searchTerm')
      ? (searchPageUrl.searchParams.get('searchTerm') as string)
      : ''
  );
  const [articleSettingsPanelState] = useState<boolean>(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchHeaderOpen, setIsSearchHeaderOpen] = useState(false);
  const [openSocialShareModal, setSocialShareModal] = useState(false);
  const [socialShareCancel] = useMutation(cancelSocialSharePost);
  const [searchData, setSearchData] = useState<any>({
    startIndex: 0,
    startRow: rowList,
    filterValue: 'ALL',
  });
  const { filterValue = '' } = searchData;

  const socialShareData = {
    Title: listItem?.item_title,
    Description: listItem?.item_description,
    Page: listItem?.item_path,
    PageSettings: {
      SocialOgTitle: listItem?.item_title,
      SocialOgImage: listItem?.item_Thumbnail,
      SocialOgDescription: listItem?.item_description,
    },
    Caption: listItem?.post_title,
    ShareType: listItem?.share_type,
    ScheduleDate: listItem?.SchduledPublishTriggerDateTime,
    NetworkType: listItem?.social_share_platform,
    postURL: listItem?.post_link,
    contentType: listItem?.item_type,
    reSchedulePostUrl: listItem?.current_page_url,
    Thumbnail: listItem?.item_Thumbnail,
  };
  const socialShareArticleData = {
    Title: listItem?.item_title,
    Description: listItem?.item_description,
    Page: listItem?.item_path,
    ArticleSettings: {
      SocialOgTitle: listItem?.item_title,
      SocialOgImage: listItem?.item_Banner,
      SocialOgDescription: listItem?.item_description,
    },
    Caption: listItem?.post_title,
    ShareType: listItem?.share_type,
    ScheduleDate: listItem?.SchduledPublishTriggerDateTime,
    NetworkType: listItem?.social_share_platform,
    postURL: listItem?.post_link,
    contentType: listItem?.item_type,
    reSchedulePostUrl: listItem?.current_page_url,
    Banner: listItem?.item_Banner,
  };

  const reloadSocialShareListAPI = async (listData, eventType) => {
    const { startRow = 0, startIndex = 0 } = searchData;
    setIsLazyLoad(true); //loader enable
    runFetchContentList({
      variables: {
        contentType: 'SocialShare',
        pageFilter: filterValue,
        pagination: { start: startIndex, rows: startRow },
        sort: 'DESC',
        searchTerm: searchPageUrl.searchParams.get('searchTerm')
          ? searchPageUrl.searchParams.get('searchTerm')
          : '',
      },
    })
      .then((resp: any) => {
        listApiCalledOrNot.current = true; //api call is trigger
        const { data: { authoring_getContentTypeItems: authList = [] } = {} } =
          nullToObject(resp);
        if (nullToArray(authList).length !== 0) {
          //infinity scroll fetchMore unwanted hit
          //const newArr = [...listResponseArray, ...authList];
          if (eventType === 'cancel') {
            const responseArr = authList.filter(function (obj) {
              return obj?.current_page_url !== listData?.current_page_url;
            });
            setListResponseArray(responseArr);
          } else {
            setListResponseArray(authList);
          }
          setSocialShareListResponse(resp); //response
        } else {
          setIsMoreLoad(false);
        }
        setIsLazyLoad(false); //loader disable
      })
      .catch((err) => {
        listApiCalledOrNot.current = true; //api call is trigger
        setListResponseArray([]);
        setSocialShareListResponse({}); //response empty
        setIsLazyLoad(false); //loader disable
      });
  };

  const socialShareGetCallApi = () => {
    const { startRow = 0, startIndex = 0 } = searchData;
    setIsLazyLoad(true); //loader enable
    runFetchContentList({
      variables: {
        contentType: 'SocialShare',
        pageFilter: filterValue,
        pagination: { start: startIndex, rows: startRow },
        sort: 'DESC',
        searchTerm: searchPageUrl.searchParams.get('searchTerm')
          ? searchPageUrl.searchParams.get('searchTerm')
          : '',
      },
    })
      .then((resp: any) => {
        listApiCalledOrNot.current = true; //api call is trigger
        const { data: { authoring_getContentTypeItems: authList = [] } = {} } =
          nullToObject(resp);
        if (nullToArray(authList).length !== 0) {
          //infinity scroll fetchMore unwanted hit
          const newArr = [...listResponseArray, ...authList];
          setListResponseArray(newArr);
          setSocialShareListResponse(resp); //response
        } else {
          setIsMoreLoad(false);
        }
        setIsLazyLoad(false); //loader disable
      })
      .catch((err) => {
        listApiCalledOrNot.current = true; //api call is trigger
        setListResponseArray([]);
        setSocialShareListResponse({}); //response empty
        setIsLazyLoad(false); //loader disable
      });
  };

  const closeButtonHandle = () => {
    setSocialShareModal(false);
  };

  /**
   * mobile option select
   */
  const handleUserSelectData = (optionData, listData) => {
    setSelectedUserdata(listData);
    //Reschedule function
    if (optionData?.id == 1) {
      setSocialShareModal(true);
      setIsSideMenuOpen(false);
    }
    //Cancel function start
    if (optionData?.id == 2) {
      setIsSideMenuOpen(false);
      setIsCancel(true);
    }
    //Cancel function End
  };
  const cancelSocialShare = (listData: any) => {
    setIsLazyLoad(true); //loader enable
    const input = {
      page: listData?.current_page_url.replace(/^\/|\/$/g, ''),
      currentpageurl: listData?.current_page_url,
      postUniqueId: '',
    };
    socialShareCancel({
      variables: {
        input: { postInfo: input },
        shareType: [listData?.social_share_platform],
        contentType: 'SocialShare',
      },
    })
      .then((res) => {
        showToastSuccess(t('social_share_cancel_msg'));
        reloadSocialShareListAPI(listData, 'cancel');

        setIsLazyLoad(false); //loader disable
      })
      .catch((error) => {
        showToastError(t('social_share_cancel_error_msg'));
        setIsLazyLoad(false); //loader disable
      });
  };
  /**
   * deskTop option select
   */

  const reloadSocialShare = async (listData) => {
    reloadSocialShareListAPI(listData, 'reschedule');
    // socialShareGetCallApi()
  };
  const handleUserSelectDataDeskTop = (listData) => {
    setSocialShareSelectedResponse(listData);
    cancelSocialShare(listData);
  };

  const cancelPopup = {
    unpublishTitle: 'Cancel Social Share',
    unpublishDescription: 'Are you sure you want to cancel the social share?',
    unpublishCloseText: 'No',
    unpublishConfirmText: 'Yes',
  };
  const unpublishCloseButtonHandle = () => {
    setIsCancel(false);
  };
  const unpublishConfirmButtonHandle = () => {
    setSocialShareSelectedResponse(listItem);
    cancelSocialShare(listItem);
    setIsCancel(false);
  };

  /**
   * filter search
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value = '' } = {} } = event;
    const newObj = {
      ...searchData,
      startIndex: 0,
      startRow: 20,
      filterValue: value,
    };
    listApiCalledOrNot.current = false;
    setSearchData(newObj);
    setListResponseArray([]);
    setSocialShareListResponse({}); //response empty
  };

  const fetchMoreData = () => {
    const { startIndex = 0 } = searchData;
    const newObj = {
      ...searchData,
      startRow: rowList,
      startIndex: startIndex + rowList,
    };
    setSearchData(newObj);
  };
  useEffect(() => {
    socialShareGetCallApi();
  }, [searchData]);
  return (
    <React.Fragment>
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: {
              sm: '60px 20px 20px 20px',
              md: '15px 10px',
              xl: '15px',
            },
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: { sm: '6%', xs: '100%', md: '6%', lg: '6%' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Typography
              sx={{
                padding: '0 0 0 3px',
                color: ThemeConstants.BLACK_COLOR,
                fontFamily: ThemeConstants.FONTSIZE_H4,
                fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
                textTransform: 'capitalize',
              }}
            >
              {t('post')}
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: { sm: '70%', xs: '100%', md: '70%', lg: '75%' },
            }}
          >
            {false && (
              <ArticelSearchHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setIsSearchHeaderOpen={setIsSearchHeaderOpen}
                handleSearchChange={undefined}
              />
            )}
          </Box>

          {/* <Box
            sx={{
              width: '100%',
              height: '50px',
              display: { xs: 'block', sm: 'none' },
              margin: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '50px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  onClick={() => {
                    setIsSideMenuOpen(true);
                  }}
                  sx={{ marginRight: '5px', cursor: 'pointer' }}
                >
                  <MenuIcon sx={{ verticalAlign: 'middle' }} />
                </Box>
                <Box>
                  <Typography
                    variant='h4bold'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {t('all_posts')}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isSearchHeaderOpen ? (
                  <Box sx={{ marginLeft: '10px' }}>
                    <ArticelSearchHeader
                      // handlePageSearch={() => {}}
                      // handleResetInputFilter={() => {}}
                      searchTerm={searchTerm}
                      setIsSearchHeaderOpen={setIsSearchHeaderOpen}
                      setSearchTerm={setSearchTerm}
                      // handleSearchChange={() => {}}
                    />
                  </Box>
                ) : (
                  <Box sx={{ marginRight: '13px' }}>
                    <SearchIcon
                      sx={{ verticalAlign: 'middle' }}
                      onClick={() => setIsSearchHeaderOpen(true)}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box> */}
        </Box>

        <Box
          sx={{
            backgroundColor: '#f7f7f7',
            padding: '15px',
            position: 'relative',
            height: 'calc(100vh - 55px)',
            overflowY: articleSettingsPanelState ? '' : 'scroll',
            overflowX: 'hidden',
            paddingBottom: { xs: '150px', sm: '0' },
          }}
          id="scrollableDiv"
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Box
                sx={{
                  margin: '0 0 0 3px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5regular"
                  sx={{
                    letterSpacing: '0',
                    fontSize: { xs: '12px', sm: '14px' },
                    color: '#2d2d39',
                    textTransform: 'capitalize',
                  }}
                >
                  {t('post')}
                </Typography>
                <NavigateNextRoundedIcon
                  fontSize="small"
                  sx={{ color: 'gray', margin: '0 5px' }}
                />
                <FolderRoundedIcon
                  fontSize="small"
                  sx={{ color: '#fdbf00', marginRight: '5px' }}
                />
                <Typography
                  variant="h5regular"
                  sx={{
                    letterSpacing: '0',
                    fontSize: { xs: '12px', sm: '14px' },
                    color: '#2d2d39',
                    textTransform: 'capitalize',
                  }}
                >
                  {t('all_posts')}
                </Typography>
              </Box>
            </Box>

            <CommonDeskTopFilter
              arrayData={arrayData}
              filterValue={filterValue}
              handleChange={handleChange}
            />

            <Box
              sx={{
                padding: { xs: '4px', md: '7px 15px' },
                marginRight: '10px',
                borderRadius: '3px',
                border: '1px solid #ced3d9',
                display: { xs: 'flex', md: 'none' },
                cursor: 'pointer',
                fontSize: '12px',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <CommonMobileFilter
                arrayData={arrayData}
                filterValue={filterValue}
                handleChange={handleChange}
              />
            </Box>
          </Box>

          <Box>
            {/* deskTop list */}
            <SocialShareDeskTopView
              isMoreLoad={isMoreLoad}
              isLazyLoad={isLazyLoad}
              fetchMoreData={fetchMoreData}
              listResponseArray={listResponseArray}
              listApiCalledOrNot={listApiCalledOrNot.current}
              socialShareListResponse={socialShareListResponse}
              handleUserSelectDataDeskTop={handleUserSelectDataDeskTop}
              socialShareGetCallApi={socialShareGetCallApi}
              reloadAPI={reloadSocialShare}
            />

            {/* mobile list */}
            <SocialShareMobileView
              isMoreLoad={isMoreLoad} //fetchMore handle
              isLazyLoad={isLazyLoad}
              fetchMoreData={fetchMoreData}
              listResponseArray={listResponseArray}
              handleUserSelectData={handleUserSelectData}
              listApiCalledOrNot={listApiCalledOrNot.current}
              socialShareListResponse={socialShareListResponse}
            />
            {openSocialShareModal ? (
              <PlateformXSocialDialog
                isDialogOpen={openSocialShareModal}
                closeButtonHandle={closeButtonHandle}
                setSelectedItem={
                  listItem?.item_type == 'article'
                    ? socialShareArticleData
                    : socialShareData
                }
                contentType="video"
              />
            ) : null}
            {isCancel ? (
              <PlateformXDialog
                isDialogOpen={isCancel}
                title={cancelPopup?.unpublishTitle}
                subTitle={cancelPopup?.unpublishDescription}
                closeButtonText={cancelPopup?.unpublishCloseText}
                confirmButtonText={cancelPopup?.unpublishConfirmText}
                closeButtonHandle={unpublishCloseButtonHandle}
                confirmButtonHandle={unpublishConfirmButtonHandle}
              />
            ) : null}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default React.memo(SocialShareList);
