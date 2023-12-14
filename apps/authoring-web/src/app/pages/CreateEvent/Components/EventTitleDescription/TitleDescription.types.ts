import { EventWhole, SetState, State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: SetState;
  eventWholeRef: React.MutableRefObject<EventWhole>;
  setSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewButton: React.Dispatch<React.SetStateAction<boolean>>;
  unsavedChanges: React.MutableRefObject<boolean>;
  setPublishButton: React.Dispatch<React.SetStateAction<boolean>>;
};
