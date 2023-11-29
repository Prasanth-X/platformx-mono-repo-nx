import { Box, Button, Tooltip, Typography } from '@mui/material';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import LongLeftArrow from '../../../assets/svg/LongLeftArrow.svg';
import MenuTwoDash from '../../../assets/svg/MenuTwoDash.svg';
import Logo from '../../../assets/svg/PlatX-logo.svg';
import SaveIcon from '../../../assets/svg/Save.svg';
import './SiteCreationTopBar.css';
import { SiteCreationTopBarProps } from './SiteCreationTopBar.types';

const SiteCreationTopBar = ({
  returnBack,
  siteLabel,
  onBreadscumClick,
  iconList,
  activeForm = '',
  buttonStyle,
  isFormValid = true,
  onSave,
  formValue,
  onIconClick,
  isSaved,
}: SiteCreationTopBarProps) => {
  const navigate = useNavigate();
  const excludeItems = ['isShared'];
  const { siteName } = useParams();
  const isdisabled = formValue?.[2]?.value === '';
  return (
    <>
      <style>{`#scrollbar::-webkit-scrollbar {display: none;}`}</style>
      <Box className='sitecreationtophead'>
        <Box className='d-flex'>
          <Box className='backarrow' onClick={returnBack}>
            <img src={MenuTwoDash} width={24} height={24} />
          </Box>
          <Box onClick={() => navigate('/dashboard')}>
            <img src={Logo} height='30' />
          </Box>
        </Box>
        <Box className='draftspace'>
          <Tooltip
            title={t('save_as_draft')}
            placement='left'
            enterTouchDelay={0}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                marginRight: '21px',
                alignContent: 'center',
                justifyContent: 'center',
                height: '38px',
                cursor: !isdisabled ? 'pointer' : 'no-drop',
              }}
              onClick={() => !isdisabled && onIconClick()}
            >
              <img src={SaveIcon} width={18} height={18} />
            </Box>
          </Tooltip>
          <Tooltip
            title={t('save_publish')}
            placement='bottom'
            enterTouchDelay={0}
          >
            <Box className='sitetool'>
              <Button
                variant='contained'
                sx={{
                  '&:disabled': {
                    backgroundColor: '#A0A3BD;',
                    color: '#4E4B66',
                    opacity: '0.5',
                  },
                  fontFamily: 'HCLTech Roobert',
                  fontStyle: 'normal',
                  fontWeight: '600',
                  lineHeight: '20px',
                  fontSize: '14px',
                  backgroundColor: '#14142B',
                  borderRadius: '5px',
                  width: '76px',
                  height: '38px',
                  cursor: 'pointer',
                  ...buttonStyle,
                }}
                type='submit'
                //disabled={!formValue.every((control) => control.value || excludeItems.includes(control.name))}
                disabled={!isSaved}
                onClick={() => onSave()}
              >
                {siteName ? `${t('update')}` : `${t('publish')}`}
              </Button>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: {
            lg: 'solid 1px #ced3d9',
            md: 'solid 1px #ced3d9',
            sm: 'solid 1px #ced3d9',
            xs: '0',
          },
          height: '81px',
        }}
        className='sitecreationtopbar'
      >
        <Box
          sx={{ width: { lg: '20%', md: '20%', sm: '20%', xs: '100%' } }}
          className='leftarrow'
        >
          <Box className='backarrow' onClick={returnBack}>
            <img src={LongLeftArrow} />
          </Box>
          <Typography variant='h3medium'>{siteLabel}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: '80%', md: '80%', sm: '80%', xs: '100%' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <Box
            id='scrollbar'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: {
                lg: 'flex-end',
                md: 'flex-end',
                sm: 'flex-end',
                xs: 'flex-start',
              },
              overflow: 'auto',
              flexWrap: 'nowrap',
            }}
          >
            {iconList.map((icon: any, index) => (
              <Box
                sx={{ display: 'flex', cursor: 'pointer' }}
                key={`icon${index + 1}`}
              >
                {index > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 10px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '20px',
                        height: '0px',
                        border: '1px solid #D9DBE9',
                      }}
                    ></Box>
                  </Box>
                )}

                <Box
                  onClick={() => onBreadscumClick(icon)}
                  sx={{ paddingLeft: 0, width: 'fit-content' }}
                >
                  <Typography
                    className='d-flex align-items-center'
                    variant='h7medium'
                    sx={{
                      textTransform: 'capitalize',
                      '&:hover': {
                        '.text': {
                          display: 'block',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          activeForm === icon.section ? '#D7ECFD' : '',
                        color: activeForm === icon.section ? '#4B9EF9' : '',
                      }}
                      className='usericon'
                    >
                      {icon.iconComponent}
                    </Box>
                    <Box
                      className='text'
                      sx={{
                        display: activeForm === icon.section ? 'block' : 'none',
                      }}
                    >
                      {/* {icon?.title} */}
                      {siteName
                        ? `${t('update_site')}`
                        : `${t('create_new_site')}`}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SiteCreationTopBar;
