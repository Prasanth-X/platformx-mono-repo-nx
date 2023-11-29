import { useLazyQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Box, Button, Divider, Fab, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/images/no-results.png';
import ArticleListDesktopLoader from '../../pages/articles/articel-list-loder-desktop';
import ArticleListMobileLoader from '../../pages/articles/article-list-loader-mobile';
import { fetchContentTypeList } from '../../services/contentTypes/contentTypes.api';
import ThemeConstants from '../../theme/variable';
import { debounce } from '../../utils/helperFunctions';
import DesktopListing from '../Common/selectListing/DesktopListing';
import ListHeader from '../Common/selectListing/ListHeader';
import ListSubHeader from '../Common/selectListing/ListSubHeader';
import MobileListing from '../Common/selectListing/MobileListing';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';

const QuestionListing = ({
  setIsClickedQueList,
  quizState,
  setQuizState,
  setOpenAddQuestion,
  qusUnsavedChanges,
  handleQuesReturn,
  unsavedChanges,
}) => {
  const { t } = useTranslation();
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(true);
  const [isDataSelect, setIsDataSelect] = React.useState(null);
  const [selectedData, setSelectedData] = useState<any>({});
  const [isDone, setIsDone] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([{}]);
  const searchPageUrl = new URL(window.location.href);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [filterValue, setFilterValue] = useState('ALL');
  const [addQuestion, setAddQuestion] = useState<boolean>(false);
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
  const [menuItem, setMenuItem] = useState(t('questions'));
  const questionsList = quizState?.questions;
  const [questions, setQuestions] = useState<any>([]);
  // const [selectedIdArray, setSelectedIdArray] = React.useState<
  //   { question: string }[]
  // >(quizState?.questions ? quizState?.questions : []);
  const [selectedIdArray, setSelectedIdArray] = React.useState<
    { current_page_url: string }[]
  >(quizState?.questions ? quizState?.questions : []);

  const [runFetchQuestionList] = useLazyQuery(fetchContentTypeList);
  const [rows, setRows] = useState<number>(20);

  const getQuestionList = (ind, search = '') => {
    // setIsLazyLoad(true);
    // setLoading(true);
    runFetchQuestionList({
      variables: {
        pagination: { start: ind, rows },
        pageFilter: 'ALL',
        sort: 'DESC',
        searchTerm: search,
        contentType: 'Question',
      },
    })
      .then((res) => {
        const filtered = (res?.data?.authoring_getContentTypeItems || []).filter((val) => !val.current_page_url.startsWith('/'))
        const newData = [
          ...(questions || []),
          ...(filtered || []),
        ];

        setQuestions(() => newData);
        if (res?.data?.authoring_getContentTypeItems?.length == 0) {
          setIsLazyLoad(false);
        }
        // setIsLazyLoad(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsLazyLoad(false);
        showToastError(t('api_error_toast'));
      });
  };

  const fetchMoreData = () => {
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    getQuestionList(nextIndex, searchTerm);
  };

  const handleSearchChange1 = useCallback(
    debounce((ind, sear) => getQuestionList(ind, sear)),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    handleSearchChange1(startIndex, searchTerm);
  }, [searchTerm]);

  const dropDownList = [t('questions')];
  const onClickSelect = (val) => {
    const a = selectedIdArray.some(
      (item) => item.current_page_url === val.current_page_url
    );

    if (
      selectedIdArray.some(
        (item) => item.current_page_url === val.current_page_url
      )
    ) {
      setSelectedIdArray((current) =>
        current.filter((data) => data.current_page_url !== val.current_page_url)
      );
      // const que = questionsList.filter(
      //   (item) => item.question !== val.question
      // );
      // setQuizState({ ...quizState, questions: [...que] });
    } else {
      setSelectedIdArray((prev) => [
        ...prev,
        { current_page_url: val.current_page_url },
      ]);
      // setQuizState({
      //   ...quizState,
      //   questions: [...quizState.questions, val],
      // });
      setSelectedData({ ...selectedData, val });
    }
  };
  useEffect(() => {
    if (selectedIdArray.length > 0) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [selectedIdArray]);
  const isSelected = (data) => {
    const a = selectedIdArray.some(
      (item) => item.current_page_url === data.current_page_url
    );
    return a;
  };
  const returnBack = () => {
    setIsClickedQueList(false);
  };
  const handleDone = () => {
    const newQuestions = selectedIdArray.map((item) => {
      const question = questions.find(
        ({ current_page_url }) => current_page_url === item.current_page_url
      );
      if (question) {
        return question;
      }
      return item;
    });

    if (quizState?.questions?.length > 16 || newQuestions.length > 16) {
      showToastError(t('allowed_tags_toast'));
    } else {
      setQuizState({ ...quizState, questions: [...newQuestions] });
      setIsClickedQueList(false);
      unsavedChanges.current = true;
    }
  };
  // const handleVODSearch = (vodSearchName) => {
  //   setStartIndex(0);
  //   setLoading(true);
  //   setIsLazyLoad(true);
  //   setFilterValue("ALL");
  //   setSearchTerm(vodSearchName);
  //   setSearchResults([]);
  //   searchPageUrl?.searchParams?.set("searchTerm", vodSearchName);
  //   window?.history?.pushState({}, "", searchPageUrl);
  //   setInputValue(searchPageUrl?.searchParams?.get("searchTerm"));
  //   runFetchVodList({
  //     variables: {
  //       obj: { start: 0, rows: 10 },
  //       type: "ALL", //filterValue,
  //       sort: "DESC", //sortOrder,
  //       searchTerm: searchPageUrl?.searchParams?.get("searchTerm")
  //         ? searchPageUrl.searchParams.get("searchTerm")
  //         : "",
  //       dateFilter: dateObj,
  //     },
  //   })
  //     .then((resp) => {
  //       dispatch(updateInitialState(resp?.data?.authoring_getvodList));
  //       setLoading(false);
  //       setIsLazyLoad(false);
  //       closeSuggest();
  //       // if (resp?.data?.authoring_getvodList?.length < 10) {
  //       //   setIsLazyLoad(false);
  //       // }
  //     })
  //     .catch((err) => {
  //       setIsLazyLoad(false);
  //       setLoading(false);
  //       showToastError("Some error occured! Please try again later!");
  //       console.log(JSON.stringify(err, null, 2));
  //     });
  // };
  const handleResetInputFilter = async () => {
    // setSearchResults([]);
    // await setLoading(true);
    // if (searchPageUrl.searchParams.get("searchTerm")) {
    //   await history.replaceState(null, "", removeParamsFromURL("searchTerm"));
    //   await searchPageUrl.searchParams.set("searchTerm", "");
    // }
    // if (searchPageUrl.searchParams.get("inputValue")) {
    //   await history.replaceState(null, "", removeParamsFromURL("inputValue"));
    //   await searchPageUrl.searchParams.set("inputValue", "");
    // }
    // await setSearchTerm("");
    await setInputValue('');
    // setFilterValue("ALL");
    // getVOD(0, rows);
  };
  const onClickAddQue = () => {
    setIsClickedQueList(false);
    setOpenAddQuestion(true);
  };
  const onClickAddQuestion = () => {
    setAddQuestion(true);
  };
  const saveQuestionCallBack = () => {
    setAddQuestion(false);
  };
  return (
    <>
      {/* {addQuestion && //?(
        <AddQuestion
          setAddQuestion={setAddQuestion}
          saveQuestionCallBack={saveQuestionCallBack}
          qusUnsavedChanges={qusUnsavedChanges}
        />} */}
      {/* // ) : ( */}
      <Box
        sx={{
          // position: 'absolute',
          // top: '0',
          // left: '0',
          // backgroundColor: '#fff',
          // width: '100%',
          // height: '100%',
          zIndex: '999',
        }}
      >
        <ListHeader
          headertext={t('choose_your_question')}
          returnBack={returnBack}
          dropDownList={dropDownList}
          menuItem={menuItem}
          isDisableDone={!isDone}
          handleDone={handleDone}
          suggestiveSearchList={searchResults}
          handleResetInputFilter={handleResetInputFilter}
          setSearchTerm={setSearchTerm}
          setInputValue={setInputValue}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Divider></Divider>
        <ListSubHeader
          Title={t('title')}
          Description={t('type')}
          Author={t('author')}
          Time={t('modified_time')}
          Action={t('action')}
          BtnText={`${t('add_new')} ${t('question')}`}
          onButtonClick={onClickAddQue}
        />

        <Box
          sx={{
            backgroundColor: '#f7f7f7',
            padding: '15px',
            position: 'relative',
            height: 'calc(100vh - 181px)',
            overflowY: 'scroll',
            overflowX: 'hidden',
            paddingBottom: { xs: '150px', sm: '0' },
            display: {
              sm: 'flex',
              xs: 'none',
            },
          }}
          id='questionListing'
        >
          {isloading ? (
            <Box sx={{ width: '100%' }}>
              <ArticleListDesktopLoader />
            </Box>
          ) : (
            <Box sx={{ width: '-webkit-fill-available' }}>
              {questions?.length == 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    width: '-webkit-fill-available',
                    alignSelf: 'center',
                  }}
                >
                  <img src={NoResults} />
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#c3c3c3',
                    }}
                  >
                    {t('no_results')}
                  </Typography>
                  {/* <Typography
                      variant="h5"
                      sx={{
                        color: "#c3c3c3",
                      }}
                    >
                      Please try again
                    </Typography> */}
                </Box>
              ) : (
                <InfiniteScroll
                  dataLength={questions != undefined ? questions.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={<ArticleListDesktopLoader />}
                  scrollableTarget='questionListing'
                >
                  <Box sx={{ width: '-webkit-fill-available' }}>
                    {questions?.map((item, index) => (
                      <DesktopListing
                        key={index}
                        index={index}
                        title={item.question}
                        description={item.question_type}
                        author={item.author}
                        time={item.modification_date}
                        onClickSelect={onClickSelect}
                        item={item}
                        isSelected={isSelected}
                      />
                    ))}
                  </Box>
                </InfiniteScroll>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: '#f7f7f7',
            width: '100%',
            padding: '15px',
            position: 'relative',
            height: 'calc(100vh - 53px)',
            overflowY: 'scroll',
            overflowX: 'hidden',
            display: {
              sm: 'none',
              xs: 'flex',
            },
          }}
          id='mobquestionListing'
        >
          {isloading ? (
            <Box sx={{ width: '100%' }}>
              <ArticleListMobileLoader />
            </Box>
          ) : (
            <Box sx={{ width: '-webkit-fill-available' }}>
              {questions?.length == 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    width: '-webkit-fill-available',
                    alignSelf: 'center',
                  }}
                >
                  <img src={NoResults} />
                  <Typography
                    variant='h5'
                    sx={{
                      color: '#c3c3c3',
                    }}
                  >
                    {t('no_results')}
                  </Typography>
                </Box>
              ) : (
                <InfiniteScroll
                  dataLength={questions != undefined ? questions.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={<ArticleListMobileLoader />}
                  scrollableTarget='mobquestionListing'
                >
                  <Box sx={{ width: '-webkit-fill-available' }}>
                    {questions?.map((item, index) => (
                      <MobileListing
                        key={index}
                        index={index}
                        title={item.question}
                        description={item.question_type}
                        author={item.author}
                        time={item.modificationDate}
                        onClickHandle={onClickSelect}
                        item={item}
                        isSelected={isSelected}
                      />
                    ))}
                    {isDone && (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant='contained'
                          disableElevation
                          onClick={handleDone}
                          sx={{
                            width: '347px',
                            height: '50px',
                            fontSize: ThemeConstants.FONTSIZE_SM,
                            backgroundColor: '#2d2d39',
                            position: 'fixed',
                            bottom: '3%',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': {
                              backgroundColor: ThemeConstants.BLACK_COLOR,
                              color: ThemeConstants.WHITE_COLOR,
                            },
                          }}
                        >
                          <DoneOutlinedIcon sx={{ mr: '15.5px' }} />
                          {t('done')}
                        </Button>
                      </Box>
                    )}
                    {!isDone && (
                      <Fab
                        sx={{
                          position: 'fixed',
                          bottom: '4%',
                          right: '5%',
                          zIndex: 99,
                        }}
                        size='medium'
                        color='primary'
                        aria-label='add'
                        onClick={onClickAddQue}
                      >
                        <AddIcon />
                      </Fab>
                    )}
                  </Box>
                </InfiniteScroll>
              )}
            </Box>
          )}
        </Box>
      </Box>
      {/* // )} */}
    </>
  );
};
export default QuestionListing;
