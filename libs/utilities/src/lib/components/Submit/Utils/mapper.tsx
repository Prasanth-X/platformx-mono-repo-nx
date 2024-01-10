import { workflowKeys } from './contstants'

export const workflowMapper = (workflowObj, event_step) => {
  const {
    createdBy = '',
    last_modifiedBy = '',
    path = '',
    tag_name = '',
    workflow_status = '',
    title = '',
    description = '',
  } = workflowObj || {}
  const data = {
    state:
      workflow_status === workflowKeys.draft
        ? workflowKeys.request_review
        : workflow_status === workflowKeys.published
        ? 'publish'
        : workflow_status,
    event:
      workflow_status === workflowKeys.draft ||
      workflow_status === workflowKeys.request_review
        ? 'SUBMIT'
        : event_step,
    description: description,
    document_path: path,
    document_type: tag_name,
    document_title: title,
    created_by: createdBy,
    last_modified_by: last_modifiedBy,
  }
  return data
}
