import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { countries } from '@platformx/authoring-apis'
import {
  AddImage,
  BasicSwitch,
  CommonBoxWithNumber,
  TextBox,
  ThemeConstants,
  TitleSubTitle,
  getUniqueTimeZone,
} from '@platformx/utilities'
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import { Constants } from './Constants'
import { useStyles } from './CreateUser.styles'
import { useCustomStyle } from './RolePermissions.style'


const UserDetails = ({
  state,
  setState,
  showGallery,
  formik,
  isEmailExist,
  handleEmail,
  t,
  phone,
  setPhone,
  classes,
  isDisabled,
  isd,
  setISD,
}: any) => {
  const strTime = new Date().toLocaleString([], {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  })
  const time = new Date(strTime).toTimeString().slice(0, -21)
  const defaultTimeZone = `${Intl.DateTimeFormat().resolvedOptions().timeZone
    } ${time}(IST)`
  const [operationType, setOperationType] = useState<string>('replace')
  // const [isd, setISD] = useState('');
  const [isPhone, setIsPhone] = useState(false)

  const [usdTime, setUsdTime] = useState<any[]>([])
  const className = useStyles()
  const [flag, setFlag] = useState('en')
  const LanguageList = [
    { id: 'en', label: 'English (UK)' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
  ]

  const onUploadClick = (type: SetStateAction<string>) => {
    showGallery(type, 'image')
    setOperationType(type)
  }
  const handleDateChangeRaw = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }
  const handleChangeTimeZone = (event: any, newValue: { label: any }) => {
    setState({
      ...state,
      'timezone': newValue.label,
    })
  }
  const handleChangeLanguage = (event: any, newValue: any) => {
    setState({
      ...state,
      'default_language': newValue.id,
    })
    setFlag(newValue?.id)
  }
  const handleChange = () => {
    setState({
      ...state,
      'default_site_checked': !state.default_site_checked,
    })
  }

  const handleISD = (event: any, newValue: { label: any }) => {
    setISD(newValue.label)
    setIsPhone(false)
  }
  const handleChangePhone = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, '')
    setPhone(value)
  }
  useEffect(() => {
    getUniqueTimeZone().forEach((val: any) => {
      setUsdTime((prev) => [...prev, { label: val.label, time: val.time }])
    })

    !isDisabled &&
      setState({
        ...state,
        'timezone': defaultTimeZone,
      })
  }, [])
  const classess = useCustomStyle()
  return (
    <Box className={classess.mainStyleWrapper} id="user">
      <CommonBoxWithNumber
        number="02"
        title={t('users_details')}
        titleVarient="p3semibold"
        subTitleVarient="p4regular"
        subTitle={t('subhead')}
      >
        <Grid container>
          <Grid item xs={12} sm={5} md={5} className="leftFiled">
            <TitleSubTitle
              title={t('profile_picture')}
              subTitle={`${t('sub_title')} ${t('profile_picture')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className="textFiled">
            <AddImage
              type="Images"
              onUploadClick={onUploadClick}
              url={state.image}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiled">
            <TitleSubTitle
              title={t('first_name')}
              subTitle={`${t('sub_title')} ${t('first_name')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiled">
            <TextBox
              name="first_name"
              placeHolder={t('first_name_placeholder')}
              handleOnBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              handleChange={formik.handleChange}
              state={formik.values.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiled">
            <TitleSubTitle
              title={t('last_name')}
              subTitle={`${t('sub_title')} ${t('last_name')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiled">
            <TextBox
              name="last_name"
              placeHolder={t('last_name_placeholder')}
              handleOnBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              handleChange={formik.handleChange}
              state={formik.values.last_name}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiled">
            <TitleSubTitle
              title={t('email')}
              subTitle={`${t('sub_title')} ${t('email')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiled">
            <TextBox
              name="email"
              placeHolder={t('email_placeholder')}
              isDisabled={isDisabled}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              handleChange={formik.handleChange}
              isEmailExist={isEmailExist}
              state={formik.values.email}
              borderColor={classes.notchedOutline}
              handleOnBlur={(e: any) => {
                formik.handleBlur(e)
                handleEmail(e)
              }}
            />
            {isEmailExist ? (
              <Typography
                variant="h7regular"
                sx={{
                  color: 'rgb(211,47,47)',
                  marginTop: '10px',
                  fontSize: { md: '14px', sm: '12px' },
                  marginLeft: '14px',
                }}
              >
                {t('email_exist')}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={5} md={5} className="leftFiled">
            <TitleSubTitle
              title={t('phone')}
              subTitle={`${t('sub_title')} ${t('phone')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={2.5} md={2.5} className="textFiled">
            <Autocomplete
              id="combo-box-demo"
              sx={{
                width: 'auto',
                marginRight: '5px',
              }}
              options={countries}
              size="small"
              popupIcon={<ExpandMoreIcon />}
              value={isd}
              onChange={handleISD}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{
                    display: 'flex',
                    padding: 0,
                    whiteSpace: 'nowrap',
                    margin: 0,
                    '& > img': {
                      flexShrink: 0,
                    },
                  }}
                  {...props}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '25px',
                      mr: '5px',
                    }}
                  >
                    <img
                      loading="lazy"
                      width="25"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                  </Box>
                  {option.label}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="ISD" />
              )}
            />
            {isPhone ? (
              <Typography
                variant="h7regular"
                sx={{
                  color: 'rgb(211,47,47)',
                  marginTop: '10px',
                  fontSize: { md: '14px', sm: '12px' },
                  marginLeft: '14px',
                }}
              >
                {t('isd_error')}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={4.5} md={4.5} className="textFiled">
            <TextField
              variant="outlined"
              size="small"
              name="phone"
              placeholder={t('phone_placeholder')}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              value={phone}
              onBlur={(e) => {
                formik.handleBlur(e)
                phone
                  ? isd === ''
                    ? setIsPhone(true)
                    : setIsPhone(false)
                  : setIsPhone(false)
                setState({ ...state, [e.target.name]: phone })
              }}
              inputProps={{
                maxLength: 10,
                readOnly: false,
              }}
              onChange={(e) => {
                formik.handleChange(e)
                handleChangePhone(e)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiled">
            <TitleSubTitle
              title={`${t('gender')}`}
              subTitle={`${t('sub_title')} ${t('gender')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiled">
            <FormControl
              fullWidth
            // error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <InputLabel id="demo-simple-select-label">
                {t('gender')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.gender}
                name="gender"
                label={t('gender')}
                onChange={(e) =>
                  formik.setFieldValue('gender', e.target.value as string)
                }
              // onBlur={formik.handleBlur}
              >
                {Constants.map((item) => (
                  <MenuItem key={item} value={t(`${item}`)}>
                    {t(`${item}`)}
                  </MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                  {formik.touched.gender && formik.errors.gender}
                </FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiled">
            <TitleSubTitle
              title={`${t('date_of_birth')}`}
              subTitle={`${t('sub_title')} ${t('date_of_birth')}`}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiled">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="dob"
                    // onBlur={formik.handleBlur}
                    onKeyDown={handleDateChangeRaw}
                  // error={formik.touched.dob && Boolean(formik.errors.dob)}
                  // helperText={formik.touched.dob && formik.errors.dob}
                  />
                )}
                inputFormat="DD/MM/YYYY"
                value={formik.values.dob}
                onChange={(e) => {
                  formik.setFieldValue('dob', new Date(e).toISOString())
                }}
                disableFuture
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={5} md={5} className="leftFiled">
            <TitleSubTitle
              title={t('time_zone')}
              subTitle={t('time_subHead')}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            sx={{ zIndex: 1 }}
            className="textFiled"
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={usdTime}
              size="small"
              sx={{ width: '100%' }}
              value={state.timezone}
              onChange={handleChangeTimeZone}
              renderInput={(params) => (
                <TextField {...params} name="timezone" />
              )}
              popupIcon={<ExpandMoreIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className="leftFiled">
            <TitleSubTitle
              title={t('default_language')}
              subTitle={t('choose_language')}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className="textFiled">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={LanguageList}
              size="small"
              sx={{ width: '100%' }}
              value={state.default_language}
              onChange={handleChangeLanguage}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="default_language"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          // src={require(`../../../assets/${flag}_flag.png`)}
                          src={require(`../../../../../utilities/src/lib/assets/${flag}_flag.png`)}
                          style={{
                            objectFit: 'cover',
                            width: '24px',
                            height: '24px',
                            marginRight: '16px',
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              popupIcon={<ExpandMoreIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={5} className="leftFiledLast">
            <TitleSubTitle
              title={t('default_site')}
              subTitle={t('is_it_your_default_site')}
              titleVariant="h6medium"
              subTitleVariant="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className="textFiledLast">
            <MenuItem className="icons">
              <BasicSwitch
                checked={state.default_site_checked}
                onChange={() => handleChange()}
                color={
                  state.default_site_checked
                    ? ThemeConstants.GREEN_COLOR
                    : 'red'
                }
              />
            </MenuItem>
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  )
}

export default UserDetails
