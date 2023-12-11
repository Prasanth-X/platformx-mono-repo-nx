/* eslint-disable @typescript-eslint/no-var-requires */
// import HCLRobort from "../fonts/HCLTechRoobert/HCLTechRoobert-Regular.woff2";
// import InterRegular from "../fonts/Inter/Inter-Regular.woff2";
//  import InterRegular from "../fonts/Inter/Inter-Regular.woff2";
const HCLRobort = require("../fonts/HCLTechRoobert/HCLTechRoobert-Regular.woff2");
const InterRegular = require("../fonts/Inter/Inter-Regular.woff2");


const ThemeConstants = {
  // Color Variables
  PRIMARY_MAIN_COLOR: "#333333",
  SECONDARY_MAIN_COLOR: "#444444",
  BUTTON_MAIN_COLOR: "#031795",
  WHITE_COLOR: "#ffffff",
  BLACK_COLOR: "#14142B",
  BLACK_COLOR_VARIANT1: "#2d2d39",
  BLACK_COLOR_VARIANT2: "#1D1D25",
  OFF_WHITE_COLOR: "#F5F6F8",
  LIGHT_BLUE_COLOR: "#dff3ff",
  LIGHT_GREY_COLOR: "#707070",
  LIGHT_GREY_COLOR_VARIANT1: "#89909A",
  LIGHT_GREY_COLOR_VARIANT2: "#F3F3F3",
  LIGHT_GREY_COLOR_VARIANT3: "#F9F9F9",
  LIGHT_GREY_COLOR_VARIANT4: "#D9DBE9",
  LIGHT_GREY_COLOR_VARIANT5: "#CED3D9",
  LIGHT_GREY_COLOR_VARIANT6: "#5C6574",
  LIGHT_GREY_COLOR_VARIANT7: "#EFF0F7",
  LIGHT_GREY_COLOR_VARIANT8: "#5C6574",
  RED_COLOR: "#d92231",
  // New theme Color Variables
  BODY_COLOR: "#4E4B66",
  BLACK_COLOR_V1: "#14142B",
  BLACK_COLOR_V2: "#2B2742",
  GRAY_COLOR_v1: "#4E4B66",
  GRAY_COLOR_v2: "#A0A3BD",
  LABEL_COLOR: "#6E7191",
  // Font sizes
  WebL_H1: "135px",
  TabL_H1: "75px",
  FONTSIZE_H1: "28px", // Headings
  FONTSIZE_H2: "24px", // Headings
  FONTSIZE_H3: "20px", // Headings
  FONTSIZE_H4: "18px", // Sub-Title
  FONTSIZE_H5: "16px", // Paragraph
  FONTSIZE_H6: "14px", // Paragraph
  FONTSIZE_H7: "12px", // Label
  FONTSIZE_CTA: "14px",
  // New Font sizes
  FONTSIZE_48: "48px",
  FONTSIZE_36: "36px",
  FONTSIZE_34: "34px",
  FONTSIZE_28: "28px",
  FONTSIZE_24: "24px",
  FONTSIZE_20: "20px",
  FONTSIZE_18: "18px",
  FONTSIZE_16: "16px",
  FONTSIZE_14: "14px",
  FONTSIZE_12: "12px",
  // Font Weight
  FONTWEIGHT_LIGHT: 300,
  FONTWEIGHT_REGULAR: 400,
  FONTWEIGHT_MEDIUM: 500,
  FONTWEIGHT_SEMIBOLD: 600,
  FONTWEIGHT_BOLD: 700,
  //Line Height
  LINEHEIGHT_58: "58px",
  LINEHEIGHT_46: "46px",
  LINEHEIGHT_38: "38px",
  LINEHEIGHT_34: "34px",
  LINEHEIGHT_30: "30px",
  LINEHEIGHT_28: "28px",
  LINEHEIGHT_26: "26px",
  LINEHEIGHT_24: "24px",
  LINEHEIGHT_22: "22px",
  LINEHEIGHT_20: "20px",
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
  DEFAULT_BORDER_RADIUS_CTA: "5px",
  /***== New Design System Implementation ==***/
  /*  Typography */
  TYPOGRAPHY: {
    HEADING: {
      H1LARGE: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H1: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H2: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H3: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H4: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H5: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H6: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      H7: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
    },
    PARAGRAPH: {
      P1: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      P2: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      P3: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
      P4: {
        MARGIN: {
          SMTOP: "10px",
          LGTOP: "12px",
          SMBOTTOM: "10px",
          LGBOTTOM: "12px",
        },
      },
    },
  },
  ELEMENT: {
    TEXTBOX: {
      BORDER_RADIUS: "5px",
      PADDING: {
        sm: "22px 12px 4px 10px",
        md: "22px 12px 4px 10px",
      },
      PADDINGV2: {
        sm: "25px 12px 12px 12px",
        md: "25px 12px 12px 12px",
      },
      PADDINGV3: {
        sm: "20px 12px 15px 12px",
        md: "20px 12px 15px 12px",
      },
    },
    BUTTON: {
      BORDER_RADIUS: "5px",
      MEDIUM_HEIGHT: "47px",
      SMALL_HEIGHT: "38px",
      LARGE_HEIGHT: "63px",
      XLARGE_HEIGHT: "66px",
      MIN_WIDTH: "150px",
      MIN_WIDTH_SMALL: "90px",
      PADDING: {
        sm: "9px 16px",
        md: "12px 24px",
        lg: "20px 32px",
        xl: "20px 32px",
      },
      MARGIN: {
        TOP: "12px",
        RIGHT: "12px",
        BOTTOM: "12px",
        LEFT: "0px",
        SMMARGIN: "10px 10px 10px 0px",
        MDMARGIN: "10px 10px 10px 0px",
      },
    },
    SELECT: {
      BORDER_RADIUS: "5px",
      HEIGHT: "60px",
      PADDING: {
        sm: "14px 12px 14px 12px",
        md: "14px 12px 14px 12px",
      },
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
        SMTOP: "10px",
        SMBOTTOM: "10px",
        LGTOP: "12px",
        LGBOTTOM: "12px",
      },
    },
    CARD: {
      TYPE_1: {
        BORDER_RADIUS: "8px",
        PADDING_CONTENT: "12px 20px 20px 20px",
        PADDING_IMAGE: "12px 20px 20px 20px",
        ELEVATION4: "0px 10px 15px 0px rgba(0, 0, 0, 0.03);",
        GRADIENT: "linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)",
      },
    },
  },
  OVERYLAY: {
    EDITOVERLAY: "50, 130, 250, 0.9",
    BGOVERLAY: "255, 255, 255, 0.3",
    CARDOVERLAY: "0, 0,0, 0.6",
  },
  RADIUS: {
    VALUE1: "5px",
    VALUE2: "8px",
  },

  /* Prelem Type 1 PRIMARY (default White background)*/
  SECONDARY_PRELEM: {
    BACKGROUND: "#343051",
    TITLE: "#FFFFFF",
    PARAGRAPH: "#EFF0F6",
    LABEL: "#4B9EF9",
    LINE: "#655792",
    LINK: "#4B9EF9",
    BUTTON: {
      VARIANT1: {
        COLOR: "#14142B",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "#FFFFFF",
        BACKGROUND_COLOR_HOVER: "#D7ECFD",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT2: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT3: {
        COLOR: "#4B9EF9",
        COLOR_HOVER: "#FFFFFF",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#4B9EF9",
        BORDER: "solid 1px  #4B9EF9",
        BORDER_HOVER: "solid 1px  #4B9EF9",
      },
      VARIANT4: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
    },
    INPUT: {
      PLACEHOLDER: "#343051",
      TEXT: "#89909A",
      TEXT_ACTIVE: "#fffff",
      LABEL: "#6E7191",
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #343051",
      BORDER_ERROR: "solid 2px #F33E41",
      BORDER_SUCCESS: "solid 2px #0FA069",
      BACKGROUND_FOCUSED: "#343051",
      BACKGROUND_ERROR: "#FFEBEE",
      BACKGROUND_ERROR_TEXT: "#F33E41",
      BACKGROUND_SUCCESS: "#DEF5D9",
      BACKGROUND_SUCCESS_TEXT: "#0FA069",
      DISABLED: "#343051",
    },
    SELECT: {
      PLACEHOLDER: "#343051", //Selectbox bg
      LABEL: "#6E7191", //animated tex of focus
      TEXT: "#6E7191", //dropdownlist popup default text
      TEXT_HOVER: "#ffffff", //dropdownlist popup hover text color,
      TEXT_SELECTED: "#89909A",
      TEXT_BACKGROUND_HOVER: "#4B9EF9", //dropdownlist popup hover text background
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #14142B", //focused border color
    },
    CHECKBOX: {
      BOX_COLOR: "#4B9EF9",
    },
    RADIO: {
      BOX_COLOR: "#4B9EF9",
      BOX_COLOR_ACTIVE: "#4B9EF9",
      SIZE: "24px",
    },
    ACCORDIAN: {
      BACKGROUND: "#231C39",
      COLOR: "#fff",
      BORDER_COLOR: "#3E306A",
    },
    CARDS: {
      VARIANT1: {
        BACKGROUND: "#FFFFFF",
        ALTERNET_BACKGROUND: "#F7F7FC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        BORDER_COLOR: "#3E306A",
        BORDER_COLOR_HOVER: "#3E306A",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      VARIANT2: {
        BACKGROUND: "#292647",
        ALTERNET_BACKGROUND: "#343051",
        TITLE: "#FFFFFF",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4E4B66",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_HOVER: "#14142B",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      ECOM_CARD_BACKGROUND: "#fdfdfd", //not to be changed
      ECOM_MASK_BACKGROUND: "#14142B", //not to be changed
    },
    ACCENTS: {
      VARIANT1: {
        BACKGROUND: "#F5F5FF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT2: {
        BACKGROUND: "#D7ECFD",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT3: {
        BACKGROUND: "#A8E6CF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT4: {
        BACKGROUND: "#FFD3B6",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT5: {
        BACKGROUND: "#FFAAA5",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT6: {
        BACKGROUND: "#A2D2EC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
    },
    NOTIFICATION: {
      SUCCESS: {
        BACKGROUND: "#0EA069",
        COLOR: "#fff",
      },
      WARNING: {
        BACKGROUND: "#FFCC40",
        COLOR: "#fff",
      },
      ERROR: {
        BACKGROUND: "#F33E41",
        COLOR: "#fff",
      },
      INFO: {
        BACKGROUND: "#009DDF",
        COLOR: "#fff",
      },
    },
    POPUP: {
      BACKGROUND: "orange",
      COLOR: "orange",
    },
    TAB: {
      VARIANT1: {
        TITLE: "#14142B",
        TITLE_ACTIVE: "#FFFFFF",
        TITLE_BACKGROUND: "#FFFFFF",
        TITLE_ACTIVE_BACKGROUND: "#4B9EF9",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4B9EF9",
        LINE: "#3E306A",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_ACTIVE: "transparent",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_ACTIVE: "#4B9EF9",
      },
    },
  },

  /* Prelem Type 2 SECONDARY (default black background)*/
  PRIMARY_PRELEM: {
    BACKGROUND: "#231C39",
    TITLE: "#FFFFFF",
    PARAGRAPH: "#EFF0F6",
    LABEL: "#4B9EF9",
    LINE: "#3E306A",
    LINK: "#4B9EF9",
    BUTTON: {
      VARIANT1: {
        COLOR: "#14142B",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "#FFFFFF",
        BACKGROUND_COLOR_HOVER: "#D7ECFD",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT2: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT3: {
        COLOR: "#4B9EF9",
        COLOR_HOVER: "#FFFFFF",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#4B9EF9",
        BORDER: "solid 1px  #4B9EF9",
        BORDER_HOVER: "solid 1px  #4B9EF9",
      },
      VARIANT4: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#4B9EF9",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
    },
    INPUT: {
      PLACEHOLDER: "#343051",
      TEXT: "#89909A",
      TEXT_ACTIVE: "#fffff",
      LABEL: "#6E7191",
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #6E7191",
      BORDER_ERROR: "solid 2px #F33E41",
      BORDER_SUCCESS: "solid 2px #0FA069",
      BACKGROUND_FOCUSED: "#343051",
      BACKGROUND_ERROR: "#FFEBEE",
      BACKGROUND_ERROR_TEXT: "#F33E41",
      BACKGROUND_SUCCESS: "#DEF5D9",
      BACKGROUND_SUCCESS_TEXT: "#0FA069",
      DISABLED: "#343051",
    },
    SELECT: {
      PLACEHOLDER: "#343051", //Selectbox bg
      LABEL: "#6E7191", //animated tex of focus
      TEXT: "#6E7191", //dropdownlist popup default text
      TEXT_HOVER: "#ffffff", //dropdownlist popup hover text color,
      TEXT_SELECTED: "#89909A",
      TEXT_BACKGROUND_HOVER: "#4B9EF9", //dropdownlist popup hover text background
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #6E7191", //focused border color
    },
    CHECKBOX: {
      BOX_COLOR: "#4B9EF9",
    },
    RADIO: {
      BOX_COLOR: "#4B9EF9",
      BOX_COLOR_ACTIVE: "#4B9EF9",
      SIZE: "24px",
    },
    ACCORDIAN: {
      BACKGROUND: "#231C39",
      COLOR: "#fff",
      BORDER_COLOR: "#3E306A",
    },
    CARDS: {
      VARIANT1: {
        BACKGROUND: "#FFFFFF",
        ALTERNET_BACKGROUND: "#F7F7FC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        BORDER_COLOR: "#3E306A",
        BORDER_COLOR_HOVER: "#4E4B66",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      VARIANT2: {
        BACKGROUND: "#292647",
        ALTERNET_BACKGROUND: "#343051",
        TITLE: "#FFFFFF",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4E4B66",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_HOVER: "#14142B",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      ECOM_CARD_BACKGROUND: "#fdfdfd", //not to be changed
      ECOM_MASK_BACKGROUND: "#14142B", //not to be changed
    },
    ACCENTS: {
      VARIANT1: {
        BACKGROUND: "#F5F5FF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT2: {
        BACKGROUND: "#D7ECFD",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT3: {
        BACKGROUND: "#A8E6CF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT4: {
        BACKGROUND: "#FFD3B6",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT5: {
        BACKGROUND: "#FFAAA5",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT6: {
        BACKGROUND: "#A2D2EC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
    },
    NOTIFICATION: {
      SUCCESS: {
        BACKGROUND: "#0EA069",
        COLOR: "#fff",
      },
      WARNING: {
        BACKGROUND: "#FFCC40",
        COLOR: "#fff",
      },
      ERROR: {
        BACKGROUND: "#F33E41",
        COLOR: "#fff",
      },
      INFO: {
        BACKGROUND: "#009DDF",
        COLOR: "#fff",
      },
    },
    POPUP: {
      BACKGROUND: "orange",
      COLOR: "orange",
    },
    TAB: {
      VARIANT1: {
        TITLE: "#14142B",
        TITLE_ACTIVE: "#FFFFFF",
        TITLE_BACKGROUND: "#FFFFFF",
        TITLE_ACTIVE_BACKGROUND: "#4B9EF9",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4B9EF9",
        LINE: "#3E306A",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_ACTIVE: "transparent",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_ACTIVE: "#4B9EF9",
      },
    },
  },
  /* Prelem type 3 TERTIARY (default gray background)*/
  TERTIARY_PRELEM: {
    BACKGROUND: "#343051",
    TITLE: "#FFFFFF",
    PARAGRAPH: "#EFF0F6",
    LABEL: "#4B9EF9",
    LINE: "#655792",
    LINK: "#4B9EF9",
    BUTTON: {
      VARIANT1: {
        COLOR: "#14142B",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "#FFFFFF",
        BACKGROUND_COLOR_HOVER: "#D7ECFD",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT2: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
      VARIANT3: {
        COLOR: "#4B9EF9",
        COLOR_HOVER: "#FFFFFF",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#4B9EF9",
        BORDER: "solid 1px  #4B9EF9",
        BORDER_HOVER: "solid 1px  #4B9EF9",
      },
      VARIANT4: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#14142B",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_HOVER: "#FFFFFF",
        BORDER: "solid 1px  #FFFFFF",
        BORDER_HOVER: "solid 1px  #FFFFFF",
      },
    },
    INPUT: {
      PLACEHOLDER: "#343051",
      TEXT: "#89909A",
      TEXT_ACTIVE: "#fffff",
      LABEL: "#6E7191",
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #343051",
      BORDER_ERROR: "solid 2px #F33E41",
      BORDER_SUCCESS: "solid 2px #0FA069",
      BACKGROUND_FOCUSED: "#343051",
      BACKGROUND_ERROR: "#FFEBEE",
      BACKGROUND_ERROR_TEXT: "#F33E41",
      BACKGROUND_SUCCESS: "#DEF5D9",
      BACKGROUND_SUCCESS_TEXT: "#0FA069",
      DISABLED: "#343051",
    },
    SELECT: {
      PLACEHOLDER: "#343051", //Selectbox bg
      LABEL: "#6E7191", //animated tex of focus
      TEXT: "#6E7191", //dropdownlist popup default text
      TEXT_HOVER: "#ffffff", //dropdownlist popup hover text color,
      TEXT_SELECTED: "#89909A",
      TEXT_BACKGROUND_HOVER: "#4B9EF9", //dropdownlist popup hover text background
      BORDER: "solid 2px transparent",
      BORDER_ACTIVE: "solid 2px #14142B", //focused border color
    },
    CHECKBOX: {
      BOX_COLOR: "#4B9EF9",
    },
    RADIO: {
      BOX_COLOR: "#4B9EF9",
      BOX_COLOR_ACTIVE: "#4B9EF9",
      SIZE: "24px",
    },
    ACCORDIAN: {
      BACKGROUND: "#231C39",
      COLOR: "#fff",
      BORDER_COLOR: "#3E306A",
    },
    CARDS: {
      VARIANT1: {
        BACKGROUND: "#FFFFFF",
        ALTERNET_BACKGROUND: "#F7F7FC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        BORDER_COLOR: "#3E306A",
        BORDER_COLOR_HOVER: "#3E306A",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      VARIANT2: {
        BACKGROUND: "#292647",
        ALTERNET_BACKGROUND: "#343051",
        TITLE: "#FFFFFF",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4E4B66",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_HOVER: "#14142B",
        BOX_SHADOW: "0px 10px 15px 0px rgba(0, 0, 0, 0.03)",
      },
      ECOM_CARD_BACKGROUND: "#fdfdfd", //not to be changed
      ECOM_MASK_BACKGROUND: "#14142B", //not to be changed
    },
    ACCENTS: {
      VARIANT1: {
        BACKGROUND: "#F5F5FF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT2: {
        BACKGROUND: "#D7ECFD",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT3: {
        BACKGROUND: "#A8E6CF",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT4: {
        BACKGROUND: "#FFD3B6",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT5: {
        BACKGROUND: "#FFAAA5",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
      VARIANT6: {
        BACKGROUND: "#A2D2EC",
        TITLE: "#14142B",
        PARAGRAPH: "#4E4B66",
        LABEL: "#6E7191",
        LINE: "#D9DBE9",
      },
    },
    NOTIFICATION: {
      SUCCESS: {
        BACKGROUND: "#0EA069",
        COLOR: "#fff",
      },
      WARNING: {
        BACKGROUND: "#FFCC40",
        COLOR: "#fff",
      },
      ERROR: {
        BACKGROUND: "#F33E41",
        COLOR: "#fff",
      },
      INFO: {
        BACKGROUND: "#009DDF",
        COLOR: "#fff",
      },
    },
    POPUP: {
      BACKGROUND: "orange",
      COLOR: "orange",
    },
    TAB: {
      VARIANT1: {
        TITLE: "#14142B",
        TITLE_ACTIVE: "#FFFFFF",
        TITLE_BACKGROUND: "#FFFFFF",
        TITLE_ACTIVE_BACKGROUND: "#4B9EF9",
        PARAGRAPH: "#EFF0F6",
        LABEL: "#4B9EF9",
        LINE: "#3E306A",
        BACKGROUND_COLOR: "transparent",
        BACKGROUND_COLOR_ACTIVE: "transparent",
        BORDER_COLOR: "#D9DBE9",
        BORDER_COLOR_ACTIVE: "#4B9EF9",
      },
    },
  },
  HEADER: {
    HEADER_HEIGHT: "60px",
    VARIANT2: {
      BACKGROUND: "#FFFFFF",
      BACKGROUND_HOVER: "#F5F5FF",
      TITLE: "#14142B",
      TITLE_HOVER: "#14142B",
      PARAGRAPH: "#4E4B66",
      PARAGRAPH_HOVER: "#4E4B66",
      LABEL: "#6E7191",
      LABEL_HOVER: "#6E7191",
      LINE: "#D9DBE9",
      LINE_HOVER: "#D9DBE9",
      BORDER_COLOR: "#D9DBE9",
      BORDER_COLOR_HOVER: "#14142B",
      BUTTON: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#FFFFFF",
        BACKGROUND_COLOR: "#14142B",
        BACKGROUND_COLOR_HOVER: "#413C61",
        BORDER_COLOR: "#14142B",
        BORDER_COLOR_HOVER: "#14142B",
      },
      BADGE: {
        BACKGROUND: "#4B9EF9",
        TITLE: "#FFF",
      },
    },
    VARIANT1: {
      BACKGROUND: "#231C39",
      BACKGROUND_HOVER: "#343051",
      TITLE: "#FFFFFF",
      TITLE_HOVER: "#FFFFFF",
      PARAGRAPH: "#FFFFFF",
      PARAGRAPH_HOVER: "#FFFFFF",
      LABEL: "#6E7191",
      LABEL_HOVER: "#6E7191",
      LINE: "#3E306A",
      LINE_HOVER: "#D9DBE9",
      BORDER_COLOR: "#D9DBE9",
      BORDER_COLOR_HOVER: "#14142B",
      BUTTON: {
        COLOR: "#FFFFFF",
        COLOR_HOVER: "#FFFFFF",
        BACKGROUND_COLOR: "#14142B",
        BACKGROUND_COLOR_HOVER: "#413C61",
        BORDER_COLOR: "#14142B",
        BORDER_COLOR_HOVER: "#14142B",
      },
      BADGE: {
        BACKGROUND: "#FFE18D",
        TITLE: "#14142B",
      },
    },
  },
  FOOTER: {
    VARIANT1: {
      BACKGROUND: "#231C39",
      BACKGROUND_SECOND: "#262338",
      TITLE: "#FFFFFF",
      TITLE_HOVER: "#FFFFFF",
      PARAGRAPH: "#FFFFFF",
      PARAGRAPH_HOVER: "#FFFFFF",
      LABEL: "#6E7191",
      LABEL_HOVER: "#6E7191",
      LINE: "#3E306A",
      LINE_HOVER: "#D9DBE9",
      BORDER_COLOR: "#D9DBE9",
      BORDER_COLOR_HOVER: "#14142B",
    },
  },

  FONTFAMILYPRIMARY: HCLRobort,
  FONTFAMILYSECONDARY: InterRegular,
  FONTNAMEPRIMARY: "HCLTechRoobert",
  FONTNAMESECONDARY: "Inter",
};

export default ThemeConstants;
