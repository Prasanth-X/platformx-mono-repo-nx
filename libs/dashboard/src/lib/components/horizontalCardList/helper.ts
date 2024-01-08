import { BoostContent } from './HorizontalCard.types';
import { CommunityIcon,
  ReportsIcon,
  PersonalisationIcon,
  LoyalityIcon,
  EcommerceIcon,
  AssetManagerIcon } from '@platformx/utilities';
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
