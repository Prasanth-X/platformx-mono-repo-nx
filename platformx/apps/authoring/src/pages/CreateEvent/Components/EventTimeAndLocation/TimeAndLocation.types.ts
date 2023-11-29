import { SetState, State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: SetState;
  unsavedChanges: React.MutableRefObject<boolean>;
};
