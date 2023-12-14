import { EventWhole, SetState, State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: SetState;
  eventWholeRef: React.MutableRefObject<EventWhole>;
  showGalleryHandle: (a: string, b: string) => void;
  unsavedChanges: React.MutableRefObject<boolean>;
  selectedImage: string;
};
