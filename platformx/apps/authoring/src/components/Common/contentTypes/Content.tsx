import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../../hooks/usePermissions/usePermissions';
import { capitalizeFirstLetter } from '../../../utils/helperFunctions';
export default function Content() {
  const { canCreate } = usePermissions();
  const searchPageUrl = new URL(window.location.href);
  const searchTerm = '';
  const [contentType, setContentType] = useState<string>('');

  useEffect(() => {
    setContentType(
      capitalizeFirstLetter(searchPageUrl?.pathname?.split('/')?.[4])
    );
  }, [searchPageUrl.pathname]);
  const navigate = useNavigate();
  const createContent = () => {
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  return (
    <>
      <Box
        sx={{
          display: { sm: 'none' },
          position: 'fixed',
          bottom: 0,
          right: 0,
        }}
      >
        <Box
          className={!canCreate && 'disable'}
          sx={{
            margin: '0 15px 24px 0',
          }}
          onClick={createContent}
        >
          <Fab
            size='medium'
            sx={{ backgroundColor: '#89909a' }}
            aria-label='add'
          >
            <AddIcon sx={{ color: '#fff' }} />
          </Fab>
        </Box>
      </Box>
    </>
  );
}
