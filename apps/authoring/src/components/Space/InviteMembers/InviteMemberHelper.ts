import spaceManagementAPI from '../../../pages/SpaceManagement/Space.api';

export const getMemberList = async (username: string) => {
  try {
    const response: any = await spaceManagementAPI.getMembersToInvite({
      searchTerm: '',
      currentUser: username,
      spaceIdentifier: '',
    });
    if (
      response?.authoring_searchExoMemberToInvite &&
      response?.authoring_searchExoMemberToInvite.length > 0
    ) {
      const memberList = response?.authoring_searchExoMemberToInvite || [];
      return memberList;
    }
  } catch (err: any) {
    return err;
  }
};
