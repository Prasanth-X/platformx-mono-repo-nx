import { DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../../../components/Common/selectListing/Filter';
import { DialogContainer, FilterContainer } from './SlideUpFilterDialog.styles';
// type FilterProps = {
//   openDialog: boolean;
//   filterValue: string;
//   handleChange: (props: React.ChangeEvent<HTMLInputElement>) => void;
//   handleCloseFilter: () => void;
// };
export const SlideUpFilterDialog = ({
  openDialog,
  filterValue,
  handleChange,
  handleCloseFilter,
}) => {
  const { t } = useTranslation();
  const Transition = React.forwardRef(function Transition(
    props: {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction='up' ref={ref} {...props} />;
  });
  return (
    <DialogContainer
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseFilter}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {t('filter_update')}
      </DialogTitle>
      <FilterContainer>
        <Filter
          filterValue={filterValue}
          handleChange={handleChange}
          handleCloseFilter={handleCloseFilter}
        />
      </FilterContainer>
    </DialogContainer>
  );
};
