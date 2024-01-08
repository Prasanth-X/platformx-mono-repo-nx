import { createContext } from 'react';
import { ActionType } from './ActionContext.types';

export const ActionContext = createContext<ActionType | undefined>(undefined);
