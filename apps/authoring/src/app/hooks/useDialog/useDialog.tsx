import { useContext } from 'react';
import { ActionType } from '../../context/actionContext/ActionContext.types';
import { ActionContext } from '../../context/actionContext/ActionTypes';
export const useDialog = (): ActionType => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error('useDialog must be used insider ActionProvider');
  }
  return context;
};
