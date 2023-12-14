import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';
import fetchContentByPathAPI from '../../services/contentTypes/contentTypes.api';
import { capitalizeFirstLetter } from '../../utils/helperFunctions';
import { mapFetchALL } from '../useQuizPollEvents/mapper';

interface ApiResponse {
  authoring_getContentTypeItems: any[];
}
const useFetchContentList = (contentType, isCalled = true) => {
  const searchPageUrl = new URL(window.location.href);
  const path: string = capitalizeFirstLetter(
    searchPageUrl?.pathname?.split('/')?.[4]
  );
  const { t } = useTranslation();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async (
    start = 0,
    filter = 'ALL',
    isMenuActions = false
  ) => {
    console.log('data.length', path, contentType);
    if (
      path?.toLowerCase() === contentType?.toLowerCase() &&
      (isCalled || isMenuActions)
    ) {
      const variables = mapFetchALL(location.state, filter, contentType, {
        start: start,
        rows: 20,
      });
      try {
        const response: any = await fetchContentByPathAPI.fetchContentAll({
          ...variables,
        });
        if (response.authoring_getContentTypeItems) {
          const { authoring_getContentTypeItems: content } = response;
          if (start == 0) {
            setData(content);
          } else {
            setData([...data, ...content]);
          }
          content.length < 20 && setLoading(false);
        }
      } catch (err) {
        showToastError(t('api_error_toast'));
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { data, fetchContent, loading };
};

export default useFetchContentList;
