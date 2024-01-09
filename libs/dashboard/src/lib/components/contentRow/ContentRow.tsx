import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalizeWords, formatContentTitle, getSubDomain } from '@platformx/utilities';
import MenuList from '../menuList/MenuList';
import { useStyles } from './ContentRow.styles';
import { ContentRowProps } from './ContentRow.types';

const ContentRow = ({
  item,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  fetchContentDetails,
}: ContentRowProps) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { ContentType, CurrentPageURL } = item;
  const url = CurrentPageURL?.startsWith('/')
    ? CurrentPageURL?.substring(1)
    : CurrentPageURL;
  // function to view published pages
  const handleView = () => {
    window.open(
      `${getSubDomain()}/${i18n.language}/${ContentType?.toLowerCase()}/${url}`
    );
  };

  return (
    <Box className={classes.contentRowContainer}>
      <Typography
        component='h2'
        variant='h6regular'
        className={classes.contentRowText}
        onClick={handleView}
      >
        {capitalizeWords(formatContentTitle(item.Title))}
      </Typography>
      <MenuList
        item={item}
        deleteContent={deleteContent}
        duplicate={duplicate}
        preview={preview}
        unPublish={unPublish}
        view={view}
        edit={edit}
        fetchContentDetails={fetchContentDetails}
      />
    </Box>
  );
};

export default memo(ContentRow);
