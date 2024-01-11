/* eslint-disable @typescript-eslint/no-empty-function */
import { useFormikContext } from 'formik';
// import Gallery from '../../../Gallery/Gallery';

const GalleryWrapper = ({
  toggleGallery,
  galleryType,
  keyVal,
  fieldName,
  answerId,
  setAnswers = (props) => { },
  answers = [],
}) => {
  const { setFieldValue } = useFormikContext();
  const handleSelectedImage = (image, keyName, id) => {
    if (keyName === 'answers') {
      // setAnswers(
      //   answers.map((answer) =>
      //     answer.id == id ? { ...answer, image: image?.Thumbnail } : answer // TODO: fix this
      //   ) as []
      // );
    } else {
      if (localStorage.getItem('socialShareKey') === 'socialShareImage') {
        setFieldValue('socialShareImage', image);
        localStorage.removeItem('socialShareImage');
      } else {
        setFieldValue(fieldName, image);
        setFieldValue('socialShareImage', image);
      }
    }
  };

  return (
    // <Gallery
    //   handleImageSelected={handleSelectedImage}
    //   toggleGallery={toggleGallery}
    //   galleryMode={galleryType}
    //   // handleVideoSelected={handleSelectedVideo}
    //   keyName={keyVal}
    //   id={answerId}
    // />
    <>Gallery TODO</>
  );
};

export default GalleryWrapper;
