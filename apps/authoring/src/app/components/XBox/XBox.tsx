import { css } from '@mui/material';
import styled from '@emotion/styled';

export interface XBoxProps {
  flexBox?: boolean;
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | ' baseline'
    | 'initial'
    | 'inherit';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'center'
    | 'initial'
    | 'inherit';
  flexDirection?: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  flexWrap?: 'wrap' | 'no-wrap' | 'reverse';
  height?: string;
  maxHeight?: string;
  width?: string;
  maxWidth?: string;
  bgColor?: string;
  padding?: string;
  margin?: string;
  flex?: string;
  flexBasis?: number;
  flexGrow?: number;
  flexShrink?: number;
}

export const XBox = styled.div<XBoxProps>`
  ${({
    flexBox,
    alignItems,
    justifyContent,
    flexDirection,
    flexWrap,
    height,
    maxHeight,
    width,
    maxWidth,
    bgColor,
    padding,
    margin,
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
  }) => css`
    display: ${flexBox ? 'flex' : 'block'};
    ${justifyContent &&
    css`
      justify-content: ${justifyContent};
    `}
    ${alignItems &&
    css`
      align-items: ${alignItems};
    `}
${flexDirection &&
    css`
      flex-direction: ${flexDirection};
    `}
${flexWrap &&
    css`
      flex-wrap: ${flexWrap};
    `}
${height &&
    css`
      height: ${height};
    `}
${maxHeight &&
    css`
      max-height: ${maxHeight};
    `}
${width &&
    css`
      width: ${width};
    `}
${maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
${bgColor &&
    css`
      background-color: ${bgColor};
    `}
${padding &&
    css`
      padding: ${padding};
    `}
${margin &&
    css`
      margin: ${margin};
    `}
${flex &&
    css`
      flex: ${flex};
    `}
${flexBasis &&
    css`
      flex-basis: ${flexBasis};
    `}
${flexGrow &&
    css`
      flex-grow: ${flexGrow};
    `}
${flexShrink &&
    css`
      flex-shrink: ${flexShrink};
    `}
  `}
`;
