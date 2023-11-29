import { BoostContent } from './HorizontalCard.types';
import CommunityIcon from '../../../assets/svg/DashBoardBoostContent/community.svg';
import AssetManagerIcon from '../../../assets/svg/DashBoardBoostContent/AssetManager.svg';
import EcommerceIcon from '../../../assets/svg/DashBoardBoostContent/Ecommerce.svg';
import LoyalityIcon from '../../../assets/svg/DashBoardBoostContent/Loyality.svg';
import PersonalisationIcon from '../../../assets/svg/DashBoardBoostContent/Personalisation.svg';
import ReportsIcon from '../../../assets/svg/DashBoardBoostContent/Reports&Analytics.svg';
const DashBoardBoostContentIcons = [
  CommunityIcon,
  ReportsIcon,
  PersonalisationIcon,
  LoyalityIcon,
  EcommerceIcon,
  AssetManagerIcon,
];
export const boostContentWithIconMapper = (boostContent: BoostContent[]) => {
  return boostContent.map((item, index) => {
    if (index < 6) {
      return {
        ...item,
        icon: DashBoardBoostContentIcons[index],
      };
    } else {
      return {
        ...item,
        icon: DashBoardBoostContentIcons[0],
      };
    }
  });
};
