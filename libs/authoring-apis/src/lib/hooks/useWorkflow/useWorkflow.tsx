import { ShowToastError } from '@platformx/utilities'
import workflowApi from '../../services/workflow/workflow.api'
import { workflowMapper } from './mapper'

function useWorkflow() {
  const workflowRequest = async (props: any, event_step: any) => {
    try {
      const response: any = await workflowApi.workflow_submission({
        input: workflowMapper(props, event_step),
        contentType: props?.tag_name,
      })
      if (
        response?.authoring_contentWorkflow.message ===
        'Successfully created!!!'
      ) {
        return {
          workflow_status: props?.workflow_status,
          success: true,
          event_step,
        }
      } else {
        ShowToastError('Something went wrong!!!')
      }
    } catch (err) {
      ShowToastError('Something went wrong!!!')
    }
  }

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
