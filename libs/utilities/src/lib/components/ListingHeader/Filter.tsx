import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface filterProps {
  filterValue?: any;
  handleChange?: any;
  handleCloseFilter?: any;
  contentType?: any;
}
export default function Filter({
  filterValue,
  handleChange,
  handleCloseFilter,
  contentType,
}: filterProps) {
  const { t } = useTranslation();

  return (
    <FormControl className='form_Control'>
      <RadioGroup
        value={filterValue}
        onChange={handleChange}
        sx={{ textTransform: 'capitalize' }}
      >
        <FormControlLabel
          onClick={handleCloseFilter}
          value='ALL'
          control={<Radio className='form_Control_radio' />}
          label={t('all')}
        />
        <FormControlLabel
          onClick={handleCloseFilter}
          value='PUBLISHED'
          control={<Radio className='form_Control_radio' />}
          label={t('published')}
        />
        <FormControlLabel
          onClick={handleCloseFilter}
          value='DRAFT'
          control={<Radio className='form_Control_radio' />}
          label={t('draft')}
        />
        <FormControlLabel
          onClick={handleCloseFilter}
          value='UNPUBLISHED'
          control={<Radio className='form_Control_radio' />}
          label={t('unpublished')}
        />

        {contentType === 'Event' && (
          <FormControlLabel
            value='LIVE'
            label={t('live')}
            onClick={handleCloseFilter}
            control={<Radio className='form_Control_radio' />}
          />
        )}
      </RadioGroup>
    </FormControl>
  );
}
