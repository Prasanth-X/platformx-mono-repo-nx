import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import TabletAndroidRoundedIcon from '@mui/icons-material/TabletAndroidRounded';
import LightTheme from '../../../../../../../libs/utilities/src/lib/themes/authoring/lightTheme';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';

const themeConstant =
  process.env?.REACT_APP_COMPONENT_THEME == 'LightTheme'
    ? ThemeConstants
    : ThemeConstants;
export const demoUsers = {
  'finance@demosite.com': 'finwiz',
  'retail@demosite.com': 'retail',
  'media@demosite.com': 'finwiz',
  'sports@demosite.com': 'finwiz',
};
export const theme = {
  LightTheme,
};
export const tabs = [
  { type: 'desktop', icon: ComputerRoundedIcon },
  { type: 'tablet', icon: TabletAndroidRoundedIcon },
  { type: 'mobile', icon: PhoneAndroidRoundedIcon },
];

export const initialContent = `<!DOCTYPE html><html><head>${document.head.innerHTML}
<style>
  #react-player video {
    object-fit: fill !important;
  }
  .tweetWrapper iframe {
    visibility: visible !important;
    position: relative !important;
  }
  body {
    overflow-x: hidden;
  }
</style></head><body><div></div></body></html>`;
