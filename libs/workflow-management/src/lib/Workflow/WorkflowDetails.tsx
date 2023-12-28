import { useNavigate } from 'react-router-dom';
import TopBackHeader from './Component/TopBackHeader/TopBackHeader';

import { workflowApi } from '@platformx/authoring-apis';
import { useEffect, useRef, useState } from 'react';
import Workflow from './Component/WorkFlowDetails/Workflow';

const WorkflowDetails = () => {
  const navigate = useNavigate();
  const [workflowDetails, setWorkflowDetails] = useState();
  const pageUrl = new URL(window.location.href);

  const currentWorkflowData = useRef(
    pageUrl.searchParams.get('path')
      ? (pageUrl.searchParams.get('path') as string)
      : ''
  );
  const getWorkflowDetails = async () => {
    try {
      const response: any = await workflowApi.getWorkflowList();
      if (
        response?.authoring_getWorkFlowListing &&
        response?.authoring_getWorkFlowListing?.length > 0
      ) {
        const getWorkFlowListing = [
          ...(response?.authoring_getWorkFlowListing || []),
        ];
        const temp: any = getWorkFlowListing.filter((val) => {
          return val.id === currentWorkflowData.current;
        });

        setWorkflowDetails(temp[0]);
      }
    } catch (err: any) {
      console.log('error', err);
    }
  };
  useEffect(() => {
    getWorkflowDetails();
  }, []);
  const returnBack = () => {
    navigate('/workflow/workflow-list');
  };
  return (
    <>
      <TopBackHeader returnBack={returnBack} />
      <Workflow returnBack={returnBack} workflowDetails={workflowDetails} />
    </>
  );
};
export default WorkflowDetails;
