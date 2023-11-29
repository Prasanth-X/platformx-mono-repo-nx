import { RegistrationConstants } from '../SpaceAccess/Constants';
import { Constants } from '../SpaceDetails/Constants';
import { visibilityProperties } from './Constants';

const formatInvitedMenbers = (stateSpace: any) => {
  return stateSpace.invitedMembers.map((item: any) => {
    return {
      remoteId: item.user_name,
      providerId: 'organization',
      profile: {
        fullName: item.title,
        avatarUrl: item.avatar_url,
      },
    };
  });
};

export const dataToSendMapper = (stateSpace: any) => {
  return {
    subscription: stateSpace.registration.toLowerCase(),
    visibility: stateSpace.hidden
      ? visibilityProperties.HIDDEN
      : visibilityProperties.PRIVATE,
    displayName: stateSpace.displayName,
    description: stateSpace.description,
    invitedMembers: formatInvitedMenbers(stateSpace),
  };
};

export const checkStateChanges = (stateSpace: any, t) => {
  return (
    stateSpace.displayName === '' &&
    stateSpace.description === '' &&
    stateSpace.hidden === false &&
    stateSpace.registration === RegistrationConstants[0] &&
    stateSpace.template === Constants[0] &&
    stateSpace.invitedMembers.length === 0
  );
};

export const dataToReceiveMapper = (object) => {
  return {
    displayName: object?.title,
    description: object?.description,
    template: object?.template,
    hidden: object?.visibility === visibilityProperties?.HIDDEN ? true : false,
    registration: object?.subscription,
  };
};
