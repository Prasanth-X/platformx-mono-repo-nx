import { styled } from '@mui/material';
import { Box } from '@mui/system';

export interface XBoxProps {
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
  flexWrap?: 'wrap' | 'no-wrap' | 'wrap-reverse';
}

const StyledBoxx = styled(Box)(() => ({
  display: 'flex',
  height: '500px',
  background: 'violet',
}));

export const XBoxx = ({
  alignItems,
  justifyContent,
  flexDirection,
  flexWrap,
}: XBoxProps) => {
  return (
    <StyledBoxx
      alignItems={alignItems}
      justifyContent={justifyContent}
      flexDirection={flexDirection}
      //  flexWrap={flexWrap}
    >
      <Box sx={{ height: '50px', width: '50px', background: 'blue' }}>
        Item 1
      </Box>
      <Box sx={{ height: '50px', width: '50px', background: 'red' }}>
        Item 2
      </Box>
      <Box sx={{ height: '50px', width: '50px', background: 'blue' }}>
        Item 3
      </Box>
      <Box sx={{ height: '50px', width: '50px', background: 'red' }}>
        Item 4
      </Box>
      <Box sx={{ height: '50px', width: '50px', background: 'blue' }}>
        Item 5
      </Box>
      <Box sx={{ height: '50px', width: '50px', background: 'red' }}>
        Item 6
      </Box>
    </StyledBoxx>
  );
};
export default XBoxx;
