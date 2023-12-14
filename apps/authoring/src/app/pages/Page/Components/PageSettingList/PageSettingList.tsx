import { Box } from '@mui/material';
import { PageSettingListData } from '../../utils/constant';
import { useStyles } from './PageSetting.styles';
import PageSetting from './PageSettingMenu';

const PageSettingList = ({ setPageId }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pageSettingWp}>
      {PageSettingListData.map((val, key) => {
        const { imgUrl, title, id } = val;
        return (
          <PageSetting
            key={key}
            imgUrl={imgUrl}
            title={title}
            setPageId={setPageId}
            id={id}
          />
        );
      })}
    </Box>
  );
};

export default PageSettingList;
