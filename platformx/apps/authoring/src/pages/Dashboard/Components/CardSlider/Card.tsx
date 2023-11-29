import { useMutation } from '@apollo/client';
import EastIcon from '@mui/icons-material/East';
import { Box, Button } from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../../../../Common/Listing/Utils/Helper';
import Title from '../../../../components/Common/Title';
import useUserSession from '../../../../hooks/useUserSession/useUserSession';
import { createPgModel } from '../../../../services/page/page.api';
import {
  createPageModel,
  updatePageSettings,
  updateSaveWarning,
} from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { authInfo } from '../../../../utils/authConstants';
import { getCurrentLang, getSelectedSite, getSubDomain, setDefaultPageSettings } from '../../../../utils/helperFunctions';
import { PageProps } from '../../../PageList/Page.types';
import CreatePage from '../../../createPage';
import './Card.css';
import { PAGE_MODEL_INSTANCE } from './Utils/constants';

const Card = ({ ImageUrl, BgColor, CTAText, url }) => {
  const [getSession] = useUserSession();
  const { userInfo } = getSession() || {};
  const username = userInfo?.first_name;
  const userEmailId = userInfo?.username;
  const { dispatch } = useContext(Store);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [handleImpression] = usePlatformAnalytics();

  const [items, setItems] = useState<PageProps[]>([]);

  //function redirect to create page
  const [createPage, setCreatePage] = useState<boolean>(false);
  const handleCardClick = () => {
    const URL = `${location.origin}/${getSelectedSite()}/${getCurrentLang()}${url}`
    if (CTAText.toLowerCase().includes('create a page')) {
      setCreatePage(!createPage);
    } else {
      window.open(URL, '_self');
    }
  };
  const [mutate] = useMutation(createPgModel, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
        sitename: getSelectedSite()
      },
    },
  });

  //Function to create page
  const createPageByName = (pageName, pageUrl) => {
    const newPageModel = JSON.parse(JSON.stringify(PAGE_MODEL_INSTANCE));
    newPageModel.Page = pageUrl;
    newPageModel.Title = pageName;
    newPageModel.DevelopedBy = username;
    newPageModel.DevelopedDate = new Date().toISOString();
    newPageModel.CurrentPageURL = `/${pageUrl}`;
    newPageModel.PageSettings = { PageName: pageName };
    newPageModel.SiteName = userEmailId;
    newPageModel.Page_LastModificationDate = new Date().toISOString();
    dispatch(
      createPageModel(newPageModel, mutate, navigate, handleImpression, t)
    );
    dispatch(
      updatePageSettings(
        setDefaultPageSettings(
          pageName,
          undefined,
          undefined,
          `${getSubDomain()}/${i18n.language}/${pageUrl}`
        )
      )
    );
    dispatch(updateSaveWarning(false));
  };
  const confirmButtonHandle = (pageName, pageUrl) => {
    if (pageName.trim().length > 0) {
      createPageByName(pageName, pageUrl);
    }
  };

  return (
    <>
      <Box className='card' onClick={handleCardClick}>
        <Box className='imagecolorbox' sx={{ background: `${BgColor}` }}>
          <Box className=''>
            <img src={ImageUrl} className='imgbox' alt={CTAText} />
          </Box>
        </Box>
        <Button className='nobghover ctabox'>
          <Title titleVarient='h5regular' title={capitalizeWords(CTAText)} />
          <Box className='icon'>
            <EastIcon />
          </Box>
        </Button>
      </Box>
      <CreatePage
        isDialogOpen={createPage}
        isDuplicate={false}
        confirmButtonHandle={confirmButtonHandle}
        closeButtonHandle={() => setCreatePage(!createPage)}
      />
    </>
  );
};

export default Card;
