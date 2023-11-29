import { SetState, State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: SetState;
  eventAnalyticsHandle: (a) => void;
  unsavedChanges: React.MutableRefObject<boolean>;
};
