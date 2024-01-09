export type TaskPage = {
  approval_status: string;
  created_by: string;
  creation_date: any;
  description: string;
  document_path: string;
  document_title: string;
  document_type: string;
  due_date: string;
  last_modification_date: string;
  last_modified_by: string;
  stage: string;
  task_status: string;
  title: string;
  user_id: string;
  user_name: string;
  workflow_id: string;
  workflow_name: string;
  __typename: string;
  fetchDashBoardData: () => {};
  changeStatus: (data: any) => {};
  edit: any;
  objData: any;
};

export type TaskPagesProps = {
  taskPages: any;
  fetchDashBoardData: () => {};
  changeStatus: (data: any) => {};
  edit: any;
};
