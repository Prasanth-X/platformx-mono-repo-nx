import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router'; 
import './SearchBox.css';
import SearchModel from './SearchModel'; 
import { removeSearchLocalStorage } from '../../Utils/helper';

export default function SearchBox(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [contentType, setContentType] = React.useState(localStorage.getItem('contentType'));
  const [keyword, setKeyword] = React.useState(localStorage.getItem('searchKeyword'));
  const location = useLocation();
  const [tags, setTags] = React.useState(localStorage.getItem('searchTags'));
  const [author, setAuthor] = React.useState(localStorage.getItem('author'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    window.onpopstate = () => {
      removeSearchLocalStorage();
    };
    window.onbeforeunload = function (e) {
      removeSearchLocalStorage();
      navigate(location.pathname, { replace: true });
    };
  });

  React.useEffect(() => {
    console.log("print", location.state, localStorage.getItem('searchKeyword'), keyword, props.menuItemSelected);
    console.log("props.menuItemSelected", props.menuItemSelected);
    if (location.state == null) {
      removeSearchLocalStorage();
      setContentType(localStorage.getItem('contentType'));
      setAuthor(localStorage.getItem('author'));
      setTags(localStorage.getItem('searchTags'));
      setKeyword(localStorage.getItem('searchKeyword'));
    } else {
      setContentType(localStorage.getItem('contentType'));
      setAuthor(localStorage.getItem('author'));
      setTags(localStorage.getItem('searchTags'));
      setKeyword(localStorage.getItem('searchKeyword'));
    }
  }, [location.state, props.menuItemSelected]);
  return (
    <>
      <Box onClick={handleClickOpen}>
        <IconButton type='button' sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        {props.ifTab && (
          <Typography
            variant='h6regular'
            color='#4E4B66'
            className='searchBoxInput'
          >
            <span>
              {contentType && (
                <b style={{ color: '#4b9ef9' }}>{contentType}: </b>
              )}
              {keyword && keyword.length !== 0 && (
                <>
                  <b style={{ marginRight: '5px', marginLeft: '5px' }}>
                    Keyword:
                  </b>
                  {keyword}
                </>
              )}
              {tags && tags.length !== 0 && (
                <>
                  <b style={{ marginRight: '5px', marginLeft: '5px' }}>Tags:</b>
                  {tags}
                </>
              )}
              {author && (
                <>
                  <b style={{ marginRight: '5px', marginLeft: '5px' }}>
                    Author:
                  </b>
                  {author}
                </>
              )}
            </span>
            {!contentType &&
              !keyword &&
              (!tags || (tags && tags.length == 0)) &&
              !author && (
                <span>
                  {t('search_for')} “{t('pages')}” / “{t('articles')}” / “
                  {t('quiz')}“ / “{t('polls')}“ / “{t('events')}“
                </span>
              )}
          </Typography>
        )}
      </Box>
      <SearchModel searchOpen={open} handleSearchClose={handleClose} menuSelected={props.menuItemSelected}/>
    </>
  );
}
