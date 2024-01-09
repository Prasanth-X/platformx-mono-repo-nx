import { data } from './sessionData';
import { UserSession } from './useUserSession.types';

const useUserSession = (): [
  () => UserSession,
  (session: UserSession | null) => void
] => {
  const updateSession = (updatedSession: any) => {
    localStorage.setItem('userSession', '');

    // if (updatedSession) {
    //   const session: UserSession = {
    //     permissions: updatedSession.permissions,
    //     isActive: updatedSession.isActive,
    //     role: updatedSession.role,
    //     userInfo: updatedSession.userInfo,
    //   };
      localStorage.setItem('userSession', JSON.stringify(data));
     // localStorage.setItem('userSession', JSON.stringify(session));
    // } else {
    //   localStorage.removeItem('userSession');
    //   localStorage.removeItem('selectedSite');
    //   localStorage.removeItem('imageUuid');
    //   localStorage.removeItem('videoUuid');
    // }
  };

  const getSession = (): UserSession => {
    const sessions: any = localStorage.getItem('userSession');
    let storedSession: UserSession | null = null;

    try {
      if (typeof sessions === 'string') {
        storedSession = JSON.parse(sessions);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      storedSession = null;
    }

    // If storedSession is null, provide default values for UserSession
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
