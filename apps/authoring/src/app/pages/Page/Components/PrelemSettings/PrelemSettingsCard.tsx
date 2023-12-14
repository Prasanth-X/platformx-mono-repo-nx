import { useMutation } from '@apollo/client';
import { Box } from '@mui/material/';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updatePrelemData } from '../../../../services/page/page.api';
import {
  updateContentForCard,
  updateContentHandleForCard,
  updateContentHandleForLivestream,
  updatePrelemContent,
} from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { PrelemSettingList } from '../../utils/constant';
import BackButton from '../BackButton/BackButton';
import PrelemBrightcoveVideo from './PrelemBrightcoveVideo';
import PrelemEcom from './PrelemEcom';
import PrelemImages from './PrelemImages';
import PrelemSEO from './PrelemSEO';
import PrelemTestimonials from './PrelemTestimonials';
import PrelemTwitter from './PrelemTwitter';
import PrelemVideos from './PrelemVideos';
import PrelemAdvanced from './prelemAdvanced';
import PrelemAnalytics from './prelemAnalytics';

const PrelemSettingsCard = ({
  handleUpdatedPrelemModelChild,
  selectedPrelemIndex,
  toggleGallery,
  selectedImage,
  selectedVideo,
  pageId,
  setPageId,
}) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [mutatePrelemContentQuery] = useMutation(updatePrelemData);
  const [prelemModelData, setPrelemModelData] = useState(
    page.prelemMetaArray[selectedPrelemIndex]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<string>('');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<string>('');
  const [selectedOperation, setSelectedOperation] = useState<string>('');

  const getPublishedImageArr = (index: number) => {
    if (
      prelemModelData.content.ImageCompound &&
      prelemModelData.content.ImageCompound.length
    ) {
      return prelemModelData.content.ImageCompound[`ImageCompound_${index + 1}`]
        ?.published_images;
    } else {
      return prelemModelData.content.published_images;
    }
  };

  const handleSave = (sectionToUpdate, data, index) => {
    if (sectionToUpdate == 'EcomHandle') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.ApiEndPoint =
        data?.apiEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.OauthEndPoint =
        data?.oauthEndPoint;
      page.prelemMetaArray[selectedPrelemIndex].content.Password =
        data?.password;
      page.prelemMetaArray[selectedPrelemIndex].content.Username =
        data?.userName;
    } else if (sectionToUpdate == 'TwitterHandle') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.TwitterHandle = data;
    } else if (sectionToUpdate === 'Testimonials') {
      dispatch(
        updateContentHandleForCard(selectedPrelemIndex, sectionToUpdate, data)
      );
      page.prelemMetaArray[selectedPrelemIndex].content.Testimonials = data;
    } else if (sectionToUpdate === 'Livestream') {
      dispatch(
        updateContentHandleForLivestream(
          selectedPrelemIndex,
          sectionToUpdate,
          data
        )
      );
      page.prelemMetaArray[selectedPrelemIndex].content = {
        ...page.prelemMetaArray[selectedPrelemIndex].content,
        ...data,
      };
    } else if (sectionToUpdate === 'ImageCompound') {
      dispatch(
        updateContentForCard(
          selectedPrelemIndex,
          sectionToUpdate,
          data.ImageCompound,
          index
        )
      );
    } else {
      dispatch(
        updateContentForCard(selectedPrelemIndex, sectionToUpdate, data, index)
      );
    }
    if (
      [
        'ImageCompound',
        'Videos',
        'TwitterHandle',
        'Livestream',
        'Testimonials',
      ].includes(sectionToUpdate)
    ) {
      let updateContent = page.prelemMetaArray[selectedPrelemIndex].content;
      if (sectionToUpdate === 'ImageCompound') {
        updateContent = {
          ...page.prelemMetaArray[selectedPrelemIndex].content,
          published_images: data.published_images,
          original_image: data.original_image,
        };
      }
      updatePrelemContent(
        dispatch,
        mutatePrelemContentQuery,
        updateContent,
        selectedPrelemIndex,
        prelemModelData.DocumentPath,
        prelemModelData.DocumentCreationPath,
        prelemModelData.DocumentType,
        prelemModelData.InstanceId
      );
    } else {
      return;
    }
    handleUpdatedPrelemModelChild();
  };

  const handleGallery = (toggleState, galleryType, index, type) => {
    if (galleryType == 'Images') {
      setSelectedImageIndex(index);
    }
    toggleGallery(toggleState, galleryType);
    if (galleryType == 'Videos') {
      setSelectedVideoIndex(index);
    }
    setSelectedOperation(type);
  };

  useEffect(() => {
    setPrelemModelData(page.prelemMetaArray[selectedPrelemIndex]);
  }, [page.prelemMetaArray[selectedPrelemIndex]]);

  return (
    <Box>
      {prelemModelData?.PrelemId == 'Prelem_066' &&
        pageId === PrelemSettingList[0].id && (
          <PrelemEcom
            index={selectedPrelemIndex}
            EcomHandle={prelemModelData?.content}
            handleSave={handleSave}
            setPageId={setPageId}
          />
        )}
      {prelemModelData?.content?.TwitterHandle != undefined &&
        pageId === PrelemSettingList[1].id && (
          <PrelemTwitter
            index={selectedPrelemIndex}
            twitterHandle={prelemModelData.content.TwitterHandle}
            handleSave={handleSave}
            setPageId={setPageId}
          />
        )}
      {prelemModelData?.content?.Testimonials != undefined &&
        pageId === PrelemSettingList[2].id && (
          <PrelemTestimonials
            data={prelemModelData.content.Testimonials}
            sectionToUpdate='Testimonials'
            handleSave={handleSave}
            setPageId={setPageId}
          />
        )}
      {prelemModelData?.content?.ImageCompound != undefined &&
        pageId === PrelemSettingList[3].id && (
          <>
            <Box className='pageSettingmainWp'>
              <BackButton
                setPageId={setPageId}
                Title='Images'
                backTo='prelemSetting'
              />
              {Object.entries(prelemModelData.content.ImageCompound).map(
                ([key, value], index) => {
                  return (
                    <PrelemImages
                      key={`ImageCompound_${index + 1}`}
                      index={`ImageCompound_${index + 1}`}
                      imageInstance={
                        prelemModelData?.content?.ImageCompound?.[
                          `ImageCompound_${index + 1}`
                        ]?.original_image
                      }
                      handleSave={handleSave}
                      sectionToUpdate='ImageCompound'
                      handleGallery={handleGallery}
                      selectedIndex={selectedImageIndex}
                      selectedImage={
                        selectedImageIndex == `ImageCompound_${index + 1}` &&
                        (selectedOperation == 'replace' ||
                          selectedOperation == 'choose')
                          ? selectedImage
                          : { Thumbnail: '', Title: '', Description: '' }
                      }
                      //published_images={getPublishedImageArr(index)}
                      published_images={
                        prelemModelData?.content?.ImageCompound?.[
                          `ImageCompound_${index + 1}`
                        ]?.published_images
                      }
                      original_images={
                        prelemModelData?.content?.ImageCompound?.[
                          `ImageCompound_${index + 1}`
                        ]?.original_image
                      }
                      setPageId={setPageId}
                    />
                  );
                }
              )}
            </Box>
          </>
        )}

      {prelemModelData?.content?.Videos != undefined &&
        prelemModelData?.PrelemName !== 'Image & Video Gallery' &&
        pageId === PrelemSettingList[4].id &&
        Object.entries(prelemModelData.content.Videos).map(([key, value]) => {
          return (
            <PrelemVideos
              key={key}
              index={key}
              playerFlow={prelemModelData?.content?.PlayerType}
              videoInstance={value}
              handleSave={handleSave}
              sectionToUpdate='Videos'
              handleGallery={handleGallery}
              selectedIndex={selectedVideoIndex}
              selectedVideo={
                selectedVideoIndex == key &&
                (selectedOperation == 'replace' ||
                  selectedOperation == 'choose')
                  ? selectedVideo
                  : { Thumbnail: '', Title: '', Description: '' }
              }
              setPageId={setPageId}
            />
          );
        })}
      {prelemModelData?.content?.PlayerType === 'brightcove' &&
        pageId === PrelemSettingList[5].id && (
          <PrelemBrightcoveVideo
            setPageId={setPageId}
            index={selectedPrelemIndex}
            videoObj={{
              VideoID: prelemModelData?.content?.VideoID,
              PlayerID: prelemModelData?.content?.PlayerID,
              AccountID: prelemModelData?.content?.AccountID,
            }}
            handleSave={handleSave}
          />
        )}
      {prelemModelData?.content?.TwitterHandle == undefined &&
        pageId === PrelemSettingList[6].id && (
          <PrelemSEO
            setPageId={setPageId}
            selectedPrelemIndex={selectedPrelemIndex}
            handleSave={handleSave}
          />
        )}

      {pageId === PrelemSettingList[7].id && (
        <PrelemAdvanced setPageId={setPageId} />
      )}
      {pageId === PrelemSettingList[8].id && (
        <PrelemAnalytics
          setPageId={setPageId}
          selectedPrelemIndex={selectedPrelemIndex}
        />
      )}
    </Box>
  );
};

export default PrelemSettingsCard;
