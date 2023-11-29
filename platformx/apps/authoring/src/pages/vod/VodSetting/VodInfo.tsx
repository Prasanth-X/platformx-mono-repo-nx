import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
// import BasicSwitch from '../Switch';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../theme/variable';
import { authInfo } from '../../../utils/authConstants';
import { filterSelectedArticle, getSubDomain } from '../../../utils/helperFunctions';
// import { updateArticleSettings } from '../../../articles/Actions';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { update_article } from '../../../services/article/article.api';

interface PageInformation {
  ArticleName: string;
  PageDescription: string;
  PageTags: string[];
  PageURL: string;
}

const VodInfo = ({ selectedArticle }) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const article = filterSelectedArticle(state, selectedArticle);
  const [articleInfo, setArticleInfo] = useState<PageInformation>({
    ArticleName: '',
    PageDescription: '',
    PageTags: [],
    PageURL: '',
  });
  const [updateMutate] = useMutation(update_article);

  const [handleImpression] = usePlatformAnalytics();
  const pageNameLength = 250;
  const pageDescriptionLength = 1000;
  useEffect(() => {
    if (selectedArticle) {
      console.log('selectedArticle', selectedArticle);
      setArticleInfo({
        ArticleName:
          selectedArticle?.ArticleSettings?.ArticleName != undefined
            ? selectedArticle?.ArticleSettings?.ArticleName
            : '',
        PageDescription:
          selectedArticle?.ArticleSettings?.PageDescription != undefined
            ? selectedArticle?.ArticleSettings?.PageDescription
            : '',
        PageTags:
          selectedArticle?.ArticleSettings?.PageTags != undefined
            ? selectedArticle?.ArticleSettings?.PageTags
            : [],
        PageURL:
          selectedArticle?.Page_State === 'DRAFT'
            ? selectedArticle?.ArticleSettings?.CurrentPageURL
            : `${getSubDomain()}/${i18n.language}/${
                selectedArticle?.ArticleSettings?.CurrentPageURL
              }`,
        // PageViewer:
        //   article?.ArticleSettings?.PageViewer != undefined
        //     ? article?.ArticleSettings?.PageViewer != '""{}""'
        //       ? article?.ArticleSettings?.PageViewer
        //       : { everyone: false, admins: false, members: false }
        //     : { everyone: false, admins: false, members: false },
        // PageCaching:
        //   article?.ArticleSettings?.PageCaching != undefined
        //     ? article?.ArticleSettings?.PageCaching
        //     : false,
        // PageMobileFriendly:
        //   article?.ArticleSettings?.PageMobileFriendly != undefined
        //     ? article?.ArticleSettings?.PageMobileFriendly
        //     : false,
      });
    }
  }, [selectedArticle]);
  // Function to handle checkbox changes
  const handlePageViewerChange = (event, fieldType, pageViewer) => {
    const pageInfoUpdated = { ...articleInfo };
    pageInfoUpdated[fieldType][pageViewer] = event.target.checked;
    setArticleInfo(pageInfoUpdated);
  };
  // Function to handle switch changes
  const handleControlsChange = (event, fieldType) => {
    const pageInfoUpdated = { ...articleInfo };
    pageInfoUpdated[fieldType] = event.target.checked;
    setArticleInfo(pageInfoUpdated);
  };
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    if (fieldType !== 'PageTags') {
      const articleInfoUpdated = { ...articleInfo };
      articleInfoUpdated[fieldType] = event.target.value;
      setArticleInfo(articleInfoUpdated);
    }
  };
  const getDisabledState = () => {
    return (
      articleInfo.ArticleName == '' ||
      articleInfo.ArticleName.trim().length == 0
    );
  };

  // Function to save article information
  const saveArticleInfo = () => {
    const pageModelNew = { ...article?.pageModel };
    pageModelNew.Title = articleInfo.ArticleName;
    updateMutate({
      variables: {
        input: selectedArticle,
      },
    });
    const pageDataObj = {
      eventType: 'Pageinfo PageSetting Saved',
      pageInfoSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
  };
  return (
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        <> What's the title of the article?*</>
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                This is the name of the article on your site menu.
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={articleInfo.ArticleName}
        onChange={(e) => handleDataChange(e, 'ArticleName')}
        variant='outlined'
        placeholder='Write a name here'
        inputProps={{ maxLength: pageNameLength }}
      />
      {getDisabledState() &&
        <Typography
          variant='subtitle2'
          pl={1}
          pt={1}
          sx={{
            color: ThemeConstants.NOTIFICATION_ERROR,
          }}
        >
          *Please fill the Page Name
        </Typography>}
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        <>What's this article about?</>
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                Adding a description helps you to find this article later easily
                inside the platform.
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <TextField
        multiline
        value={articleInfo.PageDescription}
        onChange={(e) => handleDataChange(e, 'PageDescription')}
        variant='outlined'
        placeholder='Write a description here'
        inputProps={{ maxLength: pageDescriptionLength }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography variant='subtitle1' mt={2} mb={1}>
        Article URL?
      </Typography>
      <TextField
        multiline
        // value={articleInfo.PageURL}
        onChange={(e) => handleDataChange(e, 'PageURL')}
        variant='outlined'
        placeholder='Write a article URL here'
        sx={{
          '.Platform-x-OutlinedInput-root': { color: '#1a0db1' },
        }}
        inputProps={{ readOnly: true }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant='subtitle1'
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className='drawer-label'
      >
        Tags
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                Adding relevant tags helps you to find this article later easily
                inside the platform.
              </Typography>
            </Box>
          }
          placement='right'
        >
          <Box>
            <InfoOutlinedIcon
              sx={{
                marginLeft: '10px',
                '&:hover': {
                  color: ThemeConstants.NOTIFICATION_ERROR,
                },
              }}
            />
          </Box>
        </Tooltip>
      </Typography>
      <Autocomplete
        multiple
        id='tags-filled'
        value={
          articleInfo?.PageTags?.length > 0 ? [...articleInfo.PageTags] : []
        }
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim().length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          const pageInfoUpdated = { ...articleInfo };
          pageInfoUpdated.PageTags = updatedtags;
          setArticleInfo(pageInfoUpdated);
        }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map(
            (option: string, index: number) =>
              option &&
                <Chip
                  key={`key${index}`}
                  variant='outlined'
                  label={option}
                  deleteIcon={
                    <DeleteIcon
                      sx={{ color: ThemeConstants.PRIMARY_MAIN_COLOR }}
                    />
                  }
                  sx={{
                    '.Platform-x-Chip-deleteIcon': {
                      color: ThemeConstants.BLACK_COLOR,
                    },
                  }}
                  {...getTagProps({ index })}
                />

          )}
        renderInput={(params) =>
          (<TextField
            {...params}
            variant='outlined'
            placeholder={t('page_info_tags_placeholder')}
          />)
        }
        sx={{
          height: '48px',
          marginBottom: '10px',
          backgroundColor: 'red',
        }}
      />
      <Box sx={{ textAlign: 'right' }} mb={2}>
        <Button
          variant='contained'
          onClick={saveArticleInfo}
          disabled={getDisabledState()}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default VodInfo;
