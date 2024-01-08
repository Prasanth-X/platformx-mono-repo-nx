import AutoCompleteMultiSelect from './lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect';
import AutoTextArea from './lib/components/AutoTextArea/AutoTextArea';
import BasicSwitch from './lib/components/BasicSwitch/BasicSwitch';
import DatePicker from './lib/components/DatePicker/DatePicker';
import Error from './lib/components/Error/Error';
import { ErrorTooltip } from './lib/components/ErrorTooltip/ErrorTooltip';
import { MiniHeader } from './lib/components/Header/MiniHeader';
import LanguageDropDown from './lib/components/LanguageDropDown/LanguageDropDown';
import ContentListLoader from './lib/components/Loader/ContentListLoader';
import NoSearchResult from './lib/components/NoSearchResult/NoSearchResult';
import PlateformXDialog from './lib/components/Popups/PlateformXDialog';
import TaskNotFound from './lib/components/TaskNotFound/TaskNotFound';
import TextBox from './lib/components/TextBox/TextBox';
import XDialog from './lib/components/XDialog/XDialog';
import XLoader from './lib/components/XLoader/XLoader';

import {
  AUTH_INFO,
  AUTH_URL,
  LOGOUT_URL,
  NEW_LOGOUT_URL,
  REDIRECT_AUTH_URL,
} from './lib/constants/AuthConstant';
import useAccess from './lib/hooks/useAccess/useAccess';
import usePlatformAnalytics from './lib/hooks/usePlatformAnalytics/usePlatformAnalytics';
import { usePrelemImpression } from './lib/hooks/usePrelemImpression/usePrelemImpression';
import useUserSession from './lib/hooks/useUserSession/useUserSession';
import LightTheme from './lib/themes/authoring/lightTheme';
import ThemeConstants from './lib/themes/authoring/variable';
import PrelemTheme from './lib/themes/prelems/prelemTheme';
import PrelemsThemeConstants from './lib/themes/prelems/prelemVariableDark';
import i18next from './lib/utils/i18next';
export { NoContentFound } from "./lib/components/NoContentFound/NoContentFound"
const InterRegular = require('./lib/fonts/Inter/Inter-Regular.woff2') as string;
export {
  AutoCompleteMultiSelect,
  ContentListLoader,
  DatePicker,
  Error,
  ErrorTooltip,
  InterRegular,
  LightTheme,
  PrelemTheme,
  PrelemsThemeConstants,
  TextBox,
  ThemeConstants,
  i18next,
};

export * from './lib/assets/svg';
export * from './lib/components';
export * from './lib/components/Cards/CardSkeleton';
export * from './lib/constants/CommonConstants';
export * from './lib/layouts/TwoColumns/TwoColumnLayout';
export * from './lib/themes/authoring/lightTheme';
export * from './lib/themes/prelems/prelemTheme';
export * from './lib/utils/helper';
export * from './lib/utils/helperConstants';
export * from './lib/utils/helperFns';
export { ArticleMapper } from './lib/mappers/articleMapper';

export * from './lib/components/ToastNotification/ToastNotification';
export * from './lib/hooks/useAccess/useMapPermissions';
export {
  AUTH_INFO,
  AUTH_URL,
  AutoTextArea,
  BasicSwitch,
  LOGOUT_URL,
  LanguageDropDown,
  MiniHeader,
  NEW_LOGOUT_URL,
  NoSearchResult,
  PlateformXDialog,
  REDIRECT_AUTH_URL,
  TaskNotFound,
  XDialog,
  XLoader,
  useAccess,
  usePlatformAnalytics,
  usePrelemImpression,
  useUserSession,
};

