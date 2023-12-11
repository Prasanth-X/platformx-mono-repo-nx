import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { Store } from '../../store/ContextStore';
import ThemeConstants from '../../theme/variable';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import upload from '../../assets/images/upload.png';
import replace from '../../assets/images/replace.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import OutsideClickHandler from 'react-outside-click-handler';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useContext, useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../utils/helperFunctions';
import { iconReplaceBasedCondition } from './helperButtonEditWindow';
import { nullToArray, nullToObject } from '../../utils/helperFunctions';
import { uriToJSON } from '../../utils/helper';
import './ButtonEditWindow.css';

interface ButtonEditWindowProps {
  prelemData?: any;
  onOpenContentType?: any;
  zIndex: number;
  opacity: string;
  left: string;
  top: string;
  buttonRef: any;
  dropDownMenuRef: React.Ref<HTMLDivElement>;
  handleWindowOptionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUrlInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectPageUrlChange: (event: object) => void;
  windowValue: string;
  pageUrl: string;
  externalLink: string;
  urlValue: string;
  contentUrl: string;
  onToggleContentGallery: () => void;
  onOutsideClick?: any;
  eComContentGalleryHandle?: any;
  jsValue?: any;
  handleJsValueChange?: (event: SelectChangeEvent<any>) => void;
}
export const ButtonEditWindow = ({
  prelemData,
  onOpenContentType,
  zIndex,
  opacity,
  left,
  top,
  buttonRef,
  handleWindowOptionChange,
  handleSelectPageUrlChange,
  handleUrlInputChange,
  handleUrlChange,
  windowValue,
  pageUrl,
  externalLink,
  dropDownMenuRef,
  urlValue,
  contentUrl,
  onToggleContentGallery,
  onOutsideClick,
  eComContentGalleryHandle,
  jsValue,
  handleJsValueChange,
}: ButtonEditWindowProps) => {
  const { PrelemId = '' } = nullToObject(prelemData);
  const isEcom = ['Prelem_073', 'Prelem_074', 'Prelem_075', 'Prelem_072'].includes(PrelemId);

  const { t } = useTranslation();
  const { state } = useContext(Store);
  const { page } = state;
  const [ecomTypeData, setEcomTypeData] = useState({});
  const [ContentTypeData, setContentTypeData] = useState({});
  const {
    ContentType = '',
    isGalleryArray = '',
    Title = '',
  } = nullToObject(ContentTypeData);
  const { ecommerceRequest: { filter = [] } = {} } = nullToObject(ecomTypeData);
  const ecomFilterData = nullToArray(filter).length > 0 ? true : false;
  const commonRadioButton = () => {
    return (
      <RadioGroup
        name='window-radio-buttons-group'
        value={windowValue}
        onChange={handleWindowOptionChange}
        row
      >
        <FormControlLabel
          value='current window'
          control={<Radio />}
          label='Current Tab'
          sx={{
            '.Platform-x-FormControlLabel-label': {
              fontSize: ThemeConstants.FONTSIZE_SM,
            },
            marginRight: '40px',
          }}
        />
        <FormControlLabel
          value='new window'
          control={<Radio />}
          label='New Tab'
          sx={{
            '.Platform-x-FormControlLabel-label': {
              fontSize: ThemeConstants.FONTSIZE_SM,
            },
            marginRight: '40px',
          }}
        />
      </RadioGroup>
    );
  };

  useEffect(() => {
    if (contentUrl && typeof contentUrl === 'string') {
      if (contentUrl.includes('ContentEnCodeParse')) {
        //for convert parse condition check manual
        setContentTypeData(uriToJSON(contentUrl));
      } else {
        setContentTypeData({});
      }
    } else {
      setContentTypeData({});
    }

    if (contentUrl && typeof contentUrl === 'string') {
      if (contentUrl.includes('ecomEnCodeParse')) {
        setEcomTypeData(uriToJSON(contentUrl));
      } else {
        setEcomTypeData({});
      }
    } else {
      setEcomTypeData({});
    }
  }, [contentUrl]);

  const style = `
  .contentInputHandle .Platform-x-OutlinedInput-notchedOutline{
    border-color: transparent !important;
  }
  `;

  return (
    <OutsideClickHandler onOutsideClick={(e) => onOutsideClick(e)}>
      <Box
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
          padding: '30px',
          borderRadius: `7px`,
          boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.16)`,
          width: { xs: '92%', sm: '550px' },
          marginTop: { xs: '20px', sm: '0' },
          boxSizing: 'border-box',
          opacity: opacity,
          zIndex: zIndex,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%,-50%)`,
        }}
        data-testid='empty-state-wrap'
        ref={buttonRef}
      >
        <style>{style}</style>
        <RadioGroup
          name='page-radio-buttons-group'
          value={urlValue}
          onChange={handleUrlChange}
          className='popup-radio-options'
          row
          sx={{ marginBottom: urlValue === 'Content' ? '15px' : '25px' }}
        >
          <FormControlLabel
            className='form-label'
            sx={{
              '.Platform-x-FormControlLabel-label': {
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
            }}
            value='Internal'
            control={<Radio />}
            label='Page'
          />
          <FormControlLabel
            className='form-label'
            sx={{
              '.Platform-x-FormControlLabel-label': {
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
            }}
            value='External'
            control={<Radio />}
            label='Link'
          />
          <FormControlLabel
            className='form-label'
            sx={{
              '.Platform-x-FormControlLabel-label': {
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
            }}
            value='Content'
            control={<Radio />}
            label='Content'
          />

          {isEcom && (
            <FormControlLabel
              className='form-label'
              sx={{
                '.Platform-x-FormControlLabel-label': {
                  fontSize: ThemeConstants.FONTSIZE_SM,
                },
              }}
              value='Ecommerce'
              control={<Radio />}
              label='Ecommerce'
            />
          )}
        </RadioGroup>

        {urlValue === 'Internal' && (
          <Select
            displayEmpty
            value={pageUrl}
            onChange={handleSelectPageUrlChange}
            placeholder='Choose Page'
            input={<OutlinedInput />}
            sx={{
              width: '100%',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#f6f7f8',
              height: '40px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              '.placeholder': {
                color: '#777',
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
              '.Platform-x-OutlinedInput-notchedOutline': {
                border: 0,
              },
              marginBottom: '25px',
            }}
            MenuProps={{ ref: dropDownMenuRef }}
          >
            {page?.publishedPages?.map((item, key) => (
              <MenuItem key={key} value={`/${item?.Page}`}>
                {item?.Title}
              </MenuItem>
            ))}
          </Select>
        )}

        {urlValue === 'External' && (
          <TextField
            id='outlined-name'
            placeholder='Paste URL here'
            value={externalLink}
            onChange={handleUrlInputChange}
            sx={{
              width: '100%',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#f6f7f8',
              height: '40px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              '.placeholder': {
                color: '#777',
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
              '.Platform-x-InputBase-root': {
                height: '40px',
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
              '.Platform-x-OutlinedInput-notchedOutline': {
                border: 0,
              },
              marginBottom: '25px',
              '& .Platform-x-OutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  borderRadius: '4px',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        )}

        {/* {urlValue === 'Js' && (
          <Select
            displayEmpty
            value={jsValue}
            onChange={handleJsValueChange}
            placeholder='Choose Page'
            input={<OutlinedInput />}
            sx={{
              width: '100%',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#f6f7f8',
              height: '40px',
              fontSize: ThemeConstants.FONTSIZE_SM,
              '.placeholder': {
                color: '#777',
                fontSize: ThemeConstants.FONTSIZE_SM,
              },
              '.Platform-x-OutlinedInput-notchedOutline': {
                border: 0,
              },
              marginBottom: '25px',
            }}
            MenuProps={{ ref: dropDownMenuRef }}
          >
            <MenuItem
              key={'reopenCookieManagement'}
              value={`reopenCookieManagement`}
            >
              {`reopenCookieManagement`}
            </MenuItem>
          </Select>
        )} */}
        {/*Content  */}
        {urlValue === 'Content' ? (
          <>
            <Box
              sx={{
                marginBottom: '15px',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    paddingBottom: '5px',
                    fontSize: ThemeConstants.FONTSIZE_SM,
                  }}
                >
                  {t('add_your_content')}
                </Typography>
              </Box>

              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Grid
                  item
                  sx={{
                    position: 'relative',
                    border: '1px solid #f1f1f1',
                    width: '75%',
                    height: '40px',
                    backgroundColor: '#f6f6f6',
                  }}
                  md={10}
                  lg={10}
                  xs={12}
                  sm={12}
                  className='contentInputHandle'
                >
                  {ContentType && iconReplaceBasedCondition(ContentTypeData)}
                  <Box
                    sx={{
                      whiteSpace: 'nowrap',
                      width: '100%',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
                      backgroundColor: '#f6f7f8',
                      height: '40px',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'start',
                      fontSize: ThemeConstants.FONTSIZE_SM,
                      paddingLeft: ContentType ? '35px' : '5px',
                    }}
                  >
                    {ContentType ? (
                      <>
                        <Box
                          sx={{
                            justifyContent: 'start',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                          fontWeight={ThemeConstants.FONTWEIGHT_SEMIBOLD}
                        >
                          <Typography
                            sx={{
                              width: '150px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',
                              whiteSpace: 'normal',
                            }}
                          >
                            {`"${capitalizeFirstLetter(Title)}" `}
                          </Typography>
                          <Typography>{'Added!'}</Typography>
                        </Box>
                      </>
                    ) : (
                      <Box component='span'>{t('content_type_added')}</Box>
                    )}
                    {/* {ContentType ? `"${ContentType}" Added!` : t("content_type_added")} */}
                  </Box>
                </Grid>

                <Grid
                  item
                  md={2}
                  lg={2}
                  xs={12}
                  sm={12}
                  sx={{
                    paddingLeft: { md: '10px' },
                    mt: {
                      xs: 1,
                      md: 0,
                    },
                  }}
                >
                  <Box
                    onClick={onOpenContentType}
                    sx={{
                      width: { xs: '100% important', md: '0px' },
                      height: '40px',
                      minWidth: { xs: '100% important', md: '40px' },
                      lineHeight: '40px',
                      borderRadius: '4px',
                      alignItems: 'center',
                      backgroundColor: '#000',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <img
                      alt='uploadAndReplace'
                      src={ContentType ? replace : upload}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {!isGalleryArray ? <>{commonRadioButton()}</> : null}
          </>
        ) : (urlValue === 'Ecommerce' && isEcom) ? (
          <>
            <Box
              sx={{
                marginBottom: '15px',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    paddingBottom: '5px',
                    fontSize: ThemeConstants.FONTSIZE_SM,
                  }}
                >
                  {t('ecom_add_product')}
                </Typography>
              </Box>

              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Grid
                  item
                  sx={{
                    position: 'relative',
                    border: '1px solid #f1f1f1',
                    width: '75%',
                    height: '40px',
                    backgroundColor: '#f6f6f6',
                  }}
                  md={10}
                  lg={10}
                  xs={12}
                  sm={12}
                  className='contentInputHandle'
                >
                  <Box
                    sx={{
                      width: '100%',
                      borderRadius: '4px',
                      boxShadow: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.16)',
                      backgroundColor: '#f6f7f8',
                      height: '40px',
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'start',
                      fontSize: ThemeConstants.FONTSIZE_SM,
                      paddingLeft: ContentType ? '35px' : '5px',
                    }}
                  >
                    {ecomFilterData ? (
                      <>
                        <Box
                          sx={{
                            justifyContent: 'start',
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                          fontWeight={ThemeConstants.FONTWEIGHT_SEMIBOLD}
                        >
                          <Typography
                            sx={{
                              width: '100%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: '1',
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {t('ecom_product_added')}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <Box component='span'>{t('ecom_no_product')}</Box>
                    )}
                  </Box>
                </Grid>

                <Grid
                  item
                  md={2}
                  lg={2}
                  xs={12}
                  sm={12}
                  sx={{
                    paddingLeft: { md: '10px' },
                    mt: {
                      xs: 1,
                      md: 0,
                    },
                  }}
                >
                  <Box
                    onClick={() => eComContentGalleryHandle(contentUrl)}
                    sx={{
                      width: { xs: '100% important', md: '0px' },
                      height: '40px',
                      minWidth: { xs: '100% important', md: '40px' },
                      lineHeight: '40px',
                      borderRadius: '4px',
                      alignItems: 'center',
                      backgroundColor: '#000',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <img
                      alt='uploadAndReplace'
                      src={ContentType ? replace : upload}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {commonRadioButton()}
          </>
        ) : (
          <>
            <>{commonRadioButton()}</>
          </>
        )}
      </Box>
    </OutsideClickHandler>
  );
};
