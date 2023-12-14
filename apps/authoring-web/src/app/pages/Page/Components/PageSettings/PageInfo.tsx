import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePageModel, updatePageSettings } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import { authInfo } from '../../../../utils/authConstants';
import {
  getSubDomain,
  setDefaultPageSettings,
} from '../../../../utils/helperFunctions';
import { descriptionLength, nameLength } from '../../utils/constant';
import { PageInformation } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import BasicSwitch from '../Switch';
import './PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
const PageInfo = ({ setPageId }) => {
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
    PageURL: `${getSubDomain()}/${i18n.language}/${page?.pageModel.Page}`,
    PageViewer: '',
    PageCaching: true,
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
            : `${getSubDomain()}/${i18n.language}/${page?.pageModel.Page}`,
        PageViewer: PageViewer !== undefined ? PageViewer : 'free',
        PageCaching: true,
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
    showToastSuccess(`${t('page_info_toast')} ${t('saved_toast')}`);
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
    <Box className="pageSettingmainWp">
      <BackButton setPageId={setPageId} Title="Page Info" />
      <Box className="rowBox">
        <Typography className="labelbox" variant="p4regular">
          {t('page_info_title')}
        </Typography>
        <TextField
          size="small"
          multiline
          value={pageInfo.PageName}
          onChange={(e) => handleDataChange(e, 'PageName')}
          variant="outlined"
          placeholder={t('page_info_title_placeholder')}
          inputProps={{ maxLength: pageNameLength }}
        />
        {getDisabledState() && (
          <Typography
            variant="h7regular"
            sx={{
              color: ThemeConstants.NOTIFICATION_ERROR,
            }}
          >
            {t('page_info_title_warning')}
          </Typography>
        )}
      </Box>
      <Box className="rowBox">
        <Typography className="labelbox" variant="p4regular">
          {t('page_info_about')}
        </Typography>
        <TextField
          multiline
          value={pageInfo.PageDescription}
          onChange={(e) => handleDataChange(e, 'PageDescription')}
          variant="outlined"
          size="small"
          placeholder={t('page_info_about_placeholder')}
          inputProps={{ maxLength: pageDescriptionLength }}
        />
      </Box>
      <Box className="rowBox">
        <Typography className="labelbox" variant="p4regular">
          {t('page_info_tags')}
        </Typography>
        <Autocomplete
          size="small"
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
              size="small"
              variant="outlined"
              {...params}
              placeholder={t('page_info_tags_placeholder')}
            />
          )}
          sx={{
            '& .Platform-x-InputBase-root': {
              flexWrap: 'wrap',
              width: 'auto',
            },
            '.Platform-x-Autocomplete-tag': {
              margin: '0 5px 5px 0',
            },
            '& .Platform-x-InputBase-input': {
              width: 0,
              minWidth: '150px',
            },
          }}
        />
      </Box>
      <Box className="rowBox">
        <Typography className="labelbox" variant="p4regular">
          {t('page_info_url')}
        </Typography>
        <TextField
          size="small"
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
      </Box>
      <Box className="rowBox">
        <Typography className="labelbox" variant="p4regular">
          {t('page_info_view')}
        </Typography>
        <FormControl fullWidth>
          <Select
            size="small"
            value={pageInfo.PageViewer}
            variant="outlined"
            onChange={(e) => handlePageViewerChangeDropDown(e)}
          >
            <MenuItem value="free">{t('page_info_free')}</MenuItem>
            <MenuItem value="behindlogin">
              {t('page_info_behindlogin')}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('page_info_friendly')}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e, 'PageMobileFriendly')}
            checked={pageInfo.PageMobileFriendly}
          />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Button
          variant="contained"
          onClick={savePageInfo}
          disabled={getDisabledState() || initialPageInfo.current === pageInfo}
          sx={{ width: '100%' }}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default PageInfo;
