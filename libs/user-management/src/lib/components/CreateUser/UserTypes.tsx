import { Box, Grid, RadioGroup } from '@mui/material'
import {
  CommonBoxWithNumber,
  RadioControlLabel,
  TitleSubTitle,
} from '@platformx/utilities'
import React from 'react'
import { useCustomStyle } from './UserTypes.styles'

export default function UserTypes({
  t,
  state,
  setState,
  setRoleSelected,
  isEditMode,
}: any) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === t('end_user')) {
      setState((prevState: any) => {
        return {
          ...prevState,
          role: '',
          is_Authoring_User:
            (event.target as HTMLInputElement).value === t('authoring_user'),
          is_Rendering_User:
            (event.target as HTMLInputElement).value === t('end_user'),
        }
      })
      setRoleSelected('')
    } else {
      setState((prevState: any) => {
        return {
          ...prevState,
          is_Authoring_User:
            (event.target as HTMLInputElement).value === t('authoring_user'),
          is_Rendering_User:
            (event.target as HTMLInputElement).value === t('end_user'),
          is_Community_User: false,
        }
      })
    }
  }
  const classes = useCustomStyle()
  return (
    <Box className={classes.mainStyleWrapper} id="userTypes">
      <CommonBoxWithNumber
        number="01"
        title={t('user_types')}
        titleVarient="p3semibold"
        subTitleVarient="p4regular"
        subTitle={t('subhead')}
      >
        <Grid container>
          <Grid item xs={12} sm={5} md={5} lg={5} className="leftFiledLast">
            <TitleSubTitle
              title={`${t('choose_user_type')}*`}
              subTitle={`${t('sub_title')} ${t('user_types')}`}
              titleVarient="h6medium"
              subTitleVarient="h7regular"
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="textFiledLast">
            <RadioGroup
              name="page-radio-buttons-group"
              value={
                state.is_Authoring_User ? t('authoring_user') : t('end_user')
              }
              onChange={handleRadioChange}
              row
            >
              <RadioControlLabel
                disabled={isEditMode.current ? true : false}
                value={t('authoring_user')}
              />
              <RadioControlLabel
                disabled={isEditMode.current ? true : false}
                value={t('end_user')}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  )
}
