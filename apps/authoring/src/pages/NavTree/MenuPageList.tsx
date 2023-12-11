import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Button, Typography } from '@mui/material';
import PagesListIcon from '../../assets/svg/pagesListIcon.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { dateFormat, handleHtmlTags } from '../../utils/helperFunctions';

const MenuPageList = ({
  article,
  index,
  // setPageName,
  setPageName1,
  isDisable,
  currentButton,
  setCurrentButton,
  isDisableDone,
  setisIsDisableDone,
  setUrl,
  editData,
  isedit,
}) => {
  const { t } = useTranslation();
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);
  const [btnText, setBtnText] = useState('Select');
  const isSelected = () => {
    // if (isedit) {
    //     return editData?.URL === article?.CurrentPageUrl
    // }
    return currentButton === article?.CurrentPageUrl;
  };
  const handleListClose = () => {
    setListMenu(null);
  };
  useEffect(() => {
    if (article.CurrentPageUrl === editData.URL) {
      setPageName1(article.Title);
    }
  }, [isedit]);

  const onClickSelect = (val) => {
    // setCurrentButton(index !== currentButton ? index : "");
    if (val.CurrentPageUrl === currentButton) {
      setCurrentButton(null);
      setisIsDisableDone(true);
    } else {
      setCurrentButton(article?.CurrentPageUrl);
      setPageName1(val.Title);
      if (currentButton !== article?.CurrentPageUrl || isSelected()) {
        setisIsDisableDone(false);
      } else {
        setisIsDisableDone(true);
      }
      setUrl(val.CurrentPageUrl);
    }
  };
  return (
    <Box>
      <Grid
        key={index}
        container
        sx={{
          background: '#ffffff',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          // padding: "0 25px",
          padding: '10px 25px 10px 22px',
          marginBottom: '10px',
          borderRadius: '6px',
          justifyContent: 'space-between',
          border: isSelected() ? 'solid 1px #2d2d39' : 'none',
        }}
      >
        <Grid
          item
          xs={2.4}
          sx={{
            marginRight: '2%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '35px',
              height: '35px',
              margin: '1px 8px 1px 0',
              borderRadius: '3px',
              backgroundColor: '#eef1ff',
              display: 'flex',
              alignItems: 'center',
              '& img': {
                maxWidth: '100%',
              },
            }}
          >
            {/* <DescriptionOutlinedIcon sx={{ color: '#6a6d7d', ml: '6px' }} /> */}
            <img src={PagesListIcon} alt="Page Icon" />
          </Box>
          <Typography
            variant="h6medium"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            }}
          >
            {article.Title}
          </Typography>
        </Grid>
        <Grid item xs={2.8} sx={{ marginRight: '2.8%' }}>
          <Typography
            variant="h6regular"
            sx={{
              color: '#b3b3b3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              fontWeight: ThemeConstants.FONTWEIGHT_LIGHT,
            }}
          >
            {handleHtmlTags(article.Description)}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1.5} sx={{ marginRight: '3.2%' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
            }}
            variant="h6regular"
          >
            {article.LastModifiedBy}
          </Typography>
        </Grid>
        <Grid item xs={2.6} sx={{ marginRight: '3%' }}>
          <Typography variant="h6regular">
            {dateFormat(article.LastModificationDate)}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1} sx={{ marginRight: '3.1%' }}>
          {/* {btnText!=='Select' ?<Button onClick={()=>onClickSelect(article)}
           variant='contained'sx={{ textTransform: 'capitalize',margin: '1px 0 1px 0px',
          width: '124.8px', height: '40px' }}>{btnText}</Button>: */}
          <Button
            variant="secondaryButton"
            className="sm"
            sx={{
              backgroundColor: isSelected()
                ? ThemeConstants.BLACK_COLOR
                : ThemeConstants.WHITE_COLOR,
              color: isSelected()
                ? ThemeConstants.WHITE_COLOR
                : ThemeConstants.BLACK_COLOR,
              '&:hover': {
                backgroundColor:
                  currentButton !== article?.CurrentPageUrl
                    ? ThemeConstants.WHITE_COLOR
                    : '',
                color:
                  currentButton !== article?.CurrentPageUrl
                    ? ThemeConstants.BLACK_COLOR
                    : '',
              },
            }}
            disableElevation
            onClick={() => onClickSelect(article)}
          >
            {isSelected() ? t('selected') : t('select')}
            {/* {btnText} */}
          </Button>
          {/* // } */}
        </Grid>
        <Grid item xs={0.5}></Grid>
      </Grid>
    </Box>
  );
};
export default MenuPageList;
