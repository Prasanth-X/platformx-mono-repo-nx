import { WorkflowListing } from './Workflow/WorkflowListing';
/* eslint-disable-next-line */
export interface WorkflowManagementProps {}

export function WorkflowManagement(props: WorkflowManagementProps) {
  return (
    // <ThemeProvider theme={LightTheme}>
    // <BrowserRouter>
    // <ApolloProvider client={graphqlInstance}>
    // <ActionProvider>
    <WorkflowListing />
    //</ActionProvider>
    // </ApolloProvider>
    // </BrowserRouter>
    // </ThemeProvider>
  );
}

export default WorkflowManagement;
