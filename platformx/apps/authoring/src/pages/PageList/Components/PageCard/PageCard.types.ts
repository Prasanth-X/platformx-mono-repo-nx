import { CardProps } from '../../Page.types';

export type PageCardProps = {
  searchCardList: CardProps;
  i: number;
  cardClickHandle: (
    parameter: string,
    status: string,
    path: string,
    actionType?: string,
    deviceType?: string,
    editOption?: string,
    searchCatURL?: string,
    searchTermURL?: string,
    sortByURL?: string
  ) => void;
  onDuplicatePage: (duplicate: boolean, pageDetails?: PageCardProps) => void;
  handleDelete: (pageDetails?: PageCardProps) => void;
  handlePreview?: (pageDetails?: PageCardProps) => void;
  handleUnpublishedPage: (pageDetails?: PageCardProps) => void;
  handleReschedule: (
    type: 'Publish' | 'Unpublish',
    pageDetails?: PageCardProps
  ) => void;
  handleCancelSchedule: (
    pageDetails: PageCardProps,
    triggerType: string
  ) => void;
};
