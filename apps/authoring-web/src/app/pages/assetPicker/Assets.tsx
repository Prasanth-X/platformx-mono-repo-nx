import Masonry from '@mui/lab/Masonry';
import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ThemeConstants } from '@platformx/utilities';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { showToastSuccess } from '../../components/toastNotification/toastNotificationReactTostify';

interface ItemProps {
  Title: string;
  Description: string;
  Thumbnail: string;
  ItemType?: string;
}
interface LocationProps {
  items: ItemProps[];
  collectionType: string;
}
const Assets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateItems = location.state as LocationProps;
  const [items, setItems] = useState(stateItems.items);
  const [jsonArr, setJsonArr] = useState<any[]>([]);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      jsonArr?.length === 1
        ? JSON.stringify(JSON.stringify(jsonArr[0]))
        : JSON.stringify(JSON.stringify(jsonArr))
    );
    showToastSuccess('Copied successfully!');
  };
  useEffect(() => {
    items.map((item, index) => {
      let jsonItem;
      if (item.ItemType == 'Image') {
        jsonItem = {
          ImageCropUrl: {
            CropUrl: {
              Web: item.Thumbnail,
            },
            MetaFields: {
              AltText: item.Title,
              Name: item.Title,
              Title: item.Title,
              Description: item.Description,
              Attribution: false,
            },
          },
        };
        setJsonArr((state) => [...state, jsonItem]);
      }
      if (item.ItemType == 'Video') {
        jsonItem = {
          VideoDetails: {
            Media: {
              URL: item.Thumbnail,
              ThumbnailUrl: '',
              MediaId: '',
              Duration: '',
              Dimension: '',
            },
            MetaFields: {
              Name: item.Title,
              Title: item.Title,
              Description: item.Description,
              Attribution: false,
              CC: false,
              Transcript: false,
            },
          },
        };
        setJsonArr((state) => [...state, jsonItem]);
      }
      if (item.ItemType == 'Pdfs') {
        jsonItem = {
          PDFUrl: {
            URL: item.Thumbnail,
          },
          MetaFields: {
            AltText: item.Title,
            Name: item.Title,
            Title: item.Title,
            Description: item.Description,
          },
        };
        setJsonArr((state) => [...state, jsonItem]);
      }
      if (items.length == index + 1) {
        console.log('done', jsonArr);
      }
    });
  }, []);
  return (
    <>
      <Box
        mt={2}
        ml={2}
        mr={2}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.PRIMARY_MAIN_COLOR,
            padding: '8px 15px',
            textTransform: 'capitalize',
            '&:hover': {
              borderColor: '#2d2d39',
              color: '#2d2d39',
            },
          }}
          onClick={() => {
            navigate('/asset-picker');
          }}
        >
          <ChevronLeftIcon />{' '}
          <Typography pl={1} variant="body1">
            Back
          </Typography>
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.PRIMARY_MAIN_COLOR,
            padding: '8px 15px',
            textTransform: 'capitalize',
            '&:hover': {
              borderColor: '#2d2d39',
              color: '#2d2d39',
            },
          }}
          onClick={handleCopy}
        >
          <ContentCopyIcon />{' '}
          <Typography pl={1} variant="body1">
            Copy
          </Typography>
        </Button>
      </Box>
      <Box p={2}>
        {jsonArr.length > 0 && (
          <Typography
            sx={{
              border: `3px solid ${ThemeConstants.PRIMARY_MAIN_COLOR}`,
              height: 'calc(100vh - 165px)',
              overflowY: 'scroll',
              margin: '20px',
              padding: '30px',
            }}
            variant="subtitle1"
          >
            {jsonArr?.length === 1
              ? JSON.stringify(JSON.stringify(jsonArr[0]))
              : JSON.stringify(JSON.stringify(jsonArr))}
          </Typography>
        )}
      </Box>
    </>
  );
};
export default Assets;
