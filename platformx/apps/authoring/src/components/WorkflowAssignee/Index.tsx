import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import AssigneeList from './AssigneeList/AssigneeList';

const WorkflowAssignee = ({ open, setOpen, path, contentType }) => {
  const { t } = useTranslation();
  const stages = [
    {
      label: 'Admin',
      role: 'Admin',
    },
    {
      label: 'Moderator-1',
      role: 'Moderator-1',
    },
    {
      label: 'Admin',
      role: 'Admin',
    },
  ];
  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClickOpen}
      maxWidth='em'
      fullWidth={true}
    >
      <DialogTitle>
        {t('Assign Workflow')}
        <IconButton
          onClick={handleClickOpen}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={0} alternativeLabel>
          {stages.map((stage) => (
            <Step key={stage.label}>
              <StepLabel>
                {stage.label}
                {stage.role !== 'Admin' && <AssigneeList />}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleClickOpen}
            variant='contained'
            sx={{
              '&.Platform-x-ButtonBase-root': {
                maxHeight: '40px',
                minWidth: '50px',
              },
            }}
          >
            {t('save')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WorkflowAssignee;
