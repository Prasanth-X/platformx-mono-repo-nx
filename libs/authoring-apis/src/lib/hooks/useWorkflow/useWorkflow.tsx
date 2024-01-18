import { ShowToastError } from '@platformx/utilities'
import workflowApi from '../../services/workflow/workflow.api'
import { workflowMapper } from './mapper'

interface WorkflowResponse {
  workflow_status: string;
  success: boolean;
  event_step: string;
}
function useWorkflow() {
  const workflowRequest = async (
    props: { [key: string]: any },
    event_step: string
  ): Promise<WorkflowResponse> => {
    try {
      const response: any = await workflowApi.workflow_submission({
        input: workflowMapper(props, event_step),
        contentType: props?.tag_name,
      });
      if (response?.authoring_contentWorkflow.message === "Successfully created!!!") {
        return {
          workflow_status: props?.workflow_status,
          success: true,
          event_step,
        };
      } else {
        ShowToastError("Something went wrong!!!");
        throw new Error("Workflow submission failed");
      }
    } catch (err) {
      ShowToastError("Something went wrong!!!");
      throw new Error("Workflow submission failed");
    }
  };


  const getWorkflowDetails = async (
    role: any,
    user_id = '',
    setWorkflow: any,
    contentType: any,
  ) => {
    if (contentType != '') {
      try {
        const response: any = await workflowApi.getWorkflowList()
        setWorkflow({ enable: false })
        if (
          response?.authoring_getWorkFlowListing &&
          response?.authoring_getWorkFlowListing?.length > 0
        ) {
          const getWorkFlowListing = [
            ...(response?.authoring_getWorkFlowListing || []),
          ]
          getWorkFlowListing.map((val: any) => {
            val.content_type.map((type: any) => {
              if (
                type.toLowerCase() === contentType.toLowerCase() &&
                val?.status
              ) {
                setWorkflow({
                  title: '',
                  path: '',
                  description: '',
                  workflow_status: 'draft',
                  stages: val.stages,
                  tag_name: contentType,
                  last_modifiedBy: '',
                  createdBy: '',
                  role,
                  enable: val.status,
                  login_user_id: user_id,
                  task_status: '',
                  task_user_id: '',
                })
              }
            })
          })
        }
      } catch (err: any) {
        console.log('error', err)
      }
    }
  }
  return { workflowRequest, getWorkflowDetails }
}

export default useWorkflow
