import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { capitalizeWords } from '../../../../Common/Listing/Utils/Helper';
import Card from './Card';
import { CreateCardProps } from './CardSlider.types';
import { SETTINGS } from './Utils/constants';
import { getBgColorArray } from './Utils/helper';

const CardSlider = ({ createContent }: CreateCardProps) => {
  const colorList = getBgColorArray(createContent.length);
  return (
    <Slider {...SETTINGS}>
      {createContent.map(
        (item, index) =>
          item.url !== '' && (
            <Card
              key={index}
              ImageUrl={item.image_1.ImageCropUrl?.CropUrl.Web}
              BgColor={colorList[index]}
              CTAText={capitalizeWords(item.title)}
              url={item.url}
            />
          )
      )}
    </Slider>
  );
};

export default CardSlider;
