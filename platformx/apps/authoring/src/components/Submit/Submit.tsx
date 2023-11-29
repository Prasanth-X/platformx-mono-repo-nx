import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAccess from '../../hooks/usePermissions/useAccess';
import useWorkflow from '../../hooks/useWorkflow/useWorkflow';
import { ErrorTooltip } from '../Common/ErrorTooltip';
import { StyledMenu } from './Submit.styles';
import { workflowKeys } from './Utils/contstants';
import {
  enableNextStep,
  enableReferBack,
  getNextStepLabel,
  getPendingRole,
  isDisabledSubmit,
} from './helper';

const Submit = ({
  category,
  subCategory,
  workflow,
  handleSave,
  handlePublish,
  createComment = () => {},
  prelemEditState = false,
}) => {
  const { workflowRequest } = useWorkflow();
  const { canAccessAction } = useAccess();
  const { t } = useTranslation();
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);
  const handleListClose = () => {
    setListMenu(null);
  };
  const handleSubmitList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setListMenu(event.currentTarget);
  };
  const handleOnSubmit = (event, workflow_enable) => {
    if (workflow_enable) {
      handleSubmitList(event);
    } else {
      handlePublish();
    }
  };
  const submitForNextStep = async (props, event_step) => {
    handleSave(true, props, event_step);
  };

  return (
    <>
      <ErrorTooltip
        component={
          <Button
            disabled={
              isDisabledSubmit(
                canAccessAction,
                prelemEditState,
                category,
                subCategory,
                workflow
              )
              // !canAccessAction(category, subCategory, workflowKeys.publish) ||
              // prelemEditState
            }
            variant='primaryButton'
            onClick={(event) => handleOnSubmit(event, workflow?.enable)}
            endIcon={workflow?.enable && <KeyboardArrowDownRoundedIcon />}
            className='sm'
            type='submit'
          >
            {workflow?.enable ? t('submit_text') : t('publish')}
          </Button>
        }
        doAccess={isDisabledSubmit(
          canAccessAction,
          prelemEditState,
          category,
          subCategory,
          workflow
        )}
        tooltipMsg={
          workflow?.enable
            ? workflow?.workflow_status === workflowKeys.published.toLowerCase()
              ? ''
              : workflow?.task_user_name !== ''
              ? `${t('workflow_pending')} ${t('with')} ${
                  workflow?.task_user_name
                }`
              : `${t('workflow_pending')} ${t('at')} ${getPendingRole(
                  workflow?.stages
                )} ${t('end')}`
            : ' '
        }
      />
      <StyledMenu
        id='long-menu'
        anchorEl={listMenu}
        open={openListMenu}
        onClose={handleListClose}
      >
        {enableNextStep(workflow) && (
          <MenuItem
            disableRipple
            disabled={workflow?.workflow_status === undefined ? true : false}
            onClick={() => {
              createComment();
              submitForNextStep(workflow, workflowKeys.approve);
              handleListClose();
            }}
          >
            {getNextStepLabel(workflow)}
          </MenuItem>
        )}
        {enableReferBack(workflow) && (
          <MenuItem
            disableRipple
            onClick={() => {
              submitForNextStep(workflow, workflowKeys.refer_back);
              createComment();
              handleListClose();
            }}
          >
            {/* {t('send_back')} {getPreviousStepOwner(workflow)} */}
            {t('refer_back')}
          </MenuItem>
        )}
        {canAccessAction(category, subCategory, workflowKeys.publish) &&
        workflow?.workflow_status === workflowKeys.publish.toLowerCase() ? (
          <></>
        ) : (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(
                    category,
                    subCategory,
                    workflowKeys.publish
                  ) || prelemEditState
                }
                onClick={() => {
                  handlePublish();
                  handleListClose();
                }}
              >
                {t('publish')}
              </MenuItem>
            }
            doAccess={
              !canAccessAction(category, subCategory, workflowKeys.publish)
            }
          />
        )}

        {/* {enableReferBack(workflow) && (
          <MenuItem
            disabled={false}
            disableRipple
            onClick={() => {
              createComment();
              handleListClose();
            }}
          >
            Submit Review
          </MenuItem>
        )} */}
      </StyledMenu>
    </>
  );
};

export default Submit;
