import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { previewArticle } from '../../articles/Actions';
import { useAccess } from '@platformx/utilities';
import { Store } from '../../store/ContextStore';
import { CATEGORY_CONTENT, CONTENT_TYPES } from '../../utils/constants';
import { capitalizeFirstLetter } from '../../utils/helperFunctions';
import QuizPollEventsList from './Listing/QuizPollEventsList';

export default function Content() {
  const { dispatch } = useContext(Store);
  const { canAccessAction } = useAccess();
  const searchPageUrl = new URL(window.location.href);
  const searchTerm = '';
  const contentType: string = capitalizeFirstLetter(
    searchPageUrl?.pathname?.split('/')?.[4]
  );

  const navigate = useNavigate();
  const createContent = () => {
    dispatch(previewArticle({}));
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  return (
    <>
      <Box>
        <QuizPollEventsList contentType={contentType} />
      </Box>
      <Box
        sx={{
          display: { sm: 'none' },
          position: 'fixed',
          bottom: 0,
          right: 0,
        }}
      >
        <Box
          className={
            !canAccessAction(CATEGORY_CONTENT, CONTENT_TYPES, 'Create') &&
            'disable'
          }
          sx={{
            margin: '0 15px 24px 0',
          }}
          onClick={createContent}
        >
          <Fab size="large" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </>
  );
}
