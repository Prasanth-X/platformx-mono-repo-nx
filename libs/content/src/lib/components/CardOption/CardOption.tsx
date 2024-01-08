import { Box, IconButton, MenuItem } from '@mui/material';

import {
  DeleteIcon,
  EditIcon,
  ErrorTooltip,
  MoreHorizIcon,
} from '@platformx/utilities';

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
  ;
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
                    <img src={EditIcon} alt="" style={{ objectFit: 'cover' }} />
                    {/* <EditIcon style={{ objectFit: 'cover' }} /> */}
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
                <img src={DeleteIcon} alt="" style={{ objectFit: 'cover' }} />
                {/* <DeleteIcon style={{ objectFit: 'cover' }} /> */}
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
          <img src={MoreHorizIcon} alt="" style={{ objectFit: 'cover' }} />
          {/* <MoreHorizIcon style={{ objectFit: 'cover' }} /> */}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardOption;
