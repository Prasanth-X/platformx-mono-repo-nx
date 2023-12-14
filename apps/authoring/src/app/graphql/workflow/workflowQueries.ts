import { gql } from '@apollo/client';

export const WorkflowQueries = {
  CONTENT_WORKFLOW_SUBMISSION: gql`
    mutation (
      $contentType: authoring_ContentTypes!
      $input: authoring_workflowInputRequest
    ) {
      authoring_contentWorkflow(contentType: $contentType, input: $input) {
        message
      }
    }
  `,
  GET_WORKFLOW_LISTING: gql`
    query {
      authoring_getWorkFlowListing(pagePath: "")
    }
  `,
  UPDATE_WORKFLOW_STATUS: gql`
    mutation ($input: authoring_workflowRequest) {
      authoring_updateWorflowStatus(input: $input) {
        message
        __typename
      }
    }
  `,

  UPDATE_TASK_ACCEPT_REJECT: gql`
    mutation ($input: authoring_taskRequest) {
      authoring_updateTask(input: $input) {
        message
        path
        __typename
      }
    }
  `,

  GET_USER_ASSIGNED_TASK_LIST: gql`
    query {
      authoring_getUserAssignedTaskList(sort: DESC) {
        title
        approval_status
        description
        document_path
        document_title
        document_type
        stage
        task_status
        user_id
        user_name
        workflow_id
        workflow_name
        last_modified_by
        creation_date
        last_modification_date
        created_by
        due_date
      }
    }
  `,
  GET_WORKFLOW_HISTORY: gql`
    query GET_WORKFLOW_HISTORY($document_path: String!) {
      authoring_getDocumentHistory(document_path: $document_path)
    }
  `,
};
