import { ReactElement } from 'react';

export type FiltersObj = {
  tags?: string[];
  author?: string;
  fromDate?: string;
  toDate?: string;
};
export type CategoryProps = {
  icon: ReactElement;
  title: string;
  category: string;
};
