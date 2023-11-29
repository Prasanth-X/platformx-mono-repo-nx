import { workflowKeys } from '../../components/Submit/Utils/contstants';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';
import workflowApi from '../../services/workflow/workflow.api';
import { workflowMapper } from './mapper';

function useWorkflow() {
  const workflowRequest = async (props, event_step) => {
    try {
      const response: any = await workflowApi.workflow_submission({
        input: workflowMapper(props, event_step),
        contentType: props?.tag_name,
      });
      if (
        response?.authoring_contentWorkflow.message ===
        'Successfully created!!!'
      ) {
        return {
          workflow_status: props?.workflow_status,
          success: true,
          event_step,
        };
      } else {
        showToastError('Something went wrong!!!');
      }
    } catch (err) {
      showToastError('Something went wrong!!!');
    }
  };

  const getWorkflowDetails = async (
    role,
    user_id = '',
    setWorkflow,
    contentType
  ) => {
    if (contentType != '') {
      try {
        const response: any = await workflowApi.getWorkflowList();
        if (
          response?.authoring_getWorkFlowListing &&
          response?.authoring_getWorkFlowListing?.length > 0
        ) {
          const getWorkFlowListing = [
            ...(response?.authoring_getWorkFlowListing || []),
          ];
          getWorkFlowListing.map((val) => {
            val.content_type.map((type) => {
              if (
                type.toLowerCase() === contentType.toLowerCase() &&
                val?.status
              ) {
                setWorkflow({
                  title: '',
                  path: '',
                  description: '',
                  workflow_status: workflowKeys.draft,
                  stages: val.stages,
                  tag_name: contentType,
                  last_modifiedBy: '',
                  createdBy: '',
                  role,
                  enable: val.status,
                  login_user_id: user_id,
                  task_status: '',
                  task_user_id: '',
                });
              }
            });
          });
        }
      } catch (err: any) {
        console.log('error', err);
      }
    }
  };
  return { workflowRequest, getWorkflowDetails };
}

export default useWorkflow;
