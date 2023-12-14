import Header from '../Space/Header/Header';
import { Box, Divider } from '@mui/material';
import Loader from '../../Common/Loader';
import MemberDetails from './MemberDetails/MemberDetails';

export default function CreateMember() {
  const loading = false;
  const isLoading = false;
  return (
    <>
      <Box>
        {isLoading && <Loader />}

        <Box>
          <Box>
            <Header type='member' />
            <Divider></Divider>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f7f7f7',
              padding: { sm: '15px', xs: '15px 0px 0px 0px' },
              height: {
                sm: 'calc(100vh - 55px)',
                xs: 'calc(100vh - 45px)',
              },
              overflowY: 'hidden',
              overflowX: 'hidden',
            }}
          >
            <MemberDetails />
          </Box>
        </Box>
        {/* <PlateformXDialog
            isDialogOpen={showExitWarning}
            title={t('save_warn_title')}
            subTitle={t('save_warn_subtitle')}
            closeButtonText={t('take_me_out')}
            confirmButtonText={t('done')}
            closeButtonHandle={closeButtonHandle}
            confirmButtonHandle={saveQuiz}
            crossButtonHandle={() => {
              setShowExitWarning(false);
            }}
            modalType='unsavedChanges'
          />
          <PlateformXDialog
            isDialogOpen={onSavedModal}
            title={t('save_as_draft')}
            subTitle={t('quiz_save_popup')}
            closeButtonText={t('edit')}
            confirmButtonText={t('go_to_listing')}
            closeButtonHandle={crossButtonHandle}
            confirmButtonHandle={() => navigate('/content/quiz')}
            crossButtonHandle={crossButtonHandle}
            modalType='draft'
            closeIcon={<CreateRoundedIcon />}
          />
          {showPublishConfirm ? (
            <PlateformXDialog
              isDialogOpen={showPublishConfirm}
              title={t('congratulations')}
              subTitle={t('quiz_publish_popoup')}
              closeButtonHandle={() => setShowPublishConfirm(false)}
              confirmButtonText={t('go_to_listing')}
              confirmButtonHandle={() => navigate('/content/quiz')}
              modalType='publish'
            />
          ) : null}
          {openPageExistModal ? (
            <PlateformXDialog
              isDialogOpen={openPageExistModal}
              title={`${t('quiz')} ${t('already_exists')}`}
              subTitle={t('conformation')}
              closeButtonText={t('no')}
              confirmButtonText={t('yes')}
              closeButtonHandle={pageExistCloseHandle}
              confirmButtonHandle={pageExistYesButtonHandle}
              crossButtonHandle={pageExistCloseHandle}
              modalType=''
            />
          ) : null} */}
      </Box>
    </>
  );
}
