import { useLazyQuery } from '@apollo/client';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useCustomStyle } from '../../../../Common/DynamicForm.style';
import NoResults from '../../../../assets/images/no-results.png';
import DesktopListing from '../../../../components/Common/selectListing/DesktopListing';
import ListHeader from '../../../../components/Common/selectListing/ListHeader';
import ListSubHeader from '../../../../components/Common/selectListing/ListSubHeader';
import { showToastError } from '../../../../components/toastNotification/toastNotificationReactTostify';
import ArticleListDesktopLoader from '../../../../pages/articles/articel-list-loder-desktop';
import { fetchContentTypeList } from '../../../../services/contentTypes/contentTypes.api';
import { QuestionListingData } from '../../schemas';

export const QuestionListing = ({
  quizState,
  toggleQuestionListing,
  setQuizState,
}) => {
  const { header, subHeader, tableHeader } = QuestionListingData;
  const { t, i18n } = useTranslation();
  const classes = useCustomStyle();
  const [isloading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<any>([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [rows, setRows] = useState<number>(20);
  const [selectedIdArray, setSelectedIdArray] = useState<
    { current_page_url: string }[]
  >(quizState?.questions ? quizState?.questions : []);
  const [selectedData, setSelectedData] = useState<any>({});
  const [runFetchQuestionList] = useLazyQuery(fetchContentTypeList);

  const getQuestionList = (ind, search = '') => {
    setIsLazyLoad(true);
    setLoading(true);
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
        const filtered = (
          res?.data?.authoring_getContentTypeItems || []
        ).filter((val) => !val.current_page_url.startsWith('/'));
        const newData = [...(questions || []), ...(filtered || [])];

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
    setLoading(false);
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    getQuestionList(nextIndex, '');
  };
  const isSelected = (data) => {
    const a = selectedIdArray.some(
      (item) => item.current_page_url === data.current_page_url
    );
    return a;
  };
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
    } else {
      setSelectedIdArray((prev) => [
        ...prev,
        { current_page_url: val.current_page_url },
      ]);
      setSelectedData({ ...selectedData, val });
    }
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
      setQuizState({
        ...quizState,
        questions: [...quizState.questions, newQuestions],
      });
      toggleQuestionListing();
    }
  };
  useEffect(() => {
    getQuestionList(0, '');
  }, []);

  return (
    <>
      <Box mb={3}>
        <ListHeader
          headertext={header.title}
          returnBack={toggleQuestionListing}
          handleDone={handleDone}
        />
        <Divider></Divider>
      </Box>
      <ListSubHeader
        Title={tableHeader.title}
        Description={tableHeader.type}
        Author={tableHeader.author}
        Time={tableHeader.modifiedTime}
        Action={tableHeader.action}
        BtnText={subHeader.buttonText}
        onButtonClick={toggleQuestionListing}
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
    </>
  );
};
