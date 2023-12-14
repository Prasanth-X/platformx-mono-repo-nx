import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import PlateformXDialog from '../../../../components/Modal';
import { nullToObject } from '../../../../utils/helperFunctions';

export const ArticleActionDialog = (props: any = {}) => {
  const {
    onSavedModal,
    crossButtonHandle,
    showExitWarning,
    closeButtonHandle,
    setShowExitWarning,
    showPublishConfirm,
    showWorkflowSubmit,
  } = nullToObject(props);
  const navigate = useNavigate();

  return (
    <>
      {onSavedModal && (
        <PlateformXDialog
          isDialogOpen={onSavedModal}
          title={t('save_as_draft')}
          subTitle={`${t('article')} ${t('saved_toast')}`}
          closeButtonText={t('edit')}
          confirmButtonText={t('go_to_listing')}
          closeButtonHandle={crossButtonHandle}
          confirmButtonHandle={() => navigate('/content/article')}
          crossButtonHandle={crossButtonHandle}
          modalType='draft'
          closeIcon={<CreateRoundedIcon />}
        />
      )}
      {showExitWarning && (
        <PlateformXDialog
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={'Stay Here'}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={() => {
            setShowExitWarning(false);
          }}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
      )}
      {showPublishConfirm && (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          closeButtonHandle={closeButtonHandle}
          title={t('congratulations')}
          subTitle={t('article_publish_popoup')}
          confirmButtonText={t('go_to_listing')}
          confirmButtonHandle={() => navigate('/content/article')}
          modalType='publish'
        />
      )}
      {showWorkflowSubmit && (
        <PlateformXDialog
          isDialogOpen={showWorkflowSubmit}
          closeButtonHandle={closeButtonHandle}
          title={t('congratulations')}
          subTitle={t('requested_action')}
          confirmButtonText={t('go_to_listing')}
          confirmButtonHandle={() => navigate('/content/article')}
          modalType='publish'
        />
      )}
    </>
  );
};
