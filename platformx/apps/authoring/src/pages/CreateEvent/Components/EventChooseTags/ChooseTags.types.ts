import { EventWhole, SetState, State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: SetState;
  eventWholeRef: React.MutableRefObject<EventWhole>;
  content: any;
  isEdit: boolean;
  unsavedChanges: React.MutableRefObject<boolean>;
  setScrollToView: (string) => void;
  socialShareExpanded: boolean;
};
