import { State } from '../../CreateEvent.types';

export type ComponentProp = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  showGalleryHandle: (a: string, b: string) => void;
  setPreviewButton: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage: {
    Thumbnail: string;
    title: string;
    description: string;
  };
};
