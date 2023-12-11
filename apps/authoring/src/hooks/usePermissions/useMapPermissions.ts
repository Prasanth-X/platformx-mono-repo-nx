import useUserSession from '../useUserSession/useUserSession';

export const useMapPermissions = (): any => {
  const [getSession] = useUserSession();
  const { permissions, role } = getSession();
  let permissionRebuild = {};
  // for (let index in permissions) {
  //   const permission = permissions[index]?.split('.');
  //   if (permissionRebuild[permission[0]]) {
  //     const val2: string[] = permissionRebuild[permission[0]];
  //     permissionRebuild[permission[0]] = val2?.concat(permission[1]);
  //   } else {
  //     permissionRebuild[permission[0]] = [permission[1]];
  //   }
  // }
  // if (permissionRebuild['page']) {
  //   const roles = permissionRebuild['page'];
  //   permissionRebuild['pages'] = roles;
  //   delete permissionRebuild['page'];
  // }
  const hasContentAccess = (params): boolean => {
    if (role?.toLowerCase() === 'admin') {
      return true;
    } else {
      return permissions?.includes(params);
    }
  };
  const hasNavigationAccess = (params): boolean => {
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
