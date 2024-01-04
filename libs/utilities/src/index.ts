
import LightTheme from "./lib/themes/authoring/lightTheme"
import PrelemTheme from "./lib/themes/prelems/prelemTheme"
import ThemeConstants from "./lib/themes/authoring/variable";
import PrelemsThemeConstants from "./lib/themes/prelems/prelemVariableDark";
//const InterRegular = require('./lib/fonts/Inter/Inter-Regular.woff2') as string;
import { ErrorTooltip } from "./lib/components/ErrorTooltip/ErrorTooltip";
import ContentListLoader from "./lib/components/Loader/ContentListLoader";
import PlateformXDialog from "./lib/components/Popups/DeletePopup";
import usePlatformAnalytics from "./lib/hooks/usePlatformAnalytics/usePlatformAnalytics";
import { usePrelemImpression } from "./lib/hooks/usePrelemImpression/usePrelemImpression";
import useUserSession from "./lib/hooks/useUserSession/useUserSession";
import TaskNotFound from "./lib/components/TaskNotFound/TaskNotFound";
import XLoader from "./lib/components/XLoader/XLoader";
import useAccess from "./lib/hooks/useAccess/useAccess";
import NoSearchResult from "./lib/components/NoSearchResult/NoSearchResult";
import AutoCompleteMultiSelect from "./lib/components/AutoCompleteMultiSelect/AutoCompleteMultiSelect";
import TextBox from "./lib/components/TextBox/TextBox";
import DatePicker from "./lib/components/DatePicker/DatePicker";
import Error from "./lib/components/Error/Error";
import {
    AUTH_INFO,
    LOGOUT_URL,
    AUTH_URL,
    REDIRECT_AUTH_URL,
    NEW_LOGOUT_URL,
} from "./lib/constants/AuthConstant"
import AutoTextArea from "./lib/components/AutoTextArea/AutoTextArea";
import LanguageDropDown from "./lib/components/LanguageDropDown/LanguageDropDown";
import { MiniHeader } from "./lib/components/Header/MiniHeader";
import i18next from "./lib/utils/i18next";
import SkeltonLoader from './lib/components/Skeleton-loader/skeleton';
import XDialog from "./lib/components/XDialog/XDialog";

export { LightTheme }
//export { InterRegular }
export { ThemeConstants }
export { PrelemsThemeConstants }
export { PrelemTheme }
export { ErrorTooltip }
export { ContentListLoader }
export { AutoCompleteMultiSelect }
export { TextBox }
export { DatePicker }
export { Error }
export { i18next }

export * from "./lib/components"
export * from './lib/themes/prelems/prelemTheme';
export * from './lib/themes/authoring/lightTheme';
export * from './lib/constants/CommonConstants';
export * from './lib/utils/helperFns';
export * from './lib/utils/helper';
export * from './lib/components/Cards/CardSkeleton'
export * from './lib/layouts/TwoColumns/TwoColumnLayout';
export * from "./lib/utils/helperConstants"
export * from "./lib/constants/CommonConstants"
export * from "./lib/assets/svg"
export { AutoTextArea }
export { NoSearchResult }
export { PlateformXDialog }
export { usePlatformAnalytics }
export { usePrelemImpression }
export { useUserSession }
export { useAccess }
export { MiniHeader }
export * from "./lib/hooks/useAccess/useMapPermissions"
export * from "./lib/components/ToastNotification/ToastNotification"
export { XLoader }
export { TaskNotFound }
export { LanguageDropDown }
export { AUTH_INFO, AUTH_URL, LOGOUT_URL, REDIRECT_AUTH_URL, NEW_LOGOUT_URL }

export * from "./lib/mappers/articleMapper"
export { SkeltonLoader }
export { XDialog }
