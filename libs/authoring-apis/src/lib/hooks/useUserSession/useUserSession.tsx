import { UserSession } from './useUserSession.types';

const useUserSession = (): [
  () => UserSession,
  (session: UserSession|null ) => void
] => {
  const updateSession = (updatedSession: any ) => {
    localStorage.setItem('userSession', '');

    if (updatedSession) {
      const session: UserSession = {
        permissions: updatedSession.permissions,
        isActive: updatedSession.isActive,
        role: updatedSession.role,
        userInfo: updatedSession.userInfo,
      };

      localStorage.setItem('userSession', JSON.stringify(session));
    } else {
      localStorage.removeItem('userSession');
      localStorage.removeItem('selectedSite');
      localStorage.removeItem('imageUuid');
      localStorage.removeItem('videoUuid');
    }
  };

  const getSession = (): UserSession => {
    const sessions: string = localStorage.getItem('userSession') || '';
    let storedSession: UserSession | null;
  
    try {
      
      storedSession = JSON.parse(sessions);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      storedSession = null;
    }
  
    const userSession: UserSession = storedSession || {
      isActive: false,
      permissions: [],
      role: '',
      userInfo: {},
    };
  
    return userSession;
  };
  
  return [getSession, updateSession];
};

export default useUserSession;
