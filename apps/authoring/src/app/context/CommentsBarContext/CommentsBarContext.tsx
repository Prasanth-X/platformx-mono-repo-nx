import { createContext, useContext, useState } from 'react';

type CommentsPanelContextProps = {
  isCommentsPanelOpen: boolean;
  setIsCommentPanelOpen: (isOpen: boolean) => void;
};

const CommentsPanelContext = createContext<CommentsPanelContextProps>({
  isCommentsPanelOpen: false,
  setIsCommentPanelOpen: () => {},
});

export const useCommmmentsPanel = () => {
  return useContext(CommentsPanelContext);
};

export const CommentsPanelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCommentsPanelOpen, setIsCommentPanelOpen] = useState(false);
  return (
    <CommentsPanelContext.Provider
      value={{ isCommentsPanelOpen, setIsCommentPanelOpen }}
    >
      {children}
    </CommentsPanelContext.Provider>
  );
};
