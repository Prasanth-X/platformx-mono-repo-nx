import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchAllPrelemSearchList,
  prelemsApi,
} from '../../../services/prelems/prelems.api';
import { ThemeConstants } from '@platformx/utilities';
import { removeParamsFromURL } from '../../../utils/helperFunctions';
import LeftBox from '../Components/PageContainer/LeftBox';
import PageLayout from '../Components/PageContainer/PageContainer';
import RightBox from '../Components/PageContainer/RightBox';
import CardList from '../Components/PrelemCardLayout/CardList';
import PrelemList from '../Components/PrelemList/PrelemList';
import PrelemSearchHeader from '../Components/PrelemSearchHeader/PrelemSearchHeader';
import SearchBar from '../Components/SearchBox/SearchBar';
import EmptyState from '../emptyState';
import { CategoryStateProps, LayoutStateProps } from '../utils/prelemTypes';
import PrelemLoader from './PrelemLoader/PrelemLoader';
import { useStyles } from './PrelemSearch.styles';
import NoSearchResult from '../../../Common/NoSearchResult';

const SearchPrelem = () => {
  const { t } = useTranslation();
  const url = new URL(window.location.href);
  //GraphQl query fetch
  const [loader, setLoader] = React.useState(false);
  //CategoryList State
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [categoryState, setCategoryState] = useState<CategoryStateProps>({
    categoryIndex: url.searchParams.get('categoryIndex')
      ? url.searchParams.get('categoryIndex')?.split(',')
      : [],
    categoryValue: url.searchParams.get('categoryValue')
      ? url.searchParams.get('categoryValue')?.split(',')
      : [],
  });
  const [suggestiveSearchList, setSuggestiveSearchList] = useState<[]>([]);
  //LayoutList State
  const [layoutList, setLayoutList] = useState<any[]>([]);
  const [layoutState, setLayoutState] = useState<LayoutStateProps>({
    layoutIndex: url.searchParams.get('layoutIndex')
      ? url.searchParams.get('layoutIndex')?.split(',')
      : [],
    layoutValue: url.searchParams.get('layoutValue')
      ? url.searchParams.get('layoutValue')?.split(',')
      : [],
  });
  const [searchValue, setSearchvalue] = React.useState(
    url.searchParams.get('searchText') ? url.searchParams.get('searchText') : ''
  );
  const [inputValue, setInputValue] = React.useState<any>(
    url.searchParams.get('inputValue')
      ? (url.searchParams.get('inputValue') as string)
      : ''
  );
  const [searchCardList, setsearchCardList] = useState<[]>([]);
  const [fetchPrelemSearchList] = useLazyQuery(fetchAllPrelemSearchList);

  useEffect(() => {
    const IsMounted = true;
    window.onpopstate = function (event) {
      if (IsMounted) {
        setCategoryState({
          categoryIndex: url.searchParams.get('categoryIndex')
            ? url.searchParams.get('categoryIndex')?.split(',')
            : [],
          categoryValue: url.searchParams.get('categoryValue')
            ? url.searchParams.get('categoryValue')?.split(',')
            : [],
        });
        setLayoutState({
          layoutIndex: url.searchParams.get('layoutIndex')
            ? url.searchParams.get('layoutIndex')?.split(',')
            : [],
          layoutValue: url.searchParams.get('layoutValue')
            ? url.searchParams.get('layoutValue')?.split(',')
            : [],
        });
      }
    };
  }, []);
  useEffect(() => {
    const getNavigations = async () => {
      await prelemsApi.getTopNavigations().then((res) => {
        const { topnavigation } = res.data.data;
        if (categoryState?.categoryValue?.length > 0) {
          const newCategoryValue = categoryState?.categoryValue.map((item) => {
            return { tag: item, selectedValue: true };
          });
          const newCategoryList = topnavigation.map((t1) => ({
            ...t1,
            ...newCategoryValue.find((t2) => t2.tag === t1.tag),
          }));
          setCategoryList(newCategoryList);
        } else {
          setCategoryList(topnavigation);
        }
      });
    };
    getNavigations();
  }, [categoryState]);

  // Search api call
  useEffect(() => {
    setLoader(true);
    fetchPrelemSearchList({
      variables: {
        obj: { start: 0, rows: 100 },
        sort: 'DESC',
        searchText: searchValue,
        tag:
          categoryState.categoryValue && categoryState.categoryValue.length
            ? categoryState.categoryValue
            : [''],
        layout:
          layoutState.layoutValue && layoutState.layoutValue.length
            ? layoutState.layoutValue
            : [''],
      },
    }).then(async (res) => {
      if (res?.data?.authoring_prelemSearch) {
        const { prelems, layout } = res.data.authoring_prelemSearch;
        await setsearchCardList(prelems);
        if (layoutState?.layoutValue?.length > 0) {
          const newLayoutValue = layoutState?.layoutValue?.map((item) => {
            return { mapping: item, selectedValue: true };
          });
          const newLayoutList = layout.map((t1) => ({
            ...t1,
            ...newLayoutValue.find((t2) => t2.mapping === t1.mapping),
          }));
          await setLayoutList(newLayoutList);
        } else {
          await setLayoutList(layout);
        }
        await setLoader(false);
      } else {
        await setLayoutList([]);
        await setsearchCardList([]);
        await setLoader(false);
      }
    });
  }, [layoutState, searchValue, categoryState]);

  // Suggestive Search api call
  useEffect(() => {
    console.log('1', inputValue);
    if (inputValue?.length > 2) {
      const getSuggestions = async () => {
        await prelemsApi.getPrelemSuggestions(inputValue).then((res) => {
          const { prelemSuggestiveSearch } = res.data.data;
          const result = prelemSuggestiveSearch.map((a) => a.text);
          setSuggestiveSearchList(result);
        });
      };
      getSuggestions();
    }
    if (inputValue === '') {
      console.log('2', inputValue);
      if (
        url.searchParams.get('searchText') ||
        url.searchParams.get('inputValue')
      ) {
        history.replaceState('', '', removeParamsFromURL('searchText'));
        history.replaceState('', '', removeParamsFromURL('inputValue'));
        url.searchParams.set('searchText', '');
        url.searchParams.set('inputValue', '');
        setSearchvalue('');
        setSuggestiveSearchList([]);
      }
    }
  }, [inputValue]);

  // Category Filter Function
  const handleCategoryFilter = (name: string, index: any) => {
    setLoader(true);
    const categoryNewIndexArr: any = categoryState.categoryIndex;
    if (!categoryNewIndexArr.includes(index.toString())) {
      categoryNewIndexArr.push(index.toString());
    } else {
      categoryNewIndexArr.splice(
        categoryNewIndexArr.indexOf(index.toString()),
        1
      );
    }
    const categoryNewValueArr: any = [...categoryState.categoryValue];
    if (!categoryNewValueArr.includes(name)) {
      categoryNewValueArr.push(name);
    } else {
      categoryNewValueArr.splice(categoryNewValueArr.indexOf(name), 1);
    }
    if (categoryNewValueArr.length && categoryNewIndexArr.length) {
      url.searchParams.set('categoryValue', categoryNewValueArr);
      url.searchParams.set('categoryIndex', categoryNewIndexArr);
      window.history.pushState({}, '', url);
      setCategoryState({
        categoryIndex: url.searchParams.get('categoryIndex')?.split(','),
        categoryValue: url.searchParams.get('categoryValue')?.split(','),
      });
    } else {
      history.replaceState('', '', removeParamsFromURL('categoryIndex'));
      history.replaceState('', '', removeParamsFromURL('categoryValue'));
      setCategoryState({
        categoryIndex: [],
        categoryValue: [],
      });
    }

    const categoryNewList = categoryList?.map((item, indx) => {
      if (indx === index) {
        if (!item.selectedValue) {
          return { ...item, selectedValue: true };
        } else {
          return delete item.selectedValue, { ...item };
        }
      } else {
        return { ...item };
      }
    });
    setCategoryList(categoryNewList);
  };

  // Layout Filter Function
  const handleLayoutFilter = (name: any, index: any) => {
    setLoader(true);
    const layoutNewIndexArr: any = layoutState.layoutIndex;
    if (!layoutNewIndexArr.includes(index.toString())) {
      layoutNewIndexArr.push(index.toString());
    } else {
      layoutNewIndexArr.splice(layoutNewIndexArr.indexOf(index.toString()), 1);
    }
    const layoutNewValueArr: any = layoutState.layoutValue;
    if (!layoutNewValueArr.includes(name)) {
      layoutNewValueArr.push(name);
    } else {
      layoutNewValueArr.splice(layoutNewValueArr.indexOf(name), 1);
    }
    if (layoutNewIndexArr.length && layoutNewValueArr.length) {
      url.searchParams.set('layoutValue', layoutNewValueArr);
      url.searchParams.set('layoutIndex', layoutNewIndexArr);
      window.history.pushState({}, '', url);
      setLayoutState({
        layoutIndex: url.searchParams.get('layoutIndex')?.split(','),
        layoutValue: url.searchParams.get('layoutValue')?.split(','),
      });
    } else {
      history.replaceState('', '', removeParamsFromURL('layoutValue'));
      history.replaceState('', '', removeParamsFromURL('layoutIndex'));
      setLayoutState({
        layoutIndex: [],
        layoutValue: [],
      });
    }
  };
  // Reset Search and Filter State
  const handleResetInputFilter = async () => {
    await setLoader(true);
    if (
      url.searchParams.get('categoryIndex') ||
      url.searchParams.get('layoutValue') ||
      url.searchParams.get('layoutIndex') ||
      url.searchParams.get('categoryValue') ||
      url.searchParams.get('searchText') ||
      url.searchParams.get('inputValue')
    ) {
      await history.replaceState('', '', removeParamsFromURL('categoryIndex'));
      await history.replaceState('', '', removeParamsFromURL('layoutValue'));
      await history.replaceState('', '', removeParamsFromURL('layoutIndex'));
      await history.replaceState('', '', removeParamsFromURL('categoryValue'));
      await history.replaceState('', '', removeParamsFromURL('searchText'));
      await history.replaceState('', '', removeParamsFromURL('inputValue'));
      await url.searchParams.set('categoryIndex', '');
      await url.searchParams.set('layoutValue', '');
      await url.searchParams.set('layoutIndex', '');
      await url.searchParams.set('categoryValue', '');
      await url.searchParams.set('inputValue', '');
      await setInputValue('');
    }
    await setSearchvalue('');
    await setSuggestiveSearchList([]);
    await setCategoryState({
      categoryIndex: [],
      categoryValue: [],
    });
    await setLayoutState({
      layoutIndex: [],
      layoutValue: [],
    });
    const categoryNewList = categoryList?.map((item) => {
      return delete item.selectedValue, { ...item };
    });
    await setCategoryList(categoryNewList);
    await setLoader(false);
  };

  const classes = useStyles();
  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down('em'));
  const noMob = useMediaQuery(`@media(min-width:${ThemeConstants.EM - 1}px)`);
  return (
    <>
      {noWeb && <PrelemSearchHeader />}
      <PageLayout>
        {/* {layoutList.length > 0 && ( */}
        <LeftBox>
          <Box className={classes.leftTop}>
            <Typography component="p" variant="p3semibold">
              {t('layouts')}
            </Typography>
            <Typography component="p" variant="h7regular">
              {t('layouts_sub_text')}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <SearchBar
                suggestiveSearchList={suggestiveSearchList}
                categoryList={categoryList}
                handleCategoryFilter={handleCategoryFilter}
                setValue={setSearchvalue}
                setInputValue={setInputValue}
                inputValue={inputValue}
                handleResetInputFilter={handleResetInputFilter}
              />
            </Box>
          </Box>
          <Box className={classes.leftBottom}>
            <CardList
              layoutList={layoutList}
              handleLayoutFilter={handleLayoutFilter}
              layoutState={layoutState}
              searchValue={inputValue}
              categoryState={categoryState}
            />
          </Box>
        </LeftBox>
        {/* )} */}
        {loader ? (
          // <Loader />
          <PrelemLoader />
        ) : (
          <>
            {searchCardList && searchCardList.length ? (
              <RightBox>
                {noMob && <PrelemSearchHeader />}
                <Box sx={{ padding: '15px' }}>
                  <Typography component="p" variant="p1semibold">
                    {t('choose_prelem_text')}
                  </Typography>
                  <Typography component="p" variant="p4regular">
                    {t('choose_prelem_sub_text')}
                  </Typography>
                  <PrelemList searchCardList={searchCardList} />
                </Box>
              </RightBox>
            ) : (
              // <EmptyState
              //   searchInputKeyword={searchValue}
              //   searchCategoryKeyword={categoryState?.categoryValue}
              // />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                  padding: '10px',
                }}
              >
                <NoSearchResult />
                <Button
                  variant="primaryButton"
                  onClick={handleResetInputFilter}
                  sx={{ marginTop: '15px' }}
                  className="sm"
                >
                  Search Again
                </Button>
              </Box>
            )}
          </>
        )}
      </PageLayout>
    </>
  );
};

export default SearchPrelem;
