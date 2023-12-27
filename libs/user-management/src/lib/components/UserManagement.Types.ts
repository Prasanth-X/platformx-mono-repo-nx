type role = {
  _id: string;
  name: string;
  site?: string;
};
export type ListViewProps = {
  index?: any;
  first_name: string;
  last_name: string;
  image: any;
  email: any;
  user_id: string;
  timezone?: any;
  enabled: boolean;
  action_pending?: boolean;
  created_timestamp?: number;
  roles: role[];
  handleReload: () => Promise<void>;
  filterValue: string;
  adminAction?: string;
};
