export type UserSession = {
  userInfo: any;
  role: string;
  permissions: Permission[];
  isActive?: boolean;
};
interface UserInfo {
  name: string;
  email: string;
  username: string;
  selected_site: string;
  first_name: string;
  last_name: string;
  user_id: string;
  firstName: string;
  lastName: string;
  preferred_sites_languages: string[];
}
interface Permission {
  site: string;
  category: string;
  sub_category: string;
  actions: string[];
}
const useUserSession = (): [
  () => UserSession,
  (session: UserSession | null) => void
] => {
  const updateSession = (updatedSession: any | null) => {
    localStorage.setItem('userSession', null);


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
    const sessions = localStorage.getItem('userSession');
    const storedSession = JSON.parse(sessions);
    const userSession: UserSession = storedSession
      ? storedSession
      : { isActive: false, permissions: [], role: '', userInfo: {} };
    return userSession;
  };
  return [getSession, updateSession];
};

export default useUserSession;
