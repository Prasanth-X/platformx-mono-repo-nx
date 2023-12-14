import { useEffect, useState } from 'react';
import useUserSession from '../useUserSession/useUserSession';
import { PERMISSIONS, Permission } from './permissions';

export const usePermissions = (): Record<Permission, boolean> => {
  const [getSession] = useUserSession();
  const { isActive, role } = getSession();
  const [permissions, setPermissions] = useState<Record<Permission, boolean>>({
    canEdit: false,
    canCreate: false,
    canDelete: false,
    canPublish: false,
    canSave: false,
    canDuplicate: false,
    canUnpublish: false,
    isAssetAccess: false,
    canReschedulePublish: false,
    canCancelPublish: false,
    canRescheduleUnPublish: false,
    canCancelUnPublish: false,
    canNavigate: false,
  });

  useEffect(() => {
    if (!role) {
      throw new Error('Role is null');
    }
    if (isActive) {
      setPermissions(PERMISSIONS[role.toLocaleLowerCase().replaceAll(" ","") || 'guest']);
    }
  }, [role]);
  return permissions;
};
