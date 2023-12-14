import { useEffect, useRef, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import Header from './Header/Header';
import Loader from '../../Common/Loader';
import SpaceAccess from './SpaceAccess/SpaceAccess';
import SpaceDetails from './SpaceDetails/SpaceDetails';
import InviteMembers from './InviteMembers/InviteMembers';
import { convertToLowerCase, nullToObject } from '../../utils/helperFunctions';
import { getSpacesDetailsBasedId } from '../../pages/SpaceManagement/SpacesHelper';
import {
  CREATE_SPACE,
  UPDATE_SPACE,
} from '../../graphql/Community/SpaceQueries';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';
import PlateformXDialog from '../Modal';
import {
  checkStateChanges,
  dataToReceiveMapper,
  dataToSendMapper,
} from './Utils/helper';
import { Types } from './Utils/Constants';
import { Constants } from './SpaceDetails/Constants';
import { RegistrationConstants } from './SpaceAccess/Constants';

const CreateSpace = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const spaceId = searchParams.get('id');
  const { t } = useTranslation();
  const [createSpace] = useMutation(CREATE_SPACE);
  const [updateSpace] = useMutation(UPDATE_SPACE);
  const [readOnly, setReadOnly] = useState(false);
  const [spaceType, setSpaceType] = useState('Create');
  const [stateSpace, setStateSpace] = useState({
    displayName: '',
    description: '',
    template: Constants[0],
    hidden: false,
    registration: RegistrationConstants[0],
    invitedMembers: [],
  });
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const loading = false;
  const isLoading = false;
  const navigate = useNavigate();
  const getSpaceDetailsById = async (spaceId = '') => {
    const res = await getSpacesDetailsBasedId(spaceId);
    const { authoring_getExoContentList = {} } = nullToObject(res);
    if (nullToObject(Object.keys(authoring_getExoContentList)).length > 0) {
      const spaceDetails = dataToReceiveMapper(authoring_getExoContentList);
      setStateSpace((prevState) => {
        return {
          ...prevState,
          ...spaceDetails,
        };
      });
    }
  };

  const createUpdateHandler = async () => {
    if (stateSpace.displayName === '') {
      showToastError(`${t('name')} ${t('is_required')}`);
      return;
    }
    if (type === Types?.EDIT) {
      try {
        const res = await updateSpace({
          variables: {
            input: dataToSendMapper(stateSpace),
            template: stateSpace.template.toLowerCase(),
            id: spaceId,
          },
        });
        if (res?.data?.authoring_updateSpace) {
          setShowPublishConfirm(true);
        }
      } catch (error: any) {
        if (error.graphQLErrors[0]) {
          showToastError(error?.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      }
    } else {
      try {
        const res = await createSpace({
          variables: {
            input: dataToSendMapper(stateSpace),
            template: stateSpace.template.toLowerCase(),
          },
        });
        if (res?.data?.authoring_createSpace) {
          setShowPublishConfirm(true);
        }
      } catch (error: any) {
        if (error.graphQLErrors[0]) {
          showToastError(error?.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      }
    }
  };

  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true);
    } else {
      navigate('/community/space');
    }
  };

  const handleConfirm = () => {
    setShowExitWarning(false);
    unsavedChanges.current = false;
    navigate('/community/space');
  };

  useEffect(() => {
    if (checkStateChanges(stateSpace, t) || type === Types?.VIEW) {
      unsavedChanges.current = false;
    } else {
      unsavedChanges.current = true;
    }
  }, [stateSpace, t, type]);

  useEffect(() => {
    if ([Types?.EDIT, Types?.VIEW].includes(type) && spaceId !== null) {
      setSpaceType(type);

      if (convertToLowerCase(type) === Types?.VIEW) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }

      getSpaceDetailsById(spaceId);
    }
  }, [spaceId, type]);

  return (
    <>
      <Box>
        {isLoading && <Loader />}

        <Box>
          <Box>
            <Header
              returnBack={returnBack}
              type={`${spaceType} space`}
              createUpdateHandler={createUpdateHandler}
              disableButton={readOnly}
            />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f7f7f7',
              padding: { sm: '15px', xs: '15px 0px 0px 0px' },
              position: 'relative',
              height: {
                sm: 'calc(100vh - 75px)',
                xs: 'calc(100vh - 65px)',
              },
              overflowY: loading ? 'hidden' : 'scroll',
              overflowX: 'hidden',
            }}
            id='scrollableDiv'
          >
            <SpaceDetails
              stateSpace={{ ...stateSpace, readOnly: readOnly }}
              setStateSpace={setStateSpace}
            />
            <SpaceAccess
              stateSpace={{ ...stateSpace, readOnly: readOnly }}
              setStateSpace={setStateSpace}
            />
            {![Types?.EDIT, Types?.VIEW].includes(type) && (
              <InviteMembers
                stateSpace={{ ...stateSpace, readOnly: readOnly }}
                setStateSpace={setStateSpace}
              />
            )}
          </Box>
        </Box>
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={t('done')}
          closeButtonHandle={handleConfirm}
          confirmButtonHandle={() => setShowExitWarning(false)}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
        {showPublishConfirm ? (
          <PlateformXDialog
            isDialogOpen={showPublishConfirm}
            title={t('congratulations')}
            subTitle={
              type === Types?.EDIT
                ? t('space_update_popup')
                : t('space_create_popup')
            }
            confirmButtonText={t('go_to_listing')}
            confirmButtonHandle={() => navigate('/community/space')}
            modalType='publish'
          />
        ) : null}
      </Box>
    </>
  );
};

export default CreateSpace;
