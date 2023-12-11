import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Draggable } from 'react-beautiful-dnd';

export const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...props}>
            <div
              {...provided.dragHandleProps}
              style={{
                marginRight: '10px',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <DragHandleIcon
                sx={{
                  color: '#89909a',
                  width: '16px',
                }}
              />
            </div>
            {props.children}
          </div>
        );
      }}
    </Draggable>
  );
};
