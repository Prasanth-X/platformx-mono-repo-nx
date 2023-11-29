export type HistoryProps = {
  date: Date;
  owner: string;
  user: string;
  action: string;
  summary: string;
  role: string;
};

export type HistoryList = {
  history: HistoryProps[];
};
