import { Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { capitalizeFirstLetter } from '../../../utils/helperFunctions';

type CellWrapperProps = {
  text: string;
  type: any;
  colSpan?: number;
  className?: string;
  role?: string;
};

const CellWrapper = ({
  text,
  type,
  className = '',
  colSpan = 0,
  role,
}: CellWrapperProps) => {
  return (
    <TableCell
      className={className}
      colSpan={colSpan}
      variant='head'
      sx={{
        borderBottom: className === 'none' ? className : '',
        padding:
          className === 'none' || className === 'last' ? '5px 10px' : '16',
      }}
    >
      <Typography variant='h7regular' component='h5' sx={{ color: '#A0A3BD' }}>
        {capitalizeFirstLetter(role)}
      </Typography>
      <Typography variant={type} component='h5'>
        {text}
      </Typography>
    </TableCell>
  );
};

export default CellWrapper;
