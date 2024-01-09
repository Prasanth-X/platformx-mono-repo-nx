export type RecentPage = {
  title: string;
  last_modification_date: string;
  current_page_url: string;
  status: string;
  last_modified_by: string;
  path: string;
};

export type RecentPagesProps = {
  recentPages: RecentPage[];
};
