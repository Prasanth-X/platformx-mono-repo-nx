import { MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import ArrowDown from '../../../assets/svg/ArrowDown.svg';
import { AddSiteSelectProps } from '../SiteCreation.types';

const AddSiteSelect = ({
  value,
  handleDropDownChange,
  itemList,
  isLanguageDropDown,
  isDisabled = false,
}: AddSiteSelectProps) => {
  return (
    <>
      <style>{`
        .Mui-selected{
            background-color: transparent !important
        }
        .Mui-selected:hover{
            background-color: transparent !important
        }
        #menu- div:nth-child(3){
            box-shadow: none;
            margin-top: 2.5px;
        }
        `}</style>
      <Select
        disabled={isDisabled}
        IconComponent={() => <img src={ArrowDown} />}
        id='selectcontainer'
        onChange={handleDropDownChange}
        displayEmpty
        value={value}
        sx={{
          width: '100%',
          boxShadow: 'none',
          //border: '2px solid #14142B',
          borderRadius: '5px',
          height: '56px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '16px',
          color: '#6E7191',
          backgroundColor: '#EFF0F6',
        }}
        inputProps={{
          'aria-label': 'Without label',
          sx: { boxShadow: 'none' },
        }}
        MenuProps={{
          sx: { boxShadow: 'none' },
          MenuListProps: {
            sx: {
              background: '#FFFFFF',
              border: '1px solid #D9DBE9',
              borderRadius: '5px',
              boxShadow: 'none',
              padding: '8px 0',
            },
          },
        }}
      >
        {itemList.map((item, index) => (
          <MenuItem
            sx={{
              fontFamily: 'HCLTechRoobert',
              fontWeight: '500',
              fontSize: '16px',
              height: '42px',
              color: value === item.value ? '#14142B' : '#6E7191',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              padding: '8px 24px',
            }}
            value={item.value}
            key={`val_${index + 1}`}
          >
            <Box sx={{ display: 'flex' }}>
              {isLanguageDropDown && (
                <img
                  src={require(`../../../assets/${item.value}_flag.png`)}
                  style={{
                    objectFit: 'cover',
                    width: '24px',
                    height: '24px',
                    marginRight: '16px',
                  }}
                />
              )}
              {item.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default AddSiteSelect;
