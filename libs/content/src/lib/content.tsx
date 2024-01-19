/* eslint-disable no-debugger */
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { CATEGORY_CONTENT, CONTENT_TYPES } from '@platformx/authoring-apis';
import { previewArticle } from '@platformx/authoring-state';
import { capitalizeFirstLetter, useAccess } from '@platformx/utilities';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContListingContainer from './components/ContentListingContainer/ContentListingContainer';

export default function Content() {
  const dispatch = useDispatch();
  const { canAccessAction } = useAccess();
  const location = useLocation();

  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const contentType: string = capitalizeFirstLetter(
    lastSegment
  );
  const navigate = useNavigate();
  const createContent = () => {
    dispatch(previewArticle({}));
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  return (
    <>
      <Box>

        <ContListingContainer contentType={contentType}
        />
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
          classes={
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
