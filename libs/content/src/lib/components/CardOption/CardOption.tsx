import { Box, IconButton, MenuItem } from '@mui/material';
import EditIcon from '../../../assets/images/icons/editIcon.svg';
import DeleteIcon from '../../../assets/images/icons/deleteIcon.svg';
import MoreHorizIcon from '../../../assets/images/icons/moreHoriz.svg';
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
                  <img src={EditIcon} style={{ objectFit: 'cover' }} alt="" />
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
                <img src={DeleteIcon} style={{ objectFit: 'cover' }} alt="" />
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
          <img src={MoreHorizIcon} style={{ objectFit: 'cover' }} alt="" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardOption;
