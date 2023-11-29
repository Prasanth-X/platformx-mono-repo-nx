import { Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../../../store/ContextStore';
import { PrelemSettingList } from '../../utils/constant';
import BackButton from '../BackButton/BackButton';
import PageSettingMenu from '../PageSettingList/PageSettingMenu';
import '../PageSettings/PageSettings.css';
import { useStyles } from './PrelemSetting.styles';
interface pageSettinginsting {
  title?: any;
  imgUrl?: any;
  setPageId?: any;
  setPrelemId?: any;
  selectedPrelemIndex: any;
}
const PrelemSettingMenu = ({
  setPageId,
  setPrelemId,
  selectedPrelemIndex,
}: pageSettinginsting) => {
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const classes = useStyles();
  const [prelemModelData, setPrelemModelData] = useState(
    page.prelemMetaArray[selectedPrelemIndex]
  );
  useEffect(() => {
    setPrelemModelData(page.prelemMetaArray[selectedPrelemIndex]);
  }, [page.prelemMetaArray[selectedPrelemIndex]]);

  const handleShowMenuItems = (id) => {
    switch (id) {
      case 'prelem_images':
        return prelemModelData?.content?.ImageCompound == undefined &&
          id == 'prelem_images'
          ? false
          : true;
      case 'prelem_twitter':
        return prelemModelData?.content?.TwitterHandle == undefined &&
          id == 'prelem_twitter'
          ? false
          : true;
      case 'prelem_testimonials':
        return prelemModelData?.content?.Testimonials == undefined &&
          id == 'prelem_testimonials'
          ? false
          : true;
      case 'prelem_video':
        return prelemModelData?.content?.Videos == undefined &&
          prelemModelData?.PrelemName !== 'Image & Video Gallery' &&
          id == 'prelem_video'
          ? false
          : true;
      case 'prelem_brightcove':
        return prelemModelData?.content?.PlayerType === 'brightcove' &&
          id == 'prelem_brightcove'
          ? true
          : false;
      case 'prelem_data_source':
        return prelemModelData?.PrelemId == 'Prelem_066' &&
          id == 'prelem_data_source'
          ? true
          : false;
      default:
        return true;
    }
  };
  return (
    <Box className={classes.PrelemSettingBox}>
      <BackButton setPageId={setPageId} Title='Prelem Setting' />
      {PrelemSettingList.map((val, key) => {
        const { imgUrl, title, id } = val;
        return (
          handleShowMenuItems(id) && (
            <PageSettingMenu
              key={key}
              imgUrl={imgUrl}
              title={title}
              setPageId={setPageId}
              id={id}
            />
          )
        );
      })}
    </Box>
  );
};
export default PrelemSettingMenu;
