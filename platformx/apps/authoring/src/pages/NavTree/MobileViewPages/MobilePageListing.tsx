import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import check_circle from '../../../assets/images/check_circle.png';
import description_black from '../../../assets/images/description_black.png';
import { dateFormat } from '../../../utils/helperFunctions';

export default function MobilePageListing({
  article,
  index,
  currentButton,
  setCurrentButton,
  setIsDone,
  setPageName,
  setUrl,
  editData,
}) {
  useEffect(() => {
    if (article.CurrentPageUrl === editData.URL) {
      setPageName(article.Title);
    }
  }, [editData]);

  const onButtonClicked = () => {
    if (article.CurrentPageUrl === currentButton) {
      setCurrentButton(null);
      setIsDone(false);
    } else {
      setPageName(article.Title);
      setUrl(article.CurrentPageUrl);
      setCurrentButton(article?.CurrentPageUrl);
      if (
        currentButton !== article?.CurrentPageUrl ||
        currentButton === article?.CurrentPageUrl
      ) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    }
  };
  return (
    <>
      <Box
        onClick={onButtonClicked}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '6px',
          padding: '10px 0',
          marginTop: '10px',
          height: '74px',
          border:
            currentButton === article?.CurrentPageUrl
              ? 'solid 1px #707070'
              : 'none',
        }}
      >
        <Box
          sx={{
            width: '50px',
            height: '50px',
            margin: '0px 0px 0px 14px',
            borderRadius: '3px',
            padding: '13px',
            backgroundColor:
              currentButton === article?.CurrentPageUrl ? '#000' : '#eef1ff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {currentButton === article?.CurrentPageUrl ?
            <img
              src={check_circle}
              style={{ marginLeft: '3px', objectFit: 'contain' }}
            />
           :
            <img src={description_black} style={{ objectFit: 'contain' }} />}
        </Box>
        <Box sx={{ paddingLeft: '14px', width: '85%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: {
                  xs: '100%',
                },
              }}
              variant='h6medium'
            >
              {article?.Title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#89909a' }}>
            <Typography variant='h7regular'>
              {`By ${article?.Author}`}
            </Typography>
            <span style={{ margin: '0 2px', fontSize: '12px' }}>|</span>
            <Typography variant='h7regular'>
              {dateFormat(article?.LastModificationDate)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
