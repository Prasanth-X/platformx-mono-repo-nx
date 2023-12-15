import {
  Box,
  IconButton,
  MenuItem,
} from '@mui/material';
import EditIcon from '../../../assets/images/icons/editIcon.svg';
import DeleteIcon from '../../../assets/images/icons/deleteIcon.svg';
import MoreHorizIcon from '../../../assets/images/icons/moreHoriz.svg';
import { ErrorTooltip } from '../../../components/Common/ErrorTooltip';

const CardOption = (props: any) => {

  const {
    getContentCategory, getContentSubCategory,
    dataList = {}, tagName = "", handleEdit = () => { }, handleClick = () => { },
    canAccessAction, handleDeleteButton = () => { }
  } = props;

  return (
    <>
      <Box
        color='#89909A'
        className='d-inline-flex align-items-center justify-content-end'
        sx={{ minWidth: '104px' }}
      >
        <Box className='d-flex align-items-center'>
          {(dataList?.scheduledPublishTriggerDateTime == null ||
            dataList?.scheduledPublishTriggerDateTime == undefined) &&
            (dataList?.scheduledUnPublishTriggerDateTime == null ||
              dataList?.scheduledUnPublishTriggerDateTime ==
              undefined) ? (
            <ErrorTooltip
              component={
                <MenuItem
                  className='icons'
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
                    <img
                      src={EditIcon}
                      style={{ objectFit: 'cover' }}
                    />
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
          ) : null}
        </Box>
        <Box className='d-flex align-items-center'>
          <ErrorTooltip
            component={
              <MenuItem
                className='icons'
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
                  <img
                    src={DeleteIcon}
                    style={{ objectFit: 'cover' }}
                  />
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
            aria-label='settings'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
            className='viewallctamob'
          >
            <img src={MoreHorizIcon} style={{ objectFit: 'cover' }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default CardOption;
