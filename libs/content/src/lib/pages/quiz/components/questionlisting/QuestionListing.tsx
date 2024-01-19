/* eslint-disable no-debugger */
import { useLazyQuery } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { Box, Button, Divider, Fab, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { contentTypeAPIs } from '@platformx/authoring-apis';
import { NoContentFoundSvg, DesktopListing, ContentListMobileLoader, ContentListDesktopLoader, ListHeader, ListSubHeader, MobileListing, ThemeConstants, ShowToastError, debounce } from '@platformx/utilities';

const QuestionListing = ({
  setIsClickedQueList,
  quizState,
  setQuizState,
  setOpenAddQuestion,
  qusUnsavedChanges,
  handleQuesReturn,
  unsavedChanges,
}) => {
  debugger;
  const { t } = useTranslation();
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState<any>({});
  const [isDone, setIsDone] = useState(false);
  const searchPageUrl = new URL(window.location.href);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState(
    searchPageUrl.searchParams.get('searchTerm')
      ? (searchPageUrl.searchParams.get('searchTerm') as string)
      : ''
  );
  const [, setInputValue] = React.useState<any>(
    searchPageUrl.searchParams.get('inputValue')
      ? (searchPageUrl.searchParams.get('inputValue') as string)
      : ''
  );
  const [questions, setQuestions] = useState<any>([]);
  // const [selectedIdArray, setSelectedIdArray] = React.useState<
  //   { question: string }[]
  // >(quizState?.questions ? quizState?.questions : []);
  const [selectedIdArray, setSelectedIdArray] = React.useState<
    { current_page_url: string }[]
  >(quizState?.questions ? quizState?.questions : []);

  const [runFetchQuestionList] = useLazyQuery(contentTypeAPIs.fetchContentTypeListAll);

 const rows= 20;
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
        const filtered = (res?.data?.authoring_getContentTypeItems || []).filter((val) => !val.current_page_url.startsWith('/'));
        const newData = [
          ...(questions || []),
          ...(filtered || []),
        ];

        setQuestions(() => newData);
        if (res?.data?.authoring_getContentTypeItems?.length === 0) {
          setIsLazyLoad(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsLazyLoad(false);
        ShowToastError(t('api_error_toast'));
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

    if (
      selectedIdArray.some(
        (item) => item.current_page_url === val.current_page_url
      )
    ) {
      setSelectedIdArray((current) =>
        current.filter((data) => data.current_page_url !== val.current_page_url)
      );
    } else {
      setSelectedIdArray((prev) => [
        ...prev,
        { current_page_url: val.current_page_url },
      ]);
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
      ShowToastError(t('allowed_tags_toast'));
    } else {
      setQuizState({ ...quizState, questions: [...newQuestions] });
      setIsClickedQueList(false);
      unsavedChanges.current = true;
    }
  };

  const handleResetInputFilter = async () => {
    await setInputValue('');
  };
  const onClickAddQue = () => {
    setIsClickedQueList(false);
    setOpenAddQuestion(true);
  };
  return (
    <>

      <Box
        sx={{
          zIndex: '999',
        }}
      >
        <ListHeader
          headertext={t('choose_your_question')}
          returnBack={returnBack}
          dropDownList={dropDownList}
          menuItem={t('questions')}
          isDisableDone={!isDone}
          handleDone={handleDone}
          suggestiveSearchList={[{}]}
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
              {/*   <ContentListDesktopLoader/> */}
              <ContentListDesktopLoader/>
            </Box>
          ) : (
            <Box sx={{ width: '-webkit-fill-available' }}>
              {questions?.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    width: '-webkit-fill-available',
                    alignSelf: 'center',
                  }}
                >
                  <img src={NoContentFoundSvg} alt='NoResults' />
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
                  dataLength={questions !== undefined ? questions.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={ <ContentListDesktopLoader/>}
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
        <ContentListMobileLoader/>
            </Box>
          ) : (
            <Box sx={{ width: '-webkit-fill-available' }}>
              {questions?.length === 0 ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    width: '-webkit-fill-available',
                    alignSelf: 'center',
                  }}
                >
                  <img src={NoContentFoundSvg} alt='NoResult' />
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
                  dataLength={questions !== undefined ? questions.length : 0}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={ <ContentListMobileLoader/>}
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
