// import { capitalizeFirstLetter } from '../../utils/helperFunctions'
import { workflowKeys } from './contstants'

export const getPreviousStepOwner = (props) => {
  let index = 0
  const { stages = [], workflow_status = '' } = props || {}
  stages.map((stage, key) => {
    if (
      stage.state ===
      (workflow_status.toLowerCase() === workflowKeys.published.toLowerCase()
        ? workflowKeys.publish
        : workflow_status)
    ) {
      index = key
    }
  })
  return stages[index - 1]?.role
}

export const enableReferBack = (props) => {
  const { workflow_status = '', role = '', stages = [], enable } = props || {}
  if (enable) {
    if (role.toLowerCase() === workflowKeys.admin.toLowerCase()) {
      if (
        workflow_status == workflowKeys.draft ||
        workflow_status == workflowKeys.published
      ) {
        return false
      }
      return true
    }
    return workflow_status.toLowerCase() == workflowKeys.draft.toLowerCase() ||
      workflow_status.toLowerCase() ==
        workflowKeys.request_review.toLowerCase() ||
      isCurrentRoleCompleted(stages, role)
      ? false
      : true
  } else {
    return false
  }
}

export const enableNextStep = (props) => {
  const { workflow_status = '', role = '', stages = [], enable } = props || {}
  if (enable) {
    if (role.toLowerCase() === workflowKeys.admin.toLowerCase()) {
      if (
        workflow_status.toLowerCase() == workflowKeys.published.toLowerCase()
      ) {
        return false
      }
      return true
    }
    return isCurrentRoleCompleted(stages, role) ||
      workflow_status.toLowerCase() == workflowKeys.published.toLowerCase()
      ? false
      : true
  } else {
    return false
  }
}

const isCurrentRoleCompleted = (stages, role) => {
  return stages
    .filter((stage) => stage.role === role)
    .every((stage) => (stage.status === workflowKeys.completed ? true : false))
}

export const getNextStepLabel = (props) => {
  let index = 0
  const { stages = [], workflow_status = '' } = props || {}
  stages.map((stage, key) => {
    if (stage.state === workflow_status) {
      index = key
    }
  })
  return stages[index]?.label
}
export const isDisabledSubmit = (
  canAccessAction,
  prelemEditState,
  category,
  subCategory,
  workflow,
) => {
  const {
    enable,
    task_status = '',
    login_user_id = '',
    task_user_id = '',
    workflow_status = '',
    role = '',
  } = workflow
  if (enable) {
    return ((task_status?.toLowerCase() ===
      workflowKeys.accepted.toLowerCase() ||
      task_status?.toLowerCase() === workflowKeys.completed.toLowerCase()) &&
      login_user_id === task_user_id) ||
      (workflow_status?.toLowerCase() === workflowKeys.draft &&
        task_user_id === '') ||
      (workflow_status?.toLowerCase() === workflowKeys.published &&
        role.toLowerCase() === workflowKeys.admin.toLowerCase())
      ? false
      : true
  } else {
    return (
      !canAccessAction(category, subCategory, workflowKeys.publish) ||
      prelemEditState
    )
  }
}

export const getPendingRole = (stages) => {
  const pendingRole = stages?.filter(
    (stage) =>
      stage?.status?.toLowerCase() !== workflowKeys.completed.toLowerCase(),
  )
  return pendingRole[0]?.role
}

export const doAccessState = (
  canAccessAction,
  prelemEditState,
  category,
  subCategory,
  workflow,
) => {
  const {
    enable,
    task_status = '',
    login_user_id = '',
    task_user_id = '',
    workflow_status = '',
    role = '',
  } = workflow
  if (enable) {
    return ((task_status?.toLowerCase() ===
      workflowKeys.accepted.toLowerCase() ||
      task_status?.toLowerCase() === workflowKeys.completed.toLowerCase()) &&
      login_user_id === task_user_id) ||
      (workflow_status?.toLowerCase() === workflowKeys.draft &&
        task_user_id === '') ||
      (workflow_status?.toLowerCase() === workflowKeys.published &&
        role.toLowerCase() === workflowKeys.admin.toLowerCase())
      ? false
      : true
  } else {
    return subCategory === 'vod' && prelemEditState
      ? false
      : !canAccessAction(category, subCategory, workflowKeys.publish) ||
          prelemEditState
  }
}
