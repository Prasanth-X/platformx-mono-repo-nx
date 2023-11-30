
const HCLRobort = require("../fonts/HCLTechRoobert/HCLTechRoobert-Regular.woff2") as string;
const InterRegular = require("../fonts/Inter/Inter-Regular.woff2") as string;
const ThemeConstants = {
  // Color Variables
  PRIMARY_MAIN_COLOR: '#2d2d39',
  SECONDARY_MAIN_COLOR: '#1d99b3',
  TEXT_MAIN_COLOR: '#313335',
  WHITE_COLOR: '#ffffff',
  OFF_WHITE_COLOR: '#F5F6F8',
  BLACK_COLOR: '#000000',
  RED_COLOR: '#d92231',
  LIGHT_BLUE_COLOR: '#dff3ff',
  LIGHT_GREY_COLOR: '#707070',
  NOTIFICATION_SUCCESS: 'rgb(46, 125, 50)',
  NOTIFICATION_WARNING: 'rgb(237, 108, 2)',
  NOTIFICATION_ERROR: 'rgb(211, 47, 47)',
  NOTIFICATION_INFO: '#3498db',
  DRAFT_COLOR: '#f0ad4e',
  PENDING_COLOR: '#006DE6',
  PUBLISHED_COLOR: '#5cb85b',
  UNPUBLISHED_COLOR: '#777777',
  APPROVED_COLOR: '#5cb85b',
  SCEDULED_PUBLISHED_COLOR: '#3379b7',
  SCEDULED_UNPUBLISHED_COLOR: '#5bc1de',
  ARCHIVE_COLOR: '#d9534e',
  INPROCESS_COLOR: '#198753',
  RED_COLOR_VARIANT1: '#721413',
  DIVIDER_COLOR: '#CCCCCC',
  BLACK_COLOR_VARIANT1: '#2d2d39',
  LIGHT_BG_COLOR: '#f1f1f1',
  GREEN_COLOR: '#5cb85b',
  LAVENDER_COLOR: '#EFF0F6',

  // New theme Color Variables
  COLOR_N0300: '#F7F7FC',
  // PRIMARY_COLOR: '#4B9EF9',
  BODY_COLOR: '#4E4B66',
  BLACK_COLOR_V1: '#14142B',
  BLACK_COLOR_V2: '#2B2742',
  GRAY_COLOR_v1: '#4E4B66',
  GRAY_COLOR_v2: '#A0A3BD',
  LABEL_COLOR: '#6E7191',
  BLUE_COLOR: '#4b9ef9',
  LIGHT_GRAY_COLOR: '#eff0f6',
  LIGHT_GRAY_VARIENT1: '#ced3d9',
  LIGHT_GRAY_VARIENT2: '#89909a',
  // Font Size
  FONTSIZE_XXXL: '60px',
  FONTSIZE_XXL: '48px',
  FONTSIZE_XL: '32px',
  FONTSIZE_LG: '24px',
  FONTSIZE_MD: '20px',
  FONTSIZE_SECONDARY_DEFAULT: '18px',
  FONTSIZE_DEFAULT: '16px',
  FONTSIZE_SM: '14px',
  FONTSIZE_XS: '12px',
  FONTSIZE_XXS: '10px',

  //New font sizes
  WebL_H1: "135px",
  TabL_H1: "75px",
  FONTSIZE_H1: '28px', // Headings
  FONTSIZE_H2: '24px', // Headings
  FONTSIZE_H3: '20px', // Headings
  FONTSIZE_H4: '18px', // Sub-Title
  FONTSIZE_H5: '16px', // Paragraph
  FONTSIZE_H6: '14px', // Paragraph
  FONTSIZE_H7: '12px', // Label
  FONTSIZE_CTA: '14px',
  // FONTSIZE_TEXTFIELD: '14px',
  // Font Weight
  FONTWEIGHT_LIGHT: 300,
  FONTWEIGHT_REGULAR: 400,
  FONTWEIGHT_MEDIUM: 500,
  FONTWEIGHT_SEMIBOLD: 600,
  FONTWEIGHT_BOLD: 700,
  // New Line Height
  LINE_HEIGHT_H1: '38px',
  LINE_HEIGHT_H2: '36px',
  LINE_HEIGHT_H3: '28px',
  LINE_HEIGHT_H4: '27px',
  LINE_HEIGHT_H5: '24px',
  LINE_HEIGHT_H6: '21px',
  LINE_HEIGHT_H7: '18px',
  LINE_HEIGHT_CTA: '21px',

  // New Font sizes
  FONTSIZE_48: '48px',
  FONTSIZE_36: '36px',
  FONTSIZE_34: '34px',
  FONTSIZE_28: '28px',
  FONTSIZE_24: '24px',
  FONTSIZE_20: '20px',
  FONTSIZE_18: '18px',
  FONTSIZE_16: '16px',
  FONTSIZE_14: '14px',
  FONTSIZE_12: '12px',
  //Line Height
  LINEHEIGHT_58: '58px',
  LINEHEIGHT_46: '46px',
  LINEHEIGHT_38: '38px',
  LINEHEIGHT_34: '34px',
  LINEHEIGHT_30: '30px',
  LINEHEIGHT_28: '28px',
  LINEHEIGHT_26: '26px',
  LINEHEIGHT_24: '24px',
  LINEHEIGHT_22: '22px',
  LINEHEIGHT_20: '20px',
  LINEHEIGHT_18: '18px',
  // Letter Spacing
  LETTER_SPACING_XL: -0.5,
  LETTER_SPACING_LG: 0,
  LETTER_SPACING_MD: 0.25,
  LETTER_SPACING_DEFAULT: 0,
  LETTER_SPACING_SM: 1.25,
  LETTER_SPACING_XS: 1.5,
  // Breakpoints
  XS: 320,
  SM: 600,
  MD: 768,
  EM: 1024,
  LG: 1280,
  XL: 1440,
  // CAT Height
  CTA_MEDIUM_HEIGHT: "47px",
  CTA_SMALL_HEIGHT: "38px",
  CTA_LARGE_HEIGHT: "63px",
  CTA_XLARGE_HEIGHT: "66px",
  // CAT Padding
  CTA_MEDIUM_PADDING: "5px 24px",
  CTA_SMALL_PADDING: "5px 16px",
  // Text Transform
  TEXTTRANSFORMUPPERCASE: "uppercase",
  TEXTTRANSFORMCAPITALIZECASE: "capitalize",
  TEXTTRANSFORMLOWERCASE: "lowercase",
  // Border Radius
  DEFAULT_BORDER_RADIUS: "3px",
  ROUND_BORDER_RADIUS: "35px",
  DEFAULT_BORDER_RADIUS_CTA: "5px",
  // Font Family
  PRIMARY_FONT_FAMILY: 'Inter',
  SECONDARY_FONT_FAMILY: 'HCLTechRoobert',
  /***== New design system Implementation ==***/
  /* COLORS */
  PRIMARY_COLOR: {
    950: '#14142B',
    900: '#262338',
    800: '#4E4B66',
    700: '#6E7191',
    600: '#A0A3BD',
    500: '#D9DBE9',
    400: '#EFF0F6',
    300: '#F7F7FC',
    200: '#FCFCFC',
    100: '#FFFFFF',
  },
  SECONDRY_COLOR: {
    950: '#0049B2',
    900: '#0F5FDC',
    800: '#2874F0',
    700: '#3282FA',
    600: '#3C91FF',
    500: '#4B9EF9',
    400: '#6EB8F9',
    300: '#8CC8FA',
    200: '#B4DBFC',
    100: '#D7ECFD',
  },
  WARNING_COLOR: {
    950: '#AD6F0B',
    900: '#C8870A',
    800: '#D8991D',
    700: '#E2AB30',
    600: '#F2BB33',
    500: '#FFCD41',
    400: '#FFD970',
    300: '#FFE18D',
    200: '#FFECC7',
    100: '#FFF2D9',
  },
  ERROR_COLOR: {
    950: '#B71C1C',
    900: '#C62828',
    800: '#D32F2F',
    700: '#E53935',
    600: '#F44336',
    500: '#EF5350',
    400: '#E57373',
    300: '#EF9A9A',
    200: '#FFCDD2',
    100: '#FFEBEE',
  },
  SUCCESS_COLOR: {
    950: '#077251',
    900: '#0A875D',
    800: '#0FA069',
    700: '#2DB26C',
    600: '#49C173',
    500: '#62D16B',
    400: '#82DC73',
    300: '#A1E596',
    200: '#BEEBB4',
    100: '#DEF5D9',
  },

  ELEMENT: {
    TEXTBOX: {
      BORDER_RADIUS: "5px",
      PADDING: {
        sm: '25px 0px 8px 12px',
        md: '25px 0px 8px 12px',
      },
      PADDINGV2: {
        sm: '25px 12px 12px 12px',
        md: '25px 12px 12px 12px',
      },
    },
    BUTTON: {
      BORDER_RADIUS: "5px",
      MEDIUM_HEIGHT: "47px",
      SMALL_HEIGHT: "38px",
      LARGE_HEIGHT: "63px",
      XLARGE_HEIGHT: "66px",
      MIN_WIDTH: '120px',
      MIN_WIDTH_SMALL: '90px',
      PADDING: {
        sm: '9px 16px',
        md: '12px 24px',
        lg: '20px 32px',
        xl: '20px 32px',
      },
      MARGIN: {
        TOP: '12px',
        RIGHT: '12px',
        BOTTOM: '12px',
        LEFT: '0px',
        SMMARGIN: "10px 10px 10px 0px",
        MDMARGIN: "10px 10px 10px 0px"
      }
    },
    SELECT: {
      BORDER_RADIUS: "5px"
    },
    ACCORDIAN: {
      BORDER_RADIUS: "5px",
      BORDER: "2px",
      PADDING1: "6px 24px 6px 24px",
      PADDING2: "16px 24px 16px 24px",
      MARGINBOTTOM: "32px",
    },
    LABEL: {
      PADDING: {
        SMTOP: '10px',
        SMBOTTOM: '10px',
        LGTOP: '12px',
        LGBOTTOM: '12px',
      }
    }
  },
  OVERYLAY: {
    EDITOVERLAY: '50, 130, 250, 0.9'
  },
  RADIUS: {
    VALUE1: '5px',
    VALUE2: '8px',
  },
  FONTFAMILYPRIMARY: InterRegular,
  FONTFAMILYSECONDARY: HCLRobort,
  FONTNAMEPRIMARY: 'Inter',
  FONTNAMESECONDARY: 'HCLTechRoobert',
};

export default ThemeConstants;