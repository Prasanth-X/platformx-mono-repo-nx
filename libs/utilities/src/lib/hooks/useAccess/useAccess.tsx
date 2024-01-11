import useUserSession from '../useUserSession/useUserSession';

interface Permission {
  site: string;
  category: string;
  subcategory: string;
  actions: string[];
}

interface Access {
  canAccessContent: (category: string, subcategory: string) => boolean;
  canAccessAction: (
    category: string,
    subcategory: string | string[],
    action: string
  ) => boolean;
}

const useAccess = (): Access => {
  const [getSession] = useUserSession();
  const { permissions } = getSession();

  /* Method to validate the action accesses like sidebar menus */
  const canAccessContent = (category: string, subcategory: string): boolean => {
    let isValid = false;

    if (category?.toLowerCase() === 'public') {
      return true;
    }

    isValid = permissions?.some(
      (permission) =>
        (permission.category?.toLowerCase() === category?.toLowerCase() &&
          subcategory === '') ||
        (permission.category?.toLowerCase() === category?.toLowerCase() &&
          permission.sub_category?.toLowerCase() === subcategory?.toLowerCase())
    );
    return isValid;
  };

  /* Method to validate the action accesses like create, update, delete, */
  const canAccessAction = (
    category: string,
    subcategory: string | string[],
    allowedAction: string
  ): boolean => {
    if (permissions[0]?.actions[0]?.toLowerCase() === 'all') {
      return true;
    }
    const subCategories = Array.isArray(subcategory)
      ? subcategory
      : [subcategory];
    const accessObject = permissions?.find((permission: any) => {
      return (
        permission.category?.toLowerCase() === category?.toLowerCase() &&
        subCategories.includes(permission.sub_category?.toLowerCase())
      );
    });
    const lowerCaseActions =
      accessObject?.actions.map((x) => x.toLowerCase()) || [];
    return lowerCaseActions.includes(allowedAction?.toLowerCase());
  };

  return { canAccessContent, canAccessAction };
};

export default useAccess;
