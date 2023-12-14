import { useLazyQuery } from '@apollo/client';
import { Box } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';
import {
  FETCH_CONTENT_TYPE_LIST_ALL,
  FETCH_VOD_LIST_ALL,
  FETCH_VOD_SUGGESTIVE_SEARCH,
} from '../../graphql/fetchQueries';
import { Store } from '../../store/ContextStore';
import { capitalizeFirstLetter } from '../../utils/helperFunctions';
import { updateInitialState } from '../vod/store/Actions';
import './UserManagement.css';
import UserDetails from './Users/UserDetails';
import UserListing from './Users/UserListing';

export default function Users() {
  const [userDetails, setUserDetails] = React.useState(false);
  const { t, i18n } = useTranslation();
  const { dispatch, state } = useContext(Store);
  const [sortOrder, setSortOrder] = useState('DESC');
  const searchPageUrl = new URL(window.location.href);
  const [searchTerm, setSearchTerm] = useState(
    searchPageUrl.searchParams.get('searchTerm')
      ? (searchPageUrl.searchParams.get('searchTerm') as string)
      : ''
  );
  const [inputValue, setInputValue] = React.useState<any>(
    searchPageUrl.searchParams.get('inputValue')
      ? (searchPageUrl.searchParams.get('inputValue') as string)
      : ''
  );
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [dateObj, setDateObj] = useState({ from: '', to: '' });
  const [rows, setRows] = useState<number>(10);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(false);
  const [runFetchVodList] = useLazyQuery(FETCH_VOD_LIST_ALL);
  const [runFetchVodSuggestions] = useLazyQuery(FETCH_VOD_SUGGESTIVE_SEARCH);
  const [searchResults, setSearchResults] = useState<any>([{}]);
  const [filterValue, setFilterValue] = useState('ALL');
  const [isClicked, setisClicked] = useState(false);
  const [isClickedMob, setisClickedMob] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchHeaderOpen, setIsSearchHeaderOpen] = useState(false);
  const [runFetchContentList] = useLazyQuery(FETCH_CONTENT_TYPE_LIST_ALL);
  const [newSearchTerm, setNewSearchTerm] = useState('');
  const [contentType, setContentType] = useState(
    capitalizeFirstLetter(searchPageUrl?.pathname?.split('/')?.[4])
  );
  const closeSuggest = () => {
    setShowSearchSuggestions(false);
  };
  const onclickDesk = (value) => {
    setisClicked(value);
  };
  const onclickMob = (value) => {
    setisClickedMob(value);
  };
  const navigate = useNavigate();
  const createContent = () => {
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };
  const handleContentSearch = (contentSearchTerm) => {
    setStartIndex(0);
    setLoading(true);
    setIsLazyLoad(true);
    setFilterValue('ALL');
    setSearchTerm(contentSearchTerm);
    setSearchResults([]);
    searchPageUrl?.searchParams?.set('searchTerm', contentSearchTerm);
    window?.history?.pushState({}, '', searchPageUrl);
    setInputValue(searchPageUrl?.searchParams?.get('searchTerm'));
    runFetchContentList({
      variables: {
        contentType: contentType,
        pageFilter: filterValue,
        pagination: { start: startIndex, rows: rows },
        sort: sortOrder,
        searchTerm: searchPageUrl.searchParams.get('searchTerm')
          ? searchPageUrl.searchParams.get('searchTerm')
          : '',
      },
    })
      .then((resp) => {
        dispatch(updateInitialState(resp?.data?.authoring_getContentTypeItems));
        setLoading(false);
        setIsLazyLoad(false);
        closeSuggest();
      })
      .catch((err) => {
        setIsLazyLoad(false);
        setLoading(false);
        showToastError(t('api_error_toast'));
        console.log(JSON.stringify(err, null, 2));
      });
  };
  //To set results on page refresh
  useEffect(() => {
    if (searchPageUrl?.searchParams?.get('searchTerm')) {
      handleContentSearch(searchPageUrl.searchParams.get('searchTerm'));
    }
  }, [searchTerm]);

  //Page Search functionlity Start
  const handleSearch = (searchVal) => {
    if (!searchVal) {
      setSearchResults([]);
    } else {
      runFetchVodSuggestions({
        variables: {
          obj: { start: startIndex, rows: rows },
          type: 'ALL',
          sort: sortOrder,
          searchTerm: searchVal,
          dateFilter: { from: '', to: '' },
        },
      })
        .then((resp) => {
          setShowSearchSuggestions(true);
          setSearchResults(resp?.data?.authoring_getvodList);
        })
        .catch((err) => {
          setIsLazyLoad(false);
          setLoading(false);
          console.log(JSON.stringify(err, null, 2));
        });
    }
  };

  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }
  const handleSearchChange = useCallback(
    debounce((value) => handleSearch(value)),
    []
  );
  function formateToDate(datetime) {
    const y = datetime.getFullYear();
    let m = datetime.getUTCMonth() + 1;
    m = m < 10 ? `0${m}` : m;
    let d = datetime.getUTCDate();
    d = d < 10 ? `0${d}` : d;
    return `${y}-${m}-${d}`;
  }
  useEffect(() => {
    if (searchPageUrl?.searchParams?.get('inputValue'))
      handleSearchChange(searchPageUrl?.searchParams?.get('inputValue'));
  }, [inputValue]);
  const readDate = ({ startDate, endDate }) => {
    const sd = formateToDate(startDate);
    const ed = formateToDate(endDate);
    setDateObj({ from: sd, to: ed });
    //console.log(endDate);
  };
  const onSearch = (value) => {
    setNewSearchTerm(value);
  };

  return (
    <>
      <Outlet />
      <Box>
        <Box>{userDetails ? <UserDetails /> : <UserListing />}</Box>
      </Box>
    </>
  );
}
