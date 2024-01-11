import { createTheme } from "@mui/material/styles";
import React from "react";
import ThemeConstants from './lightTheme/lightThemeVariable';
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;  
    sm: true;
    md: true;
    lg: true;
    xl: true;
    em: true;   
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    weblarge: true;
    h1large: true;
    h1largebold: true;
    h1largesemibold: true;
    h1largeregular: true;
    h1largemedium: true;
    h1bold: true;
    h1semibold: true;
    h1regular: true;
    h1medium: true;
    h2bold: true;
    h2semibold: true;
    h2regular: true;
    h2medium: true;
    h3bold: true;
    h3semibold: true;
    h3regular: true;
    h3medium: true;
    h4bold: true;
    h4semibold: true;
    h4regular: true;
    h4medium: true;
    h5bold: true;
    h5semibold: true;
    h5regular: true;
    h5medium: true;
    h6bold: true;
    h6semibold: true;
    h6regular: true;
    h6medium: true;
    h7bold: true;
    h7semibold: true;
    h7regular: true;
    h7medium: true;
    p1bold: true;
    p1semibold: true;
    p1medium: true;
    p1regular: true;
    p2bold: true;
    p2semibold: true;
    p2medium: true;
    p2regular: true;
    p3bold: true;
    p3semibold: true;
    p3medium: true;
    p3regular: true;
    p4bold: true;
    p4semibold: true;
    p4medium: true;
    p4regular: true;
    labelregular: true;
    labelbold: true;
  }
  interface TypographyPropsColorOverrides {
    primaryColor: true;
    secondaryColor: true;
    warningColor: true;
    successColor: true;
    errorColor: true;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    tertiary: true;
    transparent: true;
    redbutton: true;
    blackbutton: true;
    whitebutton: true;
    imagetext: true;
    labelbold: true;
    labelregular: true;
    ecommerceButton: true;
    graybuttonsmall: true;
    ecommerceLinkButton: true;

    primaryButton: true;
    secondaryButton: true;
    tertiaryButton: true;
    quaternaryButton: true;
    quaternaryButtonOutline: true;
    quinaryButton: true;
    textButton: true;
    warningButton: true;
    warningButtonOutline: true;
    errorButton: true;
    errorButtonOutline: true;
    successButton: true;
    successButtonOutline: true;
  }
  interface ButtonPropsColorOverrides {
    primaryColor: true;
    secondaryColor: true;
    warningColor: true;
    successColor: true;
    errorColor: true;
  }
}
declare module "@mui/material/styles" {
  interface Theme {
    prelemMargin: {
      value: string;
    };
    prelemPaddingTop: {
      value: string;
    };
    prelemPaddingBottom: {
      value: string;
    };
    borderRadius: {
      value: string;
      value1: string;
    }
  }
  interface ThemeOptions {
    prelemMargin?: {
      value: React.CSSProperties["margin"];
    };
    prelemPaddingBottom?: {
      value: React.CSSProperties["paddingBottom"];
    };
    prelemPaddingTop?: {
      value: React.CSSProperties["paddingTop"];
    };
    borderRadius?: {
      value: React.CSSProperties["borderRadius"];
      value1: React.CSSProperties["borderRadius"];
    }
  }
  interface Palette {
    primaryColor?: Palette['primary'];
    secondaryColor?: Palette['secondary'];
    warningColor?: Palette['warning'];
    successColor?: Palette['success'];
    errorColor?: Palette['error'];
    warningVal?: Palette['error'];
    overlay?: any;
    autoRenewIcon?: any;
    textColor?: string;
    textColor1?: string;
    textColor1Paragraph?: string;
    prelemType1?: any;
    prelemType2?: any;
    prelemType3?: any;
    header?: any;
    footer?: any;
    headerTextColor?: string;
    headerParagraphColor?: string;
    footerTextColor?: string;
    footerParagraphColor?: string;
    primaryAnchorLink?: string;
    secondaryTitle?: string;
    secondaryParagraph?: string;
    secondaryAnchorLink?: string;
    secondaryLabel?: string;
    tertiaryTitle?: string;
    tertiaryParagraph?: string;
    tertiaryLabel?: string;
    tertiaryAnchorLink?: string;
  }
  interface PaletteOptions {
    primaryColor?: {
      main: string,
      contrastText: string,
      950: string,
      900: string,
      800: string,
      700: string,
      600: string,
      500: string,
      400: string,
      300: string,
      200: string,
      100: string,
    };
    secondaryColor?: {
      main: string,
      contrastText: string,
      950: string,
      900: string,
      800: string,
      700: string,
      600: string,
      500: string,
      400: string,
      300: string,
      200: string,
      100: string,
    };
    warningColor?: {
      main: string,
      contrastText: string,
      950: string,
      900: string,
      800: string,
      700: string,
      600: string,
      500: string,
      400: string,
      300: string,
      200: string,
      100: string,
    };
    successColor?: {
      main: string,
      contrastText: string,
      950: string,
      900: string,
      800: string,
      700: string,
      600: string,
      500: string,
      400: string,
      300: string,
      200: string,
      100: string,
    };
    errorColor?: {
      main: string,
      contrastText: string,
      950: string,
      900: string,
      800: string,
      700: string,
      600: string,
      500: string,
      400: string,
      300: string,
      200: string,
      100: string,
    };
    overlay?: {
      editOverlay: string;
      bgOverlay: string;
      cardOverlay?: string;
    }
    primaryText?: string,
    secondaryText?: string,
    successText?: string,
    warningText?: string,
    errorText?: string,
    linkText?: string;
    bgLight?: string;
    bgWeak?: string;
    input?: string;
    line?: string;
    placeholder?: string;
    lightText?: string;
    darkText?: string;
  }
}
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    primaryColor: true;
    secondaryColor: true;
    warningColor: true;
    successColor: true;
    errorColor: true;
  }
}
declare module "@mui/system" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    em: true;
    lg: true;
    xl: true;
  }
}

const LightTheme = createTheme({
  prelemMargin: {
    value: "0px",
  },
  prelemPaddingBottom: {
    value: "12px",
  },
  prelemPaddingTop: {
    value: "12px",
  },
  borderRadius: {
    value: '5px',
    value1: '8px',
  },
  breakpoints: {
    values: {
      xs: ThemeConstants.XS,
      sm: ThemeConstants.SM,
      md: ThemeConstants.MD,
      em: ThemeConstants.EM,
      lg: ThemeConstants.LG,
      xl: ThemeConstants.XL,
    },
  },
  palette: {
    primary: {
      main: ThemeConstants.PRIMARY_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
    },
    secondary: {
      main: ThemeConstants.WARNING_COLOR[900],
      contrastText: ThemeConstants.WHITE_COLOR,
    },
    warning: {
      main: ThemeConstants.WARNING_COLOR[950],
    },
    success: {
      main: ThemeConstants.SUCCESS_COLOR[950],
    },
    error: {
      main: ThemeConstants.ERROR_COLOR[950],
    },
    primaryColor: {
      main: ThemeConstants.PRIMARY_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
      950: ThemeConstants.PRIMARY_COLOR[950],
      900: ThemeConstants.PRIMARY_COLOR[900],
      800: ThemeConstants.PRIMARY_COLOR[800],
      700: ThemeConstants.PRIMARY_COLOR[700],
      600: ThemeConstants.PRIMARY_COLOR[600],
      500: ThemeConstants.PRIMARY_COLOR[500],
      400: ThemeConstants.PRIMARY_COLOR[400],
      300: ThemeConstants.PRIMARY_COLOR[300],
      200: ThemeConstants.PRIMARY_COLOR[200],
      100: ThemeConstants.PRIMARY_COLOR[100],
    },
    secondaryColor: {
      main: ThemeConstants.SECONDRY_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
      950: ThemeConstants.SECONDRY_COLOR[950],
      900: ThemeConstants.SECONDRY_COLOR[900],
      800: ThemeConstants.SECONDRY_COLOR[800],
      700: ThemeConstants.SECONDRY_COLOR[700],
      600: ThemeConstants.SECONDRY_COLOR[600],
      500: ThemeConstants.SECONDRY_COLOR[500],
      400: ThemeConstants.SECONDRY_COLOR[400],
      300: ThemeConstants.SECONDRY_COLOR[300],
      200: ThemeConstants.SECONDRY_COLOR[200],
      100: ThemeConstants.SECONDRY_COLOR[100],
    },
    warningColor: {
      main: ThemeConstants.WARNING_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
      950: ThemeConstants.WARNING_COLOR[950],
      900: ThemeConstants.WARNING_COLOR[900],
      800: ThemeConstants.WARNING_COLOR[800],
      700: ThemeConstants.WARNING_COLOR[700],
      600: ThemeConstants.WARNING_COLOR[600],
      500: ThemeConstants.WARNING_COLOR[500],
      400: ThemeConstants.WARNING_COLOR[400],
      300: ThemeConstants.WARNING_COLOR[300],
      200: ThemeConstants.WARNING_COLOR[200],
      100: ThemeConstants.WARNING_COLOR[100],
    },
    successColor: {
      main: ThemeConstants.SUCCESS_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
      950: ThemeConstants.SUCCESS_COLOR[950],
      900: ThemeConstants.SUCCESS_COLOR[900],
      800: ThemeConstants.SUCCESS_COLOR[800],
      700: ThemeConstants.SUCCESS_COLOR[700],
      600: ThemeConstants.SUCCESS_COLOR[600],
      500: ThemeConstants.SUCCESS_COLOR[500],
      400: ThemeConstants.SUCCESS_COLOR[400],
      300: ThemeConstants.SUCCESS_COLOR[300],
      200: ThemeConstants.SUCCESS_COLOR[200],
      100: ThemeConstants.SUCCESS_COLOR[100],
    },
    errorColor: {
      main: ThemeConstants.ERROR_COLOR[950],
      contrastText: ThemeConstants.WHITE_COLOR,
      950: ThemeConstants.ERROR_COLOR[950],
      900: ThemeConstants.ERROR_COLOR[900],
      800: ThemeConstants.ERROR_COLOR[800],
      700: ThemeConstants.ERROR_COLOR[700],
      600: ThemeConstants.ERROR_COLOR[600],
      500: ThemeConstants.ERROR_COLOR[500],
      400: ThemeConstants.ERROR_COLOR[400],
      300: ThemeConstants.ERROR_COLOR[300],
      200: ThemeConstants.ERROR_COLOR[200],
      100: ThemeConstants.ERROR_COLOR[100],
    },
    overlay: {
      editOverlay: ThemeConstants.OVERYLAY.EDITOVERLAY,
      bgOverlay: ThemeConstants.OVERYLAY.EDITOVERLAY,
    },
    primaryText: ThemeConstants.PRIMARY_COLOR[950],
    secondaryText: ThemeConstants.SECONDRY_COLOR[950],
    successText: ThemeConstants.SUCCESS_COLOR[950],
    warningText: ThemeConstants.WARNING_COLOR[950],
    errorText: ThemeConstants.ERROR_COLOR[950],
    linkText: ThemeConstants.SECONDRY_COLOR[900],
    bgLight: ThemeConstants.PRIMARY_COLOR[300],
    bgWeak: ThemeConstants.PRIMARY_COLOR[200],
    input: ThemeConstants.PRIMARY_COLOR[400],
    line: ThemeConstants.PRIMARY_COLOR[500],
    placeholder: ThemeConstants.PRIMARY_COLOR[600],
    lightText: ThemeConstants.WHITE_COLOR,
    darkText: ThemeConstants.PRIMARY_COLOR[950],
  },
  typography: {
    allVariants: {
      fontFamily: ThemeConstants.FONTNAMEPRIMARY,
      letterSpacing: 0,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: ${ThemeConstants.FONTNAMEPRIMARY};
        src: url(${ThemeConstants.FONTFAMILYPRIMARY}) format("truetype");
        font-display: block;
      }
      @font-face {
        font-family: ${ThemeConstants.FONTNAMESECONDARY};
        src: url(${ThemeConstants.FONTFAMILYSECONDARY}) format("truetype");
        font-display: block;
      },
      `,
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primaryButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.PRIMARY_COLOR[950],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.PRIMARY_COLOR[900],
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[800],
              backgroundColor: ThemeConstants.PRIMARY_COLOR[600],
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "secondaryButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.PRIMARY_COLOR[950]}`,
            color: ThemeConstants.PRIMARY_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.PRIMARY_COLOR[950],
              color: ThemeConstants.WHITE_COLOR,
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[600],
              borderColor: ThemeConstants.PRIMARY_COLOR[600],
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "tertiaryButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.WHITE_COLOR}`,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.PRIMARY_COLOR[950],
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[800],
              borderColor: ThemeConstants.PRIMARY_COLOR[500],
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "quaternaryButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.SECONDRY_COLOR[500],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.SECONDRY_COLOR[500],
              color: ThemeConstants.WHITE_COLOR,
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "quaternaryButtonOutline" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.SECONDRY_COLOR[500]}`,
            color: ThemeConstants.SECONDRY_COLOR[500],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: "transparent",
              color: ThemeConstants.SECONDRY_COLOR[500],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "quinaryButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.PRIMARY_COLOR[100],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.PRIMARY_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.SECONDRY_COLOR[200],
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[800],
              backgroundColor: ThemeConstants.PRIMARY_COLOR[600],
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "textButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: 0,
            color: ThemeConstants.PRIMARY_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            padding: 0,
            lineHeight: 1.6,
            textAlign: "left",
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: "transparent",
              color: ThemeConstants.PRIMARY_COLOR[950],
              borderRadius: 0,
              lineHeight: 1.6,
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: 0,
              fontSize: ThemeConstants.FONTSIZE_16,
              fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            },
            "&.md": {
              padding: 0,
              fontSize: ThemeConstants.FONTSIZE_18,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            },
            "&.lg": {
              padding: 0,
              fontSize: ThemeConstants.FONTSIZE_20,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            },
            "&.xl": {
              padding: 0,
              fontSize: ThemeConstants.FONTSIZE_20,
              fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            },
          },
        },
        {
          props: { variant: "warningButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.WARNING_COLOR[950],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.WARNING_COLOR[100],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.WARNING_COLOR[950],
              color: ThemeConstants.WARNING_COLOR[100],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "warningButtonOutline" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.WARNING_COLOR[950]}`,
            color: ThemeConstants.WARNING_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: "transparent",
              color: ThemeConstants.WARNING_COLOR[950],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "errorButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.ERROR_COLOR[950],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.ERROR_COLOR[100],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.ERROR_COLOR[950],
              color: ThemeConstants.ERROR_COLOR[100],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "errorButtonOutline" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.ERROR_COLOR[950]}`,
            color: ThemeConstants.ERROR_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: "transparent",
              color: ThemeConstants.ERROR_COLOR[950],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "successButton" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.SUCCESS_COLOR[950],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.SUCCESS_COLOR[100],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.SUCCESS_COLOR[950],
              color: ThemeConstants.SUCCESS_COLOR[100],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.CTA_LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: "successButtonOutline" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.SUCCESS_COLOR[950]}`,
            color: ThemeConstants.SUCCESS_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_14,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH_SMALL}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: "transparent",
              color: ThemeConstants.SUCCESS_COLOR[950],
              boxShadow: 'none',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.CTA_LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        /*old variant */
        {
          props: { variant: 'contained' },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: ThemeConstants.PRIMARY_COLOR[950],
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.PRIMARY_COLOR[900],
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[800],
              backgroundColor: ThemeConstants.PRIMARY_COLOR[600],
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            backgroundColor: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `solid 1px ${ThemeConstants.PRIMARY_COLOR[950]}`,
            color: ThemeConstants.PRIMARY_COLOR[950],
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            boxShadow: 'none',
            "&:hover": {
              backgroundColor: ThemeConstants.PRIMARY_COLOR[950],
              color: ThemeConstants.WHITE_COLOR,
              boxShadow: 'none',
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_COLOR[600],
              borderColor: ThemeConstants.PRIMARY_COLOR[600],
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
            },
            "&.sm, &.md, &.lg, &.xl ": {
              [`@media (max-width:${ThemeConstants.MD}px)`]: {
                height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
                padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
                fontSize: ThemeConstants.FONTSIZE_16,
                "&.sm, &.md, &.lg, &.xl ": {
                  height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
                  padding: ThemeConstants.CTA_MEDIUM_PADDING,
                  fontSize: ThemeConstants.FONTSIZE_16,
                },
              },
            },
            "&.sm": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_14,
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
            },
            "&.md": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            },
            "&.lg": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.lg,
              fontSize: ThemeConstants.FONTSIZE_16,
              height: ThemeConstants.ELEMENT.BUTTON.LARGE_HEIGHT,
            },
            "&.xl": {
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.xl,
              fontSize: ThemeConstants.FONTSIZE_18,
              height: ThemeConstants.ELEMENT.BUTTON.XLARGE_HEIGHT,
            },
          },
        },
        {
          props: { variant: 'redbutton' },
          style: {
            textTransform: 'capitalize',
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            backgroundColor: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS_CTA,
            fontSize: ThemeConstants.FONTSIZE_SM,
            color: ThemeConstants.ARCHIVE_COLOR,
            border: `solid 0.5px ${ThemeConstants.ARCHIVE_COLOR}`,
            height: '40px',
            padding: '15px 20px',
            minWidth: '120px',
            boxShadow: 'none',
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: '10px 20px',
              minWidth: '200px',
            },
            '&:hover': {
              color: ThemeConstants.ARCHIVE_COLOR,
              boxShadow: 'none',
            },
            '&:disabled': {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
        },
        {
          props: { variant: 'whitebutton' },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            backgroundColor: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS,
            fontSize: ThemeConstants.FONTSIZE_CTA,
            color: ThemeConstants.BLACK_COLOR_VARIANT1,
            boxShadow: 'none',
            height: '40px',
            textTransform: 'capitalize',
            padding: '15px 18px',
            minWidth: '100px',
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: '10px 18px',
              minWidth: '100px',
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              padding: '10px 18px',
              minWidth: '100px',
            },
            [`@media (max-width:${ThemeConstants.SM}px)`]: {
              padding: '10px 18px',
              minWidth: '100px',
              height: '40px',
            },
            '&:hover': {
              backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
              color: ThemeConstants.WHITE_COLOR,
              boxShadow: 'none',
            },
            '&:disabled': {
              background: '#ced3d9',
              color: '#89909a',
            },
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          '&.menu-drawer': {
            display: 'block',
            padding: '1rem 0',
            color: ThemeConstants.WHITE_COLOR,
          },
          '&.app-menu': {
            padding: '0 1rem',
            color: ThemeConstants.WHITE_COLOR,
          },
          '&.footer-link': {
            color: ThemeConstants.LIGHT_GREY_COLOR,
          },
          '&.button-link': {
            textTransform: 'capitalize',
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS,
            color: ThemeConstants.WHITE_COLOR,
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            },
            padding: '11px 35px',
            '&:hover': {
              backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            },
            '&:disabled': {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          weblarge: "h1",
          h1large: "h1",
          h1largebold: "h1",
          h1largesemibold: "h1",
          h1largeregular: "h1",
          h1largemedium: "h1",
          h1bold: "h1",
          h1semibold: "h1",
          h1regular: "h1",
          h1medium: "h1",
          h2bold: "h2",
          h2semibold: "h2",
          h2regular: "h2",
          h2medium: "h2",
          h3bold: "h3",
          h3semibold: "h3",
          h3regular: "h3",
          h3medium: "h3",
          h4bold: "h4",
          h4semibold: "h4",
          h4regular: "h4",
          h4medium: "h4",
          h5bold: "h5",
          h5semibold: "h5",
          h5regular: "h5",
          h5medium: "h5",
          h6bold: "h6",
          h6semibold: "h6",
          h6regular: "h6",
          h6medium: "h6",
          h7bold: "p",
          h7semibold: "p",
          h7regular: "p",
          h7medium: "p",
          p1bold: "p",
          p1semibold: "p",
          p1medium: "p",
          p1regular: "p",
          p2bold: "p",
          p2semibold: "p",
          p2medium: "p",
          p2regular: "p",
          p3bold: "p",
          p3semibold: "p",
          p3medium: "p",
          p3regular: "p",
          p4bold: "p",
          p4semibold: "p",
          p4medium: "p",
          p4regular: "p",
          labelregular: "label",
          labelbold: "label",
        },
      },
      variants: [
        {
          props: { variant: "weblarge" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.WebL_H1,
            [`@media(max-width:${ThemeConstants.SM}px`]: {
              fontSize: ThemeConstants.FONTSIZE_48,
            },
            [`@media(max-width:${ThemeConstants.EM}px`]: {
              fontSize: ThemeConstants.TabL_H1,
            },
          },
        },
        {
          props: { variant: "h1large" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
            },
          },
        },
        {
          props: { variant: "h1largebold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
            },
          },
        },
        {
          props: { variant: "h1largesemibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
            },
          },
        },
        {
          props: { variant: "h1largemedium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
            },
          },
        },
        {
          props: { variant: "h1largeregular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
            },
          },
        },

        {
          props: { variant: "h1bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
            },
          },
        },
        {
          props: { variant: "h1semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
            },
          },
        },
        {
          props: { variant: "h1medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
            },
          },
        },
        {
          props: { variant: "h1regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
            },
          },
        },
        {
          props: { variant: "h2bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
            },
          },
        },
        {
          props: { variant: "h2semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
            },
          },
        },
        {
          props: { variant: "h2medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
            },
          },
        },
        {
          props: { variant: "h2regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
            },
          },
        },
        {
          props: { variant: "h3bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
            },
          },
        },
        {
          props: { variant: "h3semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
            },
          },
        },
        {
          props: { variant: "h3medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
            },
          },
        },
        {
          props: { variant: "h3regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
            },
          },
        },
        {
          props: { variant: "h4bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
          },
        },
        {
          props: { variant: "h4semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
          },
        },
        {
          props: { variant: "h4medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
          },
        },
        {
          props: { variant: "h4regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
          },
        },
        {
          props: { variant: "h5bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "h5semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "h5medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "h5regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "h6bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "h6semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "h6medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "h6regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "h7bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "h7semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "h7medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "h7regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        // Start New body variant
        {
          props: { variant: "p1bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
          },
        },
        {
          props: { variant: "p1semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
          },
        },
        {
          props: { variant: "p1medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
          },
        },
        {
          props: { variant: "p1regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
          },
        },
        {
          props: { variant: "p2bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "p2semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "p2medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "p2regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
          },
        },
        {
          props: { variant: "p3bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "p3semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "p3medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "p3regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
          },
        },
        {
          props: { variant: "p4bold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "p4semibold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "p4medium" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "p4regular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
          },
        },
        {
          props: { variant: "labelregular" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_20,
          },
        },
        {
          props: { variant: "labelbold" },
          style: {
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_20,
          },
        },
      ],
      styleOverrides: {
        root: {
          // this is styles for the new variants
          '&.secondary-typography': {
            color: ThemeConstants.WHITE_COLOR,
          },
          '&.secondary-desvription': {
            fontSize: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
            [`@media (max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_DEFAULT,
            },
          },
          '&.article-title-typography': {
            color: ThemeConstants.BLACK_COLOR,
          },
          '&.article-subtitle-typography': {
            color: ThemeConstants.LIGHT_GREY_COLOR,
            fontSize: ThemeConstants.FONTSIZE_LG,
          },
          '&.subtitle-typography': {
            color: ThemeConstants.WHITE_COLOR,
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_LG,
            },
            [`@media (max-width:${ThemeConstants.XS}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_DEFAULT,
            },
          },
          '&.drawer-label': {
            '.Platform-x-Box-root': {
              display: 'none',
            },
            '&:hover .Platform-x-Box-root': {
              display: 'flex',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.search-box': {
            borderRadius: '3px',
            marginLeft: '100px',
            marginRight: '40px',
            height: '40px',
            backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
          },
          '&.search-box-mobile': {
            borderRadius: '3px',
            height: '46px',
            backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
          },
          '& input::placeholder': {
            fontFamily: `${ThemeConstants.FONTNAMEPRIMARY} !important`,
          },
          '& input': {
            fontFamily: `${ThemeConstants.FONTNAMEPRIMARY} !important`,
          },
          '& textarea::placeholder': {
            fontFamily: `${ThemeConstants.FONTNAMEPRIMARY} !important`,
          },
          '& textarea': {
            fontFamily: `${ThemeConstants.FONTNAMEPRIMARY} !important`,
          },
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            width: '100%',
            fontSize: ThemeConstants.FONTSIZE_H7,
            '& .Platform-x-InputBase-root ': {
              minHeight: '48px',
              '&.Mui-focused fieldset ': {
                borderColor: ThemeConstants.PRIMARY_MAIN_COLOR,
              },
              '&.Mui-error fieldset': {
                borderColor: ThemeConstants.RED_COLOR,
              },
            },
          },
        },
        {
          props: { variant: 'filled' },
          style: {
            '.Platform-x-FilledInput-root': {
              boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#f6f7f8',
              borderRadius: '4px',
              borderBottom: '0px',
            },
            '.Platform-x-FilledInput-root:before': {
              borderBottom: '0px',
            },
            '&:hover .Platform-x-FilledInput-root:before': {
              borderBottom: '0px',
            },
            '.Platform-x-FilledInput-root:after': {
              borderBottom: '0px',
            },
            '&:hover .Platform-x-FilledInput-root:after': {
              borderBottom: '0px',
            },
            '.Platform-x-FilledInput-root:hover:not(.Mui-disabled):before': {
              borderBottom: '0px',
            },
          },
        },
      ],
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: ThemeConstants.DIVIDER_COLOR,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          [`@media (max-width:${ThemeConstants.XL}px)`]: {
            width: '35px',
            height: '35px',
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          '&.footer-link-grid': {
            fontSize: ThemeConstants.FONTSIZE_XS,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          '&.header-appbar': {
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            padding: '10px 0',
            position: 'relative',
            [`@media (min-width:${ThemeConstants.MD}px)`]: {
              padding: '15px 0',
            },
            // [`@media (min-width:${ThemeConstants.SM}px)`]: {
            //   minHeight: '64px',
            // },
            '.logo': {
              width: '36px',
              [`@media (min-width:${ThemeConstants.MD}px)`]: {
                width: '42px',
              },
              img: {
                maxWidth: '100%',
                display: 'block',
              },
            },
            '& .Platform-x-OutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
          border: 'solid 1px rgba(112, 112, 112, 0.0)',
          '&.footer-wrapper': {
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            minHeight: '7rem',
            borderRadius: '0',
          },
        },
      },
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       boxShadow: '0 0 0 0 rgba(115, 114, 114, 0.14)',
    //     },
    //   },
    // },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
          boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
          position: 'static',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          fontFamily: ThemeConstants.FONTNAMESECONDARY,
          // color: ThemeConstants.PRIMARY_COLOR[950],
          // '&.Mui-checked': {
          //   color: ThemeConstants.PRIMARY_COLOR[950],
          // },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: ThemeConstants.WHITE_COLOR,
          opacity: '0.95',
          borderRadius: '4px',
          backgroundColor: '#2d2d39',
        },
      },
    },
  },
});

export default LightTheme;
