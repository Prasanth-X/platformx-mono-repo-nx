import useUserSession from '../useUserSession/useUserSession';

export const useMapPermissions = (): any => {
  const [getSession] = useUserSession();
  const { permissions, role } = getSession();
  let permissionRebuild = {};

  const hasContentAccess = (params: any): boolean => {
    if (role?.toLowerCase() === 'admin') {
      return true;
    } else {
      return permissions?.includes(params);
    }
  };
  const hasNavigationAccess = (params: any): boolean => {
    if (role?.toLowerCase() === 'admin') {
      return true;
    } else {
      const navigationAccess = Object.keys(permissionRebuild);
      return navigationAccess?.includes(params);
    }
  };

  return {
    hasContentAccess: hasContentAccess,
    hasNavigationAccess: hasNavigationAccess,
  };
};
