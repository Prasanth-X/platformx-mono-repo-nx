export type ListViewProps = {
  index?: any;
  name: string;
  id: string;
  creation_date?: any;
  steps: any;
  status: boolean;
  content_type: any;
  title: string;
  handleReload: () => Promise<void>;
};
