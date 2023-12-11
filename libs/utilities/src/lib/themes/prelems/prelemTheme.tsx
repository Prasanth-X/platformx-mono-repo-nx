import { createTheme } from "@mui/material/styles";
import React from "react";
import ThemeConstants from "./prelemVariableLight";

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
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    transparent: true;
    blackbutton: true;
    whitebutton: true;
    imagetext: true;
    labelbold: true;
    labelregular: true;
    graybuttonsmall: true;

    ecommerceLinkButton1: true;
    ecommerceLinkButton2: true;
    defaultButton1: true;
    defaultButton2: true;
    defaultButton3: true;
    primaryButton1: true;
    primaryButton2: true;
    primaryButton3: true;
    primaryButton4: true;
    secondaryButton1: true;
    secondaryButton2: true;
    secondaryButton3: true;
    secondaryButton4: true;
    tertiaryButton1: true;
    tertiaryButton2: true;
    tertiaryButton3: true;
    tertiaryButton4: true;
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
    };
    fontFamily: {
      primary: string;
      secondary: string;
    };
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
    };
    fontFamily?: {
      primary: string;
      secondary: string;
    };
  }
  interface Palette {
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
    overlay?: {
      editOverlay: string;
      bgOverlay: string;
      cardOverlay?: string;
    };
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
    secondaryLabel?: string;
    secondaryAnchorLink?: string;
    tertiaryTitle?: string;
    tertiaryParagraph?: string;
    tertiaryLabel?: string;
    tertiaryAnchorLink?: string;
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
const PrelemTheme = createTheme({
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
    value: ThemeConstants.RADIUS.VALUE1,
    value1: ThemeConstants.RADIUS.VALUE2,
  },
  fontFamily: {
    primary: ThemeConstants.FONTNAMEPRIMARY,
    secondary: ThemeConstants.FONTNAMESECONDARY,
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
    // primary: {
    //   main: ThemeConstants.PRIMARY_COLOR[950],
    //   contrastText: ThemeConstants.WHITE_COLOR,
    // },
    // secondary: {
    //   main: ThemeConstants.WARNING_COLOR[900],
    //   contrastText: ThemeConstants.WHITE_COLOR,
    // },
    overlay: {
      editOverlay: ThemeConstants.OVERYLAY.EDITOVERLAY,
      bgOverlay: ThemeConstants.OVERYLAY.BGOVERLAY,
      cardOverlay: ThemeConstants.OVERYLAY.CARDOVERLAY,
    },
    textColor: ThemeConstants.WHITE_COLOR, //always be same no neeed to change not depend on theme
    textColor1: ThemeConstants.BLACK_COLOR, //always be same no neeed to change not depend on theme
    textColor1Paragraph: ThemeConstants.BODY_COLOR, //always be same no neeed to change
    autoRenewIcon: ThemeConstants.WHITE_COLOR,
    prelemType1: ThemeConstants.PRIMARY_PRELEM,
    prelemType2: ThemeConstants.SECONDARY_PRELEM,
    prelemType3: ThemeConstants.TERTIARY_PRELEM,
    header: ThemeConstants.HEADER,
    footer: ThemeConstants.FOOTER,
    headerTextColor: ThemeConstants.HEADER.VARIANT1.TITLE,
    headerParagraphColor: ThemeConstants.HEADER.VARIANT1.PARAGRAPH,
    footerTextColor: ThemeConstants.FOOTER.VARIANT1.TITLE,
    footerParagraphColor: ThemeConstants.FOOTER.VARIANT1.TITLE,
    primaryAnchorLink: ThemeConstants.PRIMARY_PRELEM.LINK,
    secondaryTitle: ThemeConstants.SECONDARY_PRELEM.TITLE,
    secondaryParagraph: ThemeConstants.SECONDARY_PRELEM.PARAGRAPH,
    secondaryLabel: ThemeConstants.SECONDARY_PRELEM.LABEL,
    secondaryAnchorLink: ThemeConstants.SECONDARY_PRELEM.LINK,
    tertiaryTitle: ThemeConstants.TERTIARY_PRELEM.TITLE,
    tertiaryParagraph: ThemeConstants.TERTIARY_PRELEM.PARAGRAPH,
    tertiaryLabel: ThemeConstants.TERTIARY_PRELEM.LABEL,
    tertiaryAnchorLink: ThemeConstants.TERTIARY_PRELEM.LINK,
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
          props: { variant: "primaryButton1" },
          style: {
            background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT1.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT1.COLOR,
              background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR,
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
              margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.SMMARGIN}`,
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
              minWidth: "auto",
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
          props: { variant: "primaryButton2" },
          style: {
            background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.COLOR,
            border: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.BORDER,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              //border: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.BORDER_HOVER,
              background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.COLOR_HOVER,
              "& svg": {
                fill: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.COLOR_HOVER,
              },
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.COLOR,
              border: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.BORDER,
              opacity: 0.6,
            },
            "& svg": {
              fill: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT2.COLOR,
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
              minWidth: "auto",
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
          props: { variant: "primaryButton3" },
          style: {
            background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.BORDER,
            color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.COLOR,
              border: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT3.BORDER,
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
              minWidth: "auto",
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
          props: { variant: "primaryButton4" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            lineHeight: "20px",
            height: "20px",
            textAlign: "left",
            color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT4.COLOR,
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            textTransform: "capitalize",
            justifyContent: "start",
            padding: "0px",
            margin: "0px",
            borderRadius: "0px !important",
            "&:hover": {
              // Opacity: 0.7,
              color: ThemeConstants.PRIMARY_PRELEM.BUTTON.VARIANT4.COLOR_HOVER,
              background: "transparent",
            },
          },
        },
        /*secondaryButton  four types*/
        {
          props: { variant: "secondaryButton1" },
          style: {
            background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT1.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT1.COLOR,
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR,
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
              margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.SMMARGIN}`,
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
              minWidth: "auto",
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
          props: { variant: "secondaryButton2" },
          style: {
            background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.COLOR,
            border: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.BORDER,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              border: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.BORDER_HOVER,
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.COLOR,
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR,
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
              margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.SMMARGIN}`,
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
              minWidth: "auto",
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
          props: { variant: "secondaryButton3" },
          style: {
            background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.COLOR,
            border: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.BORDER,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              border: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.BORDER_HOVER,
              color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.COLOR_HOVER,
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.COLOR,
              background: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR,
              opacity: 0.6,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
              padding: ThemeConstants.ELEMENT.BUTTON.PADDING.sm,
              fontSize: ThemeConstants.FONTSIZE_16,
              margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.SMMARGIN}`,
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
              minWidth: "auto",
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
          props: { variant: "secondaryButton4" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            lineHeight: "20px",
            height: "20px",
            textAlign: "left",
            color: ThemeConstants.SECONDARY_PRELEM.BUTTON.VARIANT4.COLOR,
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            textTransform: "capitalize",
            justifyContent: "start",
            padding: "0px",
            margin: "0px",
            borderRadius: "0px !important",
            "&:hover": {
              Opacity: 0.7,
              background: "transparent",
            },
          },
        },
        /*tertiaryButton  four types*/
        {
          props: { variant: "tertiaryButton1" },
          style: {
            background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.BORDER,
            color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.COLOR,
              border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT1.BORDER,
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
              minWidth: "auto",
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
          props: { variant: "tertiaryButton2" },
          style: {
            background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.BORDER,
            color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.COLOR,
              border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT2.BORDER,
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
              minWidth: "auto",
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
          props: { variant: "tertiaryButton3" },
          style: {
            background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.BORDER,
            color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "&:hover": {
              background: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.BACKGROUND_COLOR_HOVER,
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.COLOR_HOVER,
            },
            "&:disabled": {
              color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.COLOR,
              border: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT3.BORDER,
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
              minWidth: "auto",
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
          props: { variant: "tertiaryButton4" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            lineHeight: "20px",
            height: "20px",
            textAlign: "left",
            color: ThemeConstants.TERTIARY_PRELEM.BUTTON.VARIANT4.COLOR,
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            textTransform: "capitalize",
            justifyContent: "start",
            padding: "0px",
            margin: "0px",
            borderRadius: "0px !important",
            "&:hover": {
              opacity: 0.2,
              background: "transparent",
            },
          },
        },
        /* defaultButton1,defaultButton2 :  ALL prelem can use that having Background as an IMAGE always and text should always be white then only */
        {
          props: { variant: "defaultButton1" },
          style: {
            background: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            // border: `1px solid ${ThemeConstants.WHITE_COLOR}`,
            color: ThemeConstants.BLACK_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "& svg": {
              fill: ThemeConstants.BLACK_COLOR,
            },
            "&:hover": {
              background: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
              "& svg": {
                fill: ThemeConstants.BLACK_COLOR,
              },
            },
            "&:disabled": {
              color: ThemeConstants.BLACK_COLOR,
              border: `1px solid ${ThemeConstants.WHITE_COLOR}`,
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
              minWidth: "auto",
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
          props: { variant: "defaultButton2" },
          style: {
            background: "transparent",
            borderRadius: ThemeConstants.ELEMENT.BUTTON.BORDER_RADIUS,
            border: `1px solid ${ThemeConstants.WHITE_COLOR}`,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.ELEMENT.BUTTON.PADDING.md,
            margin: `${ThemeConstants.ELEMENT.BUTTON.MARGIN.MDMARGIN}`,
            minWidth: `${ThemeConstants.ELEMENT.BUTTON.MIN_WIDTH}`,
            "& svg": {
              fill: ThemeConstants.WHITE_COLOR,
            },
            "&:hover": {
              background: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
              "& svg": {
                fill: ThemeConstants.BLACK_COLOR,
              },
            },
            "&:disabled": {
              background: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
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
              minWidth: "auto",
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
          props: { variant: "defaultButton3" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            lineHeight: "20px",
            height: "20px",
            textAlign: "left",
            color: ThemeConstants.WHITE_COLOR,
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            textTransform: "capitalize",
            justifyContent: "start",
            padding: "0px",
            margin: "0px",
            borderRadius: "0px !important",
            "&:hover": {
              opacity: 0.9,
              background: "transparent",
              "& svg": {
                fill: ThemeConstants.WHITE_COLOR,
              },
            },
            "& svg": {
              fill: ThemeConstants.WHITE_COLOR,
            },
          },
        },
        {
          props: { variant: "ecommerceLinkButton1" },
          style: {
            lineHeight: "20px",
            height: "20px",
            textAlign: "left",
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            width: "auto",
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            textDecoration: "underline",
            textTransform: "capitalize",
            justifyContent: "start",
            padding: "0px",
            margin: "0px",
            borderRadius: "0px !important",
            "&:hover": {
              Opacity: 0.7,
              background: "transparent",
            },
            "& svg": {
              fill: ThemeConstants.PRIMARY_PRELEM.TITLE,
            },
          },
        },
        {
          props: { variant: "ecommerceLinkButton2" },
          style: {
            "& svg": {
              fill: ThemeConstants.PRIMARY_PRELEM.TITLE,
            },
          },
        },
        /*old variant */
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "capitalize",
            fontWeight: ThemeConstants.FONTWEIGHT_LIGHT,
            background: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS_CTA,
            fontSize: ThemeConstants.FONTSIZE_16,
            color: ThemeConstants.BLACK_COLOR,
            border: "solid 0.5px " + ThemeConstants.BLACK_COLOR,
            // padding: '8.5px 10px 10.5px 10px',
            width: "100%",
            height: "40px",
            padding: "15px 20px",
            minWidth: "250px",
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: "10px 20px",
              minWidth: "200px",
            },
            "&:hover": {
              background: ThemeConstants.BUTTON_MAIN_COLOR,
              color: ThemeConstants.WHITE_COLOR,
              border: "solid 0.5px " + ThemeConstants.BUTTON_MAIN_COLOR,
            },
            "&:disabled": {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
        },
        {
          props: { variant: "transparent" },
          style: {
            textTransform: "capitalize",
            fontWeight: ThemeConstants.FONTWEIGHT_LIGHT,
            background: "transparent",
            border: "1px solid",
            borderColor: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS,
            fontSize: ThemeConstants.FONTSIZE_16,
            color: ThemeConstants.WHITE_COLOR,
            padding: "15px 20px",
            minWidth: "250px",
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: "10px 20px",
              minWidth: "200px",
            },
            "&:hover": {
              background: ThemeConstants.BUTTON_MAIN_COLOR,
              color: ThemeConstants.WHITE_COLOR,
            },
            "&:disabled": {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            textTransform: "capitalize",
            background: "transparent",
            fontSize: ThemeConstants.FONTSIZE_16,
            color: ThemeConstants.WHITE_COLOR,
            padding: "15px 20px",
            minWidth: "250px",
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: "10px 20px",
              minWidth: "200px",
            },
            "&:disabled": {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
        },
        {
          props: { variant: "blackbutton" },
          style: {
            background: ThemeConstants.BLACK_COLOR_V1,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS_CTA,
            fontSize: ThemeConstants.FONTSIZE_16,
            color: ThemeConstants.WHITE_COLOR,
            textTransform: "capitalize",
            height: ThemeConstants.ELEMENT.BUTTON.MEDIUM_HEIGHT,
            padding: ThemeConstants.CTA_MEDIUM_PADDING,
            "&:hover": {
              background: ThemeConstants.BLACK_COLOR_V2,
            },
            "&:disabled": {
              color: ThemeConstants.GRAY_COLOR_v1,
              background: ThemeConstants.GRAY_COLOR_v2,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              height: ThemeConstants.ELEMENT.BUTTON.SMALL_HEIGHT,
              padding: ThemeConstants.CTA_SMALL_PADDING,
            },
          },
        },
        {
          props: { variant: "whitebutton" },
          style: {
            background: ThemeConstants.WHITE_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS,
            fontSize: ThemeConstants.FONTSIZE_14,
            color: ThemeConstants.BLACK_COLOR_VARIANT1,
            height: "40px",
            textTransform: "capitalize",
            padding: "15px 18px",
            minWidth: "100px",
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              padding: "10px 18px",
              minWidth: "100px",
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              padding: "10px 18px",
              minWidth: "100px",
            },
            [`@media (max-width:${ThemeConstants.SM}px)`]: {
              padding: "10px 18px",
              minWidth: "100px",
              height: "40px",
            },
            "&:hover": {
              background: ThemeConstants.PRIMARY_MAIN_COLOR,
              color: ThemeConstants.WHITE_COLOR,
            },
            "&:disabled": {
              background: "#ced3d9",
              color: "#89909a",
            },
          },
        },
        {
          props: { variant: "graybuttonsmall" },
          style: {
            background: ThemeConstants.LIGHT_GREY_COLOR_VARIANT7,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS,
            fontSize: ThemeConstants.FONTSIZE_14,
            border: "1px solid",
            color: ThemeConstants.BLACK_COLOR_VARIANT1,
            borderColor: ThemeConstants.LIGHT_GREY_COLOR_VARIANT7,
            height: "35px",
            textTransform: "capitalize",
            padding: "5px",
            minWidth: "35px",
            "&:hover": {
              Opacity: 0.7,
            },
            "&:disabled": {
              background: ThemeConstants.LIGHT_GREY_COLOR_VARIANT5,
              color: ThemeConstants.LIGHT_GREY_COLOR_VARIANT1,
            },
          },
        },
      ],
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [`@media(min-width:${ThemeConstants.XS}px)`]: {
            paddingLeft: 0,
            paddingRight: 0,
            maxWidth: "none",
          },
          "&.grid_full_width": {
            width: "100%",
            padding: "0 20px",
          },
          "&.grid_container": {
            margin: "0 auto",
            padding: "0 8px",
            [`@media(min-width:${ThemeConstants.XS}px)`]: {
              width: "calc(100% - 30px)",
            },
            [`@media(min-width:${ThemeConstants.SM}px)`]: {
              width: "568px",
            },
            [`@media(min-width:${ThemeConstants.MD}px)`]: {
              width: "732px",
            },
            [`@media(min-width:${ThemeConstants.EM}px)`]: {
              width: "992px",
            },
            [`@media(min-width:${ThemeConstants.LG}px)`]: {
              width: "1240px",
            },
            [`@media(min-width:${ThemeConstants.XL}px)`]: {
              width: "1340px",
            },
          },
          "&.right_grid_container": {
            margin: "0 0 0 auto",
            [`@media(min-width:${ThemeConstants.XS}px)`]: {
              width: "calc(calc(100% - 30px) + ((100% - calc(100% - 30px)) / 2))",
            },
            [`@media(min-width:${ThemeConstants.SM}px)`]: {
              width: "calc(568px + ((100% - 568px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.MD}px)`]: {
              width: "calc(732px + ((100% - 732px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.EM}px)`]: {
              width: "calc(992px + ((100% - 992px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.LG}px)`]: {
              width: "calc(1240px + ((100% - 1240px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.XL}px)`]: {
              width: "calc(1340px + ((100% - 1340px) / 2))",
            },
          },
          "&.left_grid_container": {
            margin: "0 auto 0 0",
            [`@media(min-width:${ThemeConstants.XS}px)`]: {
              width: "calc(calc(100% - 30px) + ((100% - calc(100% - 30px)) / 2))",
            },
            [`@media(min-width:${ThemeConstants.SM}px)`]: {
              width: "calc(568px + ((100% - 568px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.MD}px)`]: {
              width: "calc(732px + ((100% - 732px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.EM}px)`]: {
              width: "calc(992px + ((100% - 992px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.LG}px)`]: {
              width: "calc(1240px + ((100% - 1240px) / 2))",
            },
            [`@media(min-width:${ThemeConstants.XL}px)`]: {
              width: "calc(1340px + ((100% - 1340px) / 2))",
            },
          },
          "&.grid_container_nopadding": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "&.prelem-py": {
            paddingTop: "35px !important",
            paddingBottom: "35px !important",
            [`@media (min-width: 1024px) and (max-width: 1280px)`]: {
              paddingTop: "30px !important",
              paddingBottom: "30px !important",
            },
            [`@media (max-width: 1023px)`]: {
              paddingTop: "25px !important",
              paddingBottom: "25px !important",
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
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.WebL_H1,
            display: "inline-block",
            width: "100%",
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
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1largebold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1largesemibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1largemedium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1largeregular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_48,
            lineHeight: ThemeConstants.LINEHEIGHT_58,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_34,
              lineHeight: ThemeConstants.LINEHEIGHT_38,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1LARGE.MARGIN.SMBOTTOM,
            },
          },
        },

        {
          props: { variant: "h1bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h1regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_36,
            lineHeight: ThemeConstants.LINEHEIGHT_46,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_28,
              lineHeight: ThemeConstants.LINEHEIGHT_30,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h2bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h2semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h2medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h2regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_28,
            lineHeight: ThemeConstants.LINEHEIGHT_38,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_24,
              lineHeight: ThemeConstants.LINEHEIGHT_28,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h3bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h3semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h3medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h3regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_24,
            lineHeight: ThemeConstants.LINEHEIGHT_34,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
              lineHeight: ThemeConstants.LINEHEIGHT_24,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h4bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_16,
              lineHeight: ThemeConstants.LINEHEIGHT_22,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h4semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_16,
              lineHeight: ThemeConstants.LINEHEIGHT_22,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h4medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_16,
              lineHeight: ThemeConstants.LINEHEIGHT_22,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h4regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_30,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_16,
              lineHeight: ThemeConstants.LINEHEIGHT_22,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h5bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h5semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h5medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h5regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H5.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h6bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h6semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h6medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h6regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H6.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h7bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h7semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h7medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "h7regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.TITLE,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.LGBOTTOM,
            display: "inline-block",
            width: "100%",
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.HEADING.H7.MARGIN.SMBOTTOM,
            },
          },
        },
        // Start New body variant
        {
          props: { variant: "p1bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p1semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p1medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p1regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_20,
            lineHeight: ThemeConstants.LINEHEIGHT_28,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P1.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p2bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p2semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p2medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p2regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_18,
            lineHeight: ThemeConstants.LINEHEIGHT_26,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P2.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p3bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p3semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p3medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p3regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_16,
            lineHeight: ThemeConstants.LINEHEIGHT_24,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P3.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p4bold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p4semibold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p4medium" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "p4regular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            color: ThemeConstants.PRIMARY_PRELEM.PARAGRAPH,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_14,
            lineHeight: ThemeConstants.LINEHEIGHT_22,
            marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGTOP,
            marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_12,
              lineHeight: ThemeConstants.LINEHEIGHT_20,
              marginTop: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMTOP,
              marginBottom: ThemeConstants.TYPOGRAPHY.PARAGRAPH.P4.MARGIN.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "labelregular" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            // color: ThemeConstants.LABEL_COLOR,
            color: ThemeConstants.PRIMARY_PRELEM.LABEL,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_20,
            textTransform: "uppercase",
            display: "inline-block",
            paddingBottom: ThemeConstants.ELEMENT.LABEL.PADDING.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              paddingBottom: ThemeConstants.ELEMENT.LABEL.PADDING.SMBOTTOM,
            },
          },
        },
        {
          props: { variant: "labelbold" },
          style: {
            fontFamily: ThemeConstants.FONTNAMESECONDARY,
            // color: ThemeConstants.LABEL_COLOR,
            color: ThemeConstants.PRIMARY_PRELEM.LABEL,
            fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
            fontSize: ThemeConstants.FONTSIZE_12,
            lineHeight: ThemeConstants.LINEHEIGHT_20,
            textTransform: "uppercase",
            display: "inline-block",
            paddingBottom: ThemeConstants.ELEMENT.LABEL.PADDING.LGBOTTOM,
            [`@media(max-width:${ThemeConstants.SM}px)`]: {
              paddingBottom: ThemeConstants.ELEMENT.LABEL.PADDING.SMBOTTOM,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "&.secondary-typography": {
            color: ThemeConstants.WHITE_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.secondary-desvription": {
            fontSize: ThemeConstants.FONTSIZE_16,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            [`@media (max-width:${ThemeConstants.SM}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
          },
          "&.article-title-typography": {
            color: ThemeConstants.BLACK_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.article-subtitle-typography": {
            color: ThemeConstants.LIGHT_GREY_COLOR,
            fontSize: ThemeConstants.FONTSIZE_24,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.subtitle-typography": {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            fontSize: ThemeConstants.FONTSIZE_34,
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
            },
            [`@media (max-width:${ThemeConstants.XS}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
          },
          "&.service-card4-subtitle": {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            fontSize: ThemeConstants.FONTSIZE_34,
            [`@media (max-width:${ThemeConstants.XL}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_20,
            },
            [`@media (max-width:${ThemeConstants.XS}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
          },
          "&#WelcomeText": {
            color: ThemeConstants.PRIMARY_PRELEM.NOTIFICATION.INFO.BACKGROUND,
          },
          "&.animationText": {
            whiteSpace: "nowrap",
            display: "block",
            color: ThemeConstants.WHITE_COLOR,
            caretColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            textShadow:
              "-2px -2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", 0   -2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", 2px -2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", 2px  0   0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", 2px  2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", 0 2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", -2px 2px 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR +
              ", -2px 0 0 " +
              ThemeConstants.BUTTON_MAIN_COLOR,
            [`@media (max-width:${ThemeConstants.LG}px)`]: {
              textShadow:
                "-2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0   -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  0   0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 0 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              textShadow:
                "-2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0   -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  0   0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 0 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR,
            },
            [`@media (max-width:${ThemeConstants.SM}px)`]: {
              textShadow:
                "-2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0   -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px -2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  0   0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 2px  2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", 0 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 2px 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR +
                ", -2px 0 0 " +
                ThemeConstants.BUTTON_MAIN_COLOR,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          ".Platform-x-Tabs-flexContainer": {
            justifyContent: "center",
            marginBottom: "20px",
          },
          ".MuiTabs-flexContainer": {
            justifyContent: "center",
            marginBottom: "20px",
          },
          "&.Platform-x-Tab-root": {
            border: "1px solid #d5d5d5",
            padding: "10px 25px",
            minWidth: "150px",
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            textTransform: "capitalize",
            fontSize: ThemeConstants.FONTSIZE_16,
            fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
            [`@media (max-width:${ThemeConstants.LG}px)`]: {
              padding: "20px 10px",
              minWidth: "180px",
              minHeight: "0",
              fontSize: "16px",
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              padding: "13px 10px",
              minWidth: "150px",
            },
          },
          "&.Platform-x-Tab-root.Mui-selected": {
            borderColor: "#333",
          },
          ".Platform-x-Typography-root": {
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "&.menu-drawer": {
            display: "block",
            padding: "1rem 0",
            color: ThemeConstants.WHITE_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.app-menu": {
            padding: "0 1rem",
            color: ThemeConstants.WHITE_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.xerox-app-menu": {
            padding: "0",
            color: ThemeConstants.PRIMARY_MAIN_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            cursor: "pointer",
            [`@media (max-width:1440px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
            },
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              fontSize: ThemeConstants.FONTSIZE_14,
              padding: "0 15px",
            },
          },
          "&.footer-link": {
            color: ThemeConstants.LIGHT_GREY_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.button-link": {
            textTransform: "capitalize",
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            borderRadius: ThemeConstants.DEFAULT_BORDER_RADIUS_CTA,
            color: ThemeConstants.WHITE_COLOR,
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            [`@media (max-width:${ThemeConstants.MD}px)`]: {
              backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            },
            padding: "11px 35px",
            "&:hover": {
              backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            },
            "&:disabled": {
              color: ThemeConstants.WHITE_COLOR,
            },
          },
          "&.link": {
            color: ThemeConstants.PRIMARY_PRELEM.LINK,
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "&.footer-link-grid": {
            fontSize: ThemeConstants.FONTSIZE_12,
          },
          "&.xerox-footer-wrapper": {
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            borderRadius: "0",
            justifyContent: "space-between",
            alignItems: "center",
            [`@media (max-width:${ThemeConstants.LG}px)`]: {
              justifyContent: "center",
            },
            a: {
              margin: " 0 20px",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.expertise-show-case": {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
          },
          "&.expertise-show-case-wrapper": {
            fontFamily: ThemeConstants.FONTNAMEPRIMARY,
            ".overlay-wrapper": {
              "&:hover": {
                ".image-button-text": {
                  bottom: "0",
                  backgroundColor: ThemeConstants.BUTTON_MAIN_COLOR,
                  transition: "all 0.7s",
                },
              },
            },
          },
        },
      },
    },
    MuiSelect: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            "&.Platform-x-InputBase-root, &.custom-dropdown": {
              backgroundColor: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
              borderRadius: ThemeConstants.ELEMENT.SELECT.BORDER_RADIUS,
              border: ThemeConstants.PRIMARY_PRELEM.SELECT.BORDER,
              "& .Platform-x-FilledInput-input, & #select-small": {
                padding: ThemeConstants.ELEMENT.SELECT.PADDING.md,
              },
              "& svg": {
                color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
              },
              "&.Mui-focused": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
                border: ThemeConstants.PRIMARY_PRELEM.SELECT.BORDER_ACTIVE,
              },
              "&.Mui-disabled": {
                "& .Mui-disabled": {
                  "-webkit-text-fill-color": ThemeConstants.PRIMARY_PRELEM.SELECT.LABEL,
                },
              },
              "& .Platform-x-InputBase-input:focus": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
                border: "none",
              },
              "&:before": { display: "none" },
              "&:after": { display: "none" },
            },
            "&.Platform-x-FormLabel-root": {
              "&.Mui-focused": {
                color: "transparent",
              },
            },
          },
        },
      ],
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "filled" },
          style: {
            textTransform: "none",
            "& input:focus": {
              backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_FOCUSED,
            },
            "& input, & textarea": {
              padding: ThemeConstants.ELEMENT.TEXTBOX.PADDING.md,
              borderRadius: ThemeConstants.ELEMENT.TEXTBOX.BORDER_RADIUS,
              "&.Mui-disabled": {
                WebkitTextFillColor: ThemeConstants.PRIMARY_PRELEM.INPUT.TEXT,
                opacity: 0.5,
              },
            },
            "& textarea": {
              paddingLeft: 0,
            },
            "& .Platform-x-FilledInput-root, &.Platform-x-OutlinedInput-root": {
              backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.PLACEHOLDER,
              border: ThemeConstants.PRIMARY_PRELEM.INPUT.BORDER,
              borderRadius: ThemeConstants.ELEMENT.TEXTBOX.BORDER_RADIUS,
              color: ThemeConstants.PRIMARY_PRELEM.INPUT.TEXT,
              paddingTop: "0px !important",
              "&::after, &::before": { display: "none" },
              "&:hover": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.PLACEHOLDER,
              },
              "& svg": {
                fill: ThemeConstants.PRIMARY_PRELEM.INPUT.TEXT,
              },
            },
            "& .Platform-x-FilledInput-root.Mui-focused": {
              backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_FOCUSED,
              border: ThemeConstants.PRIMARY_PRELEM.INPUT.BORDER_ACTIVE,
              borderRadius: ThemeConstants.ELEMENT.TEXTBOX.BORDER_RADIUS,
              "& svg": {
                fill: ThemeConstants.PRIMARY_PRELEM.INPUT.TEXT,
              },
            },
            "& fieldset": { border: "none" },
            "& label": {
              color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.LABEL} !important`,
              fontSize: ThemeConstants.FONTSIZE_16,
              fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
              "&.Mui-disabled": {
                opacity: 0.5,
              },
            },
            "& .Platform-x-FilledInput-root.Mui-disabled": {
              backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
            },
            ".textfield-close-icon": {
              opacity: 0,
            },
            ".Mui-focused": {
              ".textfield-close-icon": {
                opacity: 1,
              },
            },
            ".Mui-disabled": {
              "&.Platform-x-FormHelperText-root": {
                color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
              },
              "& svg": {
                opacity: 0.2,
              },
            },
            "&.success": {
              "& input:focus, input": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_SUCCESS,
              },
              "& .Platform-x-FilledInput-root": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_SUCCESS,
              },
              "& .Platform-x-FilledInput-root.Mui-focused": {
                border: ThemeConstants.PRIMARY_PRELEM.INPUT.BORDER_SUCCESS,
              },
              "& label": {
                color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_SUCCESS_TEXT} !important`,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
                "&.Mui-disabled": {
                  color: ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED,
                },
              },
              "& .Platform-x-InputBase-root + p": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_SUCCESS_TEXT,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
              },
              "& .textfield-close-icon": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_SUCCESS_TEXT,
              },
              "& .Platform-x-FilledInput-root.Mui-disabled": {
                backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                "& input": {
                  backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
              },
              ".Mui-disabled": {
                "&.Platform-x-FormHelperText-root": {
                  color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
                "& svg": {
                  opacity: 0.2,
                },
              },
            },
            "&.error": {
              "& input:focus, input": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
              },
              "& .Platform-x-FilledInput-root": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
              },
              "& .Platform-x-FilledInput-root.Mui-focused": {
                border: ThemeConstants.PRIMARY_PRELEM.INPUT.BORDER_ERROR,
              },
              "& label": {
                color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT} !important`,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
                "&.Mui-disabled": {
                  color: ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED,
                },
              },
              "& .Platform-x-InputBase-root + p": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
              },
              "& .textfield-close-icon": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT,
              },
              "& .Platform-x-FilledInput-root.Mui-disabled": {
                backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                "& input": {
                  backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
              },
              ".Mui-disabled": {
                "&.Platform-x-FormHelperText-root, .textfield-close-icon": {
                  color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
                "& svg": {
                  opacity: 0.2,
                },
              },
            },
            "&.iconLeft": {
              "& label": {
                marginLeft: "42px",
              },
              "& input": {
                paddingLeft: "50px",
              },
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "&.search-box": {
            borderRadius: "3px",
            marginLeft: "100px",
            marginRight: "40px",
            backgroundColor: ThemeConstants.WHITE_COLOR,
          },
          "&.search-box-mobile": {
            borderRadius: "3px",
            backgroundColor: ThemeConstants.WHITE_COLOR,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "&.Platform-x-Autocomplete-root": {
            "&.auto-complete-textbox": {
              "& input[role='combobox']": {
                padding: ThemeConstants.ELEMENT.SELECT.PADDING.md,
                opacity: 1,
                ":focus": {
                  background: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
                },
              },
            },
            "& .Platform-x-Autocomplete-endAdornment": {
              right: "8px",
              "& svg": {
                fill: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
              },
              "& .Platform-x-Autocomplete-clearIndicator": {
                display: "none",
              },
            },
            "& .Platform-x-FilledInput-root.Mui-focused": {
              background: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
            },
            "&.Mui-disabled": {},
            "&.error": {
              "& input:focus, input": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
              },
              "& .Platform-x-FilledInput-root": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
              },
              "& .Platform-x-FilledInput-root.Mui-focused": {
                border: ThemeConstants.PRIMARY_PRELEM.INPUT.BORDER_ERROR,
              },
              "& label": {
                color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT} !important`,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
                "&.Mui-disabled": {
                  color: ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED,
                },
              },
              "& .Platform-x-InputBase-root + p": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT,
                fontSize: ThemeConstants.FONTSIZE_14,
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
              },
              "& .textfield-close-icon": {
                color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT,
              },
              "& .Platform-x-FilledInput-root.Mui-disabled": {
                backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                "& input": {
                  backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
              },
              ".Mui-disabled": {
                "&.Platform-x-FormHelperText-root, .textfield-close-icon": {
                  color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                },
                "& svg": {
                  opacity: 0.2,
                },
              },
            },
          },
          "&.Platform-x-Autocomplete-root + .Platform-x-Autocomplete-popper": {
            "& .Platform-x-Paper-root": {
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
              paddingTop: "10px",
              paddingBottom: "10px",
              background: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
              "& .Platform-x-Autocomplete-listbox": {
                background: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
                color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
                "& li": {
                  color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
                  padding: "8px",
                  cursor: "pointer",
                  display: "flex",
                  whiteSpace: "nowrap",
                  margin: 0,
                  "& .Platform-x-Box-root": {
                    display: "flex",
                    alignItems: "center",
                    width: "25px",
                    marginRight: "10px",
                  },
                  "&:hover": {
                    backgroundColor: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT_BACKGROUND_HOVER,
                    color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT_HOVER,
                  },
                },
              },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Platform-x-InputBase-root.Platform-x-OutlinedInput-root, &.MuiInputBase-root.MuiOutlinedInput-root":
            {
              background: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
              border: ThemeConstants.PRIMARY_PRELEM.SELECT.BORDER,
              padding: 0,
              "& input": {
                padding: ThemeConstants.ELEMENT.SELECT.PADDING.md,
                color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT_SELECTED,
                WebkitTextFillColor: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT_SELECTED,
                textAlign: "right",
                "&.Platform-x-Autocomplete-input": {
                  textAlign: "left",
                  "&.Mui-disabled": {
                    opacity: 0.5,
                  },
                },
              },
              "&.Mui-focused": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.SELECT.PLACEHOLDER,
                border: ThemeConstants.PRIMARY_PRELEM.SELECT.BORDER_ACTIVE,
              },
              "& fieldset": {
                border: "none",
              },
              "& .Platform-x-InputAdornment-positionEnd, & .MuiInputAdornment-positionEnd": {
                paddingRight: "8px",
                "& svg": {
                  color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
                },
              },
              "&.error": {
                backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
                "& input:focus, input": {
                  backgroundColor: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR,
                },
                "& .Platform-x-InputBase-root + p": {
                  color: ThemeConstants.PRIMARY_PRELEM.INPUT.BACKGROUND_ERROR_TEXT,
                  fontSize: ThemeConstants.FONTSIZE_14,
                  fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
                },
                ".Mui-disabled": {
                  "&.Platform-x-FormHelperText-root, .textfield-close-icon": {
                    color: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
                  },
                  "& svg": {
                    opacity: 0.2,
                  },
                },
              },
            },
          "&.Mui-disabled": {
            opacity: 0.5,
            color: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
            backgroundColor: `${ThemeConstants.PRIMARY_PRELEM.INPUT.DISABLED} !important`,
            "& svg": {
              opacity: 0.5,
            },
          },
          "& input.Mui-disabled": {
            WebkitTextFillColor: ThemeConstants.PRIMARY_PRELEM.SELECT.TEXT,
          },
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: "fullWidth" },
          style: {
            borderColor: ThemeConstants.PRIMARY_PRELEM.LINE,
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `solid ${ThemeConstants.ELEMENT.ACCORDIAN.BORDER} ${ThemeConstants.PRIMARY_PRELEM.ACCORDIAN.BORDER_COLOR}`,
          borderRadius: ThemeConstants.ELEMENT.ACCORDIAN.BORDER_RADIUS,
          background: ThemeConstants.PRIMARY_PRELEM.ACCORDIAN.BACKGROUND,
          color: ThemeConstants.PRIMARY_PRELEM.ACCORDIAN.COLOR,
          "&.accordianHeading, &.Platform-x-Accordion-root": {
            marginBottom: ThemeConstants.ELEMENT.ACCORDIAN.MARGINBOTTOM,
            padding: ThemeConstants.ELEMENT.ACCORDIAN.PADDING1,
            svg: { color: ThemeConstants.PRIMARY_PRELEM.TITLE },
          },
          "&.accordianHeading": {
            "&.lg": { padding: ThemeConstants.ELEMENT.ACCORDIAN.PADDING2 },
            svg: { color: ThemeConstants.PRIMARY_PRELEM.TITLE },
            "&:last-child": {
              marginBottom: 0,
            },
            "&::before": {
              display: "none",
            },
          },
          "& .accordiansummary, &.Platform-x-AccordionSummary-content": {
            margin: 0,
            padding: 0,
            textAlign: "left",
            "& .Platform-x-Typography-root": {
              margin: 0,
              padding: 0,
              marginRight: "20px",
            },
          },
          "& .accordianDetail": { padding: 0 },
          "& .accordianDetail .Platform-x-Typography-root, &.Platform-x-Typography-root": {
            padding: 0,
            margin: "4px 20px 16px 0",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          // this is styles for the new variants
          "&.header-appbar": {
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            padding: "10px 0",
            position: "relative",
            [`@media (min-width:${ThemeConstants.MD}px)`]: {
              padding: "15px 0",
            },
            // [`@media (min-width:${ThemeConstants.SM}px)`]: {
            //   minHeight: '64px',
            // },
            ".logo": {
              width: "36px",
              [`@media (min-width:${ThemeConstants.MD}px)`]: {
                width: "42px",
              },
              img: {
                maxWidth: "100%",
                display: "block",
              },
            },
            "& .Platform-x-OutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          },
          "&.xerox-header-appbar": {
            // backgroundColor: ThemeConstants.WHITE_COLOR,
            // color: ThemeConstants.PRIMARY_MAIN_COLOR,
            padding: "55px 0 0",
            position: "relative",
            boxShadow: "none",
            [`@media (min-width:${ThemeConstants.SM}px)`]: {
              padding: "15px 0 0",
            },
            [`@media (min-width:${ThemeConstants.LG}px)`]: {
              padding: "0 0",
              borderBottom: "1px solid #c4c4c4",
            },
            ".logo": {
              width: "36px",
              [`@media (min-width:${ThemeConstants.MD}px)`]: {
                width: "42px",
              },
              img: {
                maxWidth: "100%",
                display: "block",
              },
            },
            ".xerox-logo": {
              width: "225px",
              display: "flex",
              flexWrap: "wrap",
              minWidth: "225px",
              img: {
                maxWidth: "100%",
                display: "block",
              },
            },
            ".powered-by-x": {
              padding: "8px 13px",
              borderLeft: "1px solid #d8d8d8",
              borderRight: "1px solid #d8d8d8",
              marginLeft: "20px",
              // maxWidth: '140px',
              [`@media (max-width:${ThemeConstants.LG}px)`]: {
                position: "absolute",
                right: "24px",
                top: "0",
                whiteSpace: "initial",
                padding: "5px 13px",
              },
              [`@media (max-width:${ThemeConstants.SM}px)`]: {
                right: "auto",
                top: "0",
                left: "0",
                width: "100%",
                maxWidth: "none",
                border: "0",
                borderTop: "1px solid #d8d8d8",
                borderBottom: "1px solid #d8d8d8",
                whiteSpace: "initial",
                padding: "5px 0",
                display: "flex",
                margin: "0",
                alignItems: "center",
                justifyContent: "center",
              },
              p: {
                fontSize: ThemeConstants.FONTSIZE_14,
              },
              img: {
                marginRight: "5px",
              },
              span: {
                color: ThemeConstants.PRIMARY_MAIN_COLOR,
                fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
                fontSize: ThemeConstants.FONTSIZE_12,
              },
            },
            ".xerox-profile-name": {
              p: {
                fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
                [`@media (max-width:${ThemeConstants.XL}px)`]: {
                  fontSize: ThemeConstants.FONTSIZE_14,
                },
              },
            },
            "div::-webkit-scrollbar": {
              background: "transparent",
              width: "0px",
              height: "0px",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: ThemeConstants.PRIMARY_PRELEM.TITLE,
          "&.footer-wrapper": {
            backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            minHeight: "7rem",
          },
        },
      },
    },
  },
});

export default PrelemTheme;
