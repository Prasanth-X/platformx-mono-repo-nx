import { Box, IconButton, MenuItem } from '@mui/material';

import {
  EditIcon,
  DeleteIcon,
  MoreHorizIcon,
} from '@platformx/utilities';
import { ErrorTooltip } from '@platformx/utilities';

interface CardOptionProps {
  getContentCategory: () => any;
  getContentSubCategory: () => any;
  dataList?: Record<string, any>;
  tagName?: string;
  handleEdit: (event: React.MouseEvent<HTMLElement>) => void;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  canAccessAction: (category: any, subCategory: any, action: string) => boolean;
  handleDeleteButton: () => void;
}

const CardOption: React.FC<CardOptionProps> = ({
  getContentCategory,
  getContentSubCategory,
  dataList = {},
  tagName = '',
  handleEdit,
  handleClick,
  canAccessAction,
  handleDeleteButton,
}) => {
  // eslint-disable-next-line no-debugger
  debugger
  return (
    <Box
      color="#89909A"
      className="d-inline-flex align-items-center justify-content-end"
      sx={{ minWidth: '104px' }}
    >
      <Box className="d-flex align-items-center">
        {(dataList?.scheduledPublishTriggerDateTime == null ||
          dataList?.scheduledUnPublishTriggerDateTime == null) && (
            <ErrorTooltip
              component={
                <MenuItem
                  className="icons"
                  disableRipple
                  onClick={handleEdit}
                  disabled={
                    !canAccessAction(
                      getContentCategory(),
                      getContentSubCategory(),
                      'Update'
                    ) || tagName === 'courses'
                  }
                >
                  <IconButton className="hoverIcon">
                    <EditIcon style={{ objectFit: 'cover' }} />
                  </IconButton>
                </MenuItem>
              }
              doAccess={
                !canAccessAction(
                  getContentCategory(),
                  getContentSubCategory(),
                  'Update'
                ) || tagName === 'courses'
              }
            />
          )}
      </Box>
      <Box className="d-flex align-items-center">
        <ErrorTooltip
          component={
            <MenuItem
              className="icons"
              disableRipple
              onClick={handleDeleteButton}
              disabled={
                !canAccessAction(
                  getContentCategory(),
                  getContentSubCategory(),
                  'Delete'
                ) || tagName === 'courses'
              }
            >
              <IconButton className="hoverIcon">
                <DeleteIcon style={{ objectFit: 'cover' }} />
              </IconButton>
            </MenuItem>
          }
          doAccess={
            !canAccessAction(
              getContentCategory(),
              getContentSubCategory(),
              'Delete'
            ) || tagName === 'courses'
          }
        />
        <IconButton
          aria-label="settings"
          id="long-button"
          onClick={handleClick}
          className="viewallctamob"
        >
          <MoreHorizIcon style={{ objectFit: 'cover' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardOption;
