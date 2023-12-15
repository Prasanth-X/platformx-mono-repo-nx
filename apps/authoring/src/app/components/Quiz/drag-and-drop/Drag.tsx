import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Box } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

export const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...props}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px 5px 5px 0px',
            }}
          >
            <Box
              {...provided.dragHandleProps}
              sx={{
                marginRight: { sm: '5px', xs: '0px' },
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <DragIndicatorIcon
                sx={{
                  width: '24px',
                  left: { xs: '-5px', sm: '0px' },
                  position: 'absolute',
                }}
              />
            </Box>
            {props.children}
          </Box>
        );
      }}
    </Draggable>
  );
};
