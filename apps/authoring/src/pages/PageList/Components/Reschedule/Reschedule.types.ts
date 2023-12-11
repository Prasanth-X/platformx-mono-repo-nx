export type RescheduleProps = {
  isOpen: boolean;
  rescheduleFlag: string;
  schedulePublishDateTime: string;
  scheduleUnpublishDateTime: string;
  rescheduleDto: any;
  handleConfirmPublishReschedule?: (string, any) => void;
  handleConfirmUnpublishReschedule?: (string, any) => void;
  closeButtonHandle: () => void;
};
