import { SetState, State } from '../../CreateEvent.types';

export type EventSEOProp = {
  state: State;
  setState: SetState;
  eventInstance: any;
  seoEvenDataHandle: (v) => void;
  unsavedChanges: React.MutableRefObject<boolean>;
  updateStructureData: (a, b) => object;
  setEditedSD: React.Dispatch<React.SetStateAction<object>>;
  isEdited: boolean;
};
