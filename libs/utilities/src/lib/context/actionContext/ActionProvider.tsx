import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import XDialog from '../../components/XDialog/XDialog';
import { DialogBoxContentProps } from './ActionContext.types';
import { ActionContext } from './ActionTypes';
interface ActionProviderProps {
  children: React.ReactNode;
}

export const ActionProvider: React.FC<ActionProviderProps> = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { t } = useTranslation();
  const [conformState, setonConfirmCallback] = useState<{
    onConfirm: (() => void) | null;
  }>(null);
  const [content, setContent] = useState<DialogBoxContentProps>({
    Title: '',
  });

  const [cancelState, setonCancelCallback] = useState<{
    onCancel: (() => void) | null;
  }>(null);

  const handleConfirm = () => {
    conformState?.onConfirm();
    setIsPopupVisible(false);
  };
  const handleCancel = () => {
    cancelState?.onCancel();
    setContent({ Title: '' });
    setIsPopupVisible(false);
  };

  const show = (
    content: DialogBoxContentProps,
    onConfirmCallback?: () => void,
    onCancelCallback?: () => void
  ) => {
    setIsPopupVisible(true);
    setContent(content);
    setonCancelCallback({ onCancel: onCancelCallback });
    setonConfirmCallback({ onConfirm: onConfirmCallback });
  };

  const hide = () => {
    setIsPopupVisible(false);
    setContent({ Title: '' });
  };
  return (
    <ActionContext.Provider value={{ show, hide }}>
      {children}
      {isPopupVisible && (
        <XDialog
          handleClose={handleCancel}
          handleConfirm={handleConfirm}
          open={isPopupVisible}
          imageIcon={content.Image}
          title={t(content.Title)}
          leftButtonText={t(content.LeftButtonText)}
          rightButtonText={t(content.RightButtonText)}
          subTitle={t(content.Subtitle)}
          subTitle2={t(content.SubTitle2)}
        />
      )}
    </ActionContext.Provider>
  );
};
