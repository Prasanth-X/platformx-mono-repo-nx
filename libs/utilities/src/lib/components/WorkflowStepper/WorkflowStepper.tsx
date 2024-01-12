import CloseIcon from '@mui/icons-material/Close'
import { Step, StepLabel, Stepper } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
// import { articleApi } from '@platformx/authoring-apis'
import {
  TaskNotFound,
  XLoader,
  capitalizeFirstLetter,
} from '@platformx/utilities'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getStepperCount, lineBreak } from '../WorkflowStepper/Utils/helper'
type WorkflowStepperProps = {
  open: boolean
  setOpen: (open: boolean) => void
  path: string
  contentType: string
}
const WorkflowStepper = ({
  open,
  setOpen,
  path,
  contentType,
}: WorkflowStepperProps) => {
  const { t } = useTranslation()
  const [stages, setStages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const handleClickOpen = () => {
    setOpen(!open)
  }

  const getStages = async () => {
    try {
      // const response: any = await articleApi.fetchArticleDetails({ //TODO: need to change
      //   contentType: capitalizeFirstLetter(contentType),
      //   path: path,
      // })
      // if (response?.authoring_getCmsContentByPath?.stages) {
      //   setStages(response.authoring_getCmsContentByPath.stages)
      // }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getStages()
  }, [])
  return (
    <Dialog
      open={open}
      onClose={handleClickOpen}
      maxWidth="em"
      fullWidth={true}
    >
      <DialogTitle>
        {t('approval_status')}
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
        {isLoading && <XLoader type="circular" />}
        {stages.length === 0 && !isLoading ? (
          // 'No workflow status for this content'
          <TaskNotFound />
        ) : (
          <Stepper activeStep={getStepperCount(stages)} alternativeLabel>
            {stages.map((stage: any) => (
              <Step key={stage.label}>
                <StepLabel>
                  {stage.state === 'request_review'
                    ? lineBreak('Request', stage.user_name)
                    : stage.status === 'Completed'
                      ? lineBreak(
                        `${capitalizeFirstLetter(stage.role)} Approved`,
                        stage.user_name,
                      )
                      : lineBreak(
                        `${capitalizeFirstLetter(stage.role)} ${stage.status}`,
                        stage.user_name,
                      )}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default WorkflowStepper