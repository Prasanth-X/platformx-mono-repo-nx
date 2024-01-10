import { Box } from '@mui/material';
import { t } from 'i18next';
import { useCustomStyle } from './XTable.style';
export interface XTableprops {
  data: any;
  handleInput?: any;
  handleOnBlur?: any;
}
const XTable = ({ data, handleInput, handleOnBlur }: XTableprops) => {
  const classes = useCustomStyle();

  return (
    <Box className={classes.quotesTable}>
      <table>
        <tr>
          <th
            style={{
              width: '14.5%',
              borderRight: '1px solid #ced3d9',
              textTransform: 'capitalize',
            }}
          >
            {t('to')}
          </th>
          <th
            style={{
              width: '14.5%',
              borderRight: '1px solid #ced3d9',
              textTransform: 'capitalize',
            }}
          >
            {t('from')}
          </th>
          <th
            style={{
              width: '100%',
              textTransform: 'capitalize',
            }}
          >
            {t('quotes')}
          </th>
        </tr>
        {Object.keys(data).map((val, key) => {
          return (
            <tr
              key={key}
              style={{
                backgroundColor: key % 2 === 0 ? '#f5f6f8' : '#e6eaed',
              }}
            >
              <td>{data[val].to}</td>
              <td>{data[val].from}</td>
              <td style={{ color: '#2d2d39', borderRight: '0px' }}>
                <input
                  id='inputID'
                  style={{
                    border: 'none',
                    width: '-webkit-fill-available',
                    backgroundColor: ' inherit',
                    textAlign: 'center',
                    height: 'inherit',
                  }}
                  type='text'
                  name='quotes'
                  // placeholder={data[val].quotes}
                  value={data[val].quotes}
                  onChange={(e) => handleInput(e, val)}
                  onBlur={(e) => handleOnBlur(e, val)}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </Box>
  );
};
export default XTable;
