export const workflowMapper = (workflowObj: any, event_step: any) => {
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
      workflow_status === 'draft'
        ? 'request_review'
        : workflow_status === 'published'
        ? 'publish'
        : workflow_status,
    event:
      workflow_status === 'draft' || workflow_status === 'request_review'
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
