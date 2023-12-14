import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  NativeSelect,
  Tooltip,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageModel, updatePageSettings } from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import { authInfo } from '../../../utils/authConstants';
import { setDefaultPageSettings } from '../../../utils/helperFunctions';
import BasicSwitch from '../Switch';
import { descriptionLength, nameLength } from '../utils/constants';
import { PageInformation } from '../utils/editTypes';
const PageInfo = () => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const {
    PageName,
    PageDescription,
    PageTags,
    PageURL,
    PageViewer,
    PageCaching,
    PageMobileFriendly,
  } = page.pageSettings;
  const initialPageInfo = useRef<PageInformation>();
  const [pageInfo, setPageInfo] = useState<PageInformation>({
    PageName: '',
    PageDescription: '',
    PageTags: [],
    PageURL: `${authInfo.publishUri + i18n.language}/${page?.pageModel.Page}`,
    PageViewer: '',
    PageCaching: false,
    PageMobileFriendly: false,
  });

  const [handleImpression] = usePlatformAnalytics();
  const pageNameLength = nameLength;
  const pageDescriptionLength = descriptionLength;
  useEffect(() => {
    if (page?.pageSettings) {
      initialPageInfo.current = {
        PageName: PageName !== undefined ? PageName : '',
        PageDescription: PageDescription !== undefined ? PageDescription : '',
        PageTags: PageTags !== undefined ? PageTags : [],
        PageURL:
          PageURL !== undefined
            ? PageURL
            : `${authInfo.publishUri + i18n.language}/${page?.pageModel.Page}`,
        PageViewer: PageViewer !== undefined ? PageViewer : 'free',
        PageCaching: PageCaching !== undefined ? PageCaching : false,
        PageMobileFriendly:
          PageMobileFriendly !== undefined ? PageMobileFriendly : false,
      };
      setPageInfo(initialPageInfo.current);
    }
  }, [page?.pageSettings, page?.pageModel.Page]);
  const handlePageViewerChangeDropDown = (event) => {
    const pageInfoUpdated = { ...pageInfo, PageViewer: event.target.value };
    setPageInfo(pageInfoUpdated);
  };
  // Function to handle switch changes
  const handleControlsChange = (event, fieldType) => {
    const pageInfoUpdated = { ...pageInfo };
    pageInfoUpdated[fieldType] = event.target.checked;
    setPageInfo(pageInfoUpdated);
  };
  // Function to handle input field changes
  const handleDataChange = (event, fieldType) => {
    if (fieldType == 'PageTags') {
      return;
    } else {
      const pageInfoUpdated = { ...pageInfo };
      pageInfoUpdated[fieldType] = event.target.value;
      setPageInfo(pageInfoUpdated);
    }
  };
  const getDisabledState = () => {
    return pageInfo.PageName == '' || pageInfo.PageName.trim().length == 0;
  };

  // Function to save page information
  const savePageInfo = () => {
    const pageModelNew = { ...page?.pageModel };
    pageModelNew.Title = pageInfo.PageName;
    dispatch(updatePageModel(pageModelNew));

    dispatch(
      updatePageSettings(
        setDefaultPageSettings(
          pageInfo.PageName,
          pageInfo.PageDescription,
          pageInfo.PageTags,
          pageInfo.PageURL
        )
      )
    );
    dispatch(updatePageSettings(pageInfo));
    const pageDataObj = {
      eventType: 'Pageinfo PageSetting Saved',
      pageInfoSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
  };
  const getValue = () => {
    if (pageInfo?.PageTags?.length === 1) {
      return pageInfo?.PageTags[0] ? pageInfo.PageTags : [];
    } else if (pageInfo?.PageTags?.length > 0) {
      return pageInfo.PageTags;
    }
    return [];
  };
  return (
    <Box
      sx={{
        paddingLeft: '20px',
        paddingRight: '20px',
        ':first-letter': { textTransform: 'capitalize' },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignimageInstances: 'center',
          '.sentence_case:first-letter': { textTransform: 'capitalize' },
        }}
        mt={2}
        mb={1}
        className="drawer-label"
      >
        <span className="sentence_case">{t('page_info_title')}</span>
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_info_title_tp')}
              </Typography>
            </Box>
          }
          placement="right"
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
        value={pageInfo.PageName}
        onChange={(e) => handleDataChange(e, 'PageName')}
        variant="outlined"
        placeholder={t('page_info_title_placeholder')}
        inputProps={{ maxLength: pageNameLength }}
      />
      {getDisabledState() && (
        <Typography
          variant="subtitle2"
          pl={1}
          pt={1}
          sx={{
            color: ThemeConstants.NOTIFICATION_ERROR,
          }}
        >
          {t('page_info_title_warning')}
        </Typography>
      )}
      <Typography
        variant="subtitle1"
        sx={{ display: 'flex', alignimageInstances: 'center' }}
        mt={2}
        mb={1}
        className="drawer-label"
      >
        {t('page_info_about')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_info_about_tp')}
              </Typography>
            </Box>
          }
          placement="right"
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
        value={pageInfo.PageDescription}
        onChange={(e) => handleDataChange(e, 'PageDescription')}
        variant="outlined"
        placeholder={t('page_info_about_placeholder')}
        inputProps={{ maxLength: pageDescriptionLength }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignimageInstances: 'center',
          textTransform: 'capitalize',
        }}
        mt={2}
        mb={1}
        className="drawer-label"
      >
        {t('page_info_tags')}
        <Tooltip
          title={
            <Box m={1}>
              <Typography sx={{ fontSize: ThemeConstants.FONTSIZE_XS }} mb={1}>
                {t('page_info_tags_tp')}
              </Typography>
            </Box>
          }
          placement="right"
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
        id="tags-filled"
        value={[...getValue()]}
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim().length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          const pageInfoUpdated = { ...pageInfo };
          pageInfoUpdated.PageTags = updatedtags;
          setPageInfo(pageInfoUpdated);
        }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map(
            (option: string, index: number) =>
              option && (
                <Box key={index} mt={1}>
                  <Chip
                    variant="outlined"
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
                </Box>
              )
          )
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={t('page_info_tags_placeholder')}
          />
        )}
        sx={{
          '& .Platform-x-InputBase-root': {
            flexWrap: 'wrap',
            width: 'auto',
          },
          '& .Platform-x-InputBase-input': {
            width: 0,
            minWidth: '150px',
          },
          '.Platform-x-Autocomplete-tag': {
            height: '48px',
            margin: '0 5px 5px 0',
          },
        }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography variant="subtitle1" mt={2} mb={1}>
        {t('page_info_url')}
      </Typography>
      <TextField
        multiline
        value={pageInfo.PageURL}
        onChange={(e) => handleDataChange(e, 'PageURL')}
        variant="outlined"
        placeholder="Write a page URL here"
        sx={{
          '.Platform-x-OutlinedInput-root': { color: '#1a0db1' },
        }}
        inputProps={{ readOnly: true }}
      />
      <Divider sx={{ marginTop: '20px' }} />
      <Typography variant="subtitle1" mt={2} mb={1}>
        {t('page_info_view')}
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <NativeSelect
            onChange={(e) => handlePageViewerChangeDropDown(e)}
            value={pageInfo.PageViewer}
          >
            <option value="free">{t('page_info_free')}</option>
            <option value="behindlogin">{t('page_info_behindlogin')}</option>
          </NativeSelect>
        </FormControl>
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={2}
        mb={1}
      >
        {t('page_info_caching')}
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          onChange={(e: any) => handleControlsChange(e, 'PageCaching')}
          checked={pageInfo.PageCaching}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('page_info_friendly')}
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          onChange={(e: any) => handleControlsChange(e, 'PageMobileFriendly')}
          checked={pageInfo.PageMobileFriendly}
        />
      </Typography>
      <Box sx={{ textAlign: 'right' }} mb={2}>
        <Button
          variant="contained"
          onClick={savePageInfo}
          disabled={getDisabledState() || initialPageInfo.current === pageInfo}
          sx={{ textTransform: 'capitalize' }}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default PageInfo;
