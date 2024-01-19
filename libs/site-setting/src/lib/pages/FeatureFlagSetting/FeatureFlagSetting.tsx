import { Box, Grid, Typography, Divider } from '@mui/material'
import { t } from 'i18next'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './FeatureFlagSetting.style'
import {
  ThemeConstants,
  TitleSubTitle,
  BasicSwitch,
  CommonBoxWithNumber,
} from '@platformx/utilities'

export const FeatureFlagSetting = () => {
  const [feature, setFeature] = useState({
    personalisation: false,
    google_analytics_tracking: false,
    article: false,
    quiz: false,
    poll: false,
    vod: false,
    snowplow_tracking: false,
  })
  const classes = useStyles()
  const navigate = useNavigate()
  const onSaveClick = async () => {
    // setIsLoading(true);
  }
  const handleChange = (name) => {
    setFeature((prev) => ({ ...prev, [name]: !prev[name] }))
  }
  const masterControl = () => {
    setFeature((feature) => {
      const istrue =
        feature.article || feature.quiz || feature.vod || feature.poll
      return {
        ...feature,
        article: !istrue,
        vod: !istrue,
        quiz: !istrue,
        poll: !istrue,
      }
    })
  }

  return (
    <>
      {/* <SiteTopBar
        siteLabel={t('feature_flag_setting')}
        returnBack={() => {
          navigate('/dashboard');
        }}
        onSaveClick={onSaveClick}
      /> */}
      <Divider/>
      <Box className={classes.pageContainer}>
        <Box className={classes.contentContainer}>
          <Box>
            <CommonBoxWithNumber
              number="01"
              title={t('feature_flag_setting')}
              subTitle={t('subhead')}
              titleVarient="p3semibold"
              subTitleVarient="p4regular"
            >
              <Box className={classes.informativeContentContainer}>
                <Grid container className={classes.contentContainer}>
                  <Grid item xs={5} sm={5} md={5}>
                    <TitleSubTitle
                      title={t('personalisation')}
                      subTitle={t('analytics_info_toast')}
                      titleVariant="h6medium"
                      subTitleVariant="h7regular"
                    />
                  </Grid>
                  <Grid item xs={7} sm={7} md={7}>
                    <BasicSwitch
                      checked={feature.personalisation}
                      color={ThemeConstants.BLACK_COLOR}
                      onChange={() => handleChange('personalisation')}
                    />
                  </Grid>
                </Grid>

                <Grid container className={classes.contentContainer}>
                  <Grid item xs={5} sm={5} md={5}>
                    <TitleSubTitle
                      title={t('google_analytics_tracking')}
                      subTitle={t('analytics_info_toast')}
                      titleVariant="h6medium"
                      subTitleVariant="h7regular"
                    />
                  </Grid>
                  <Grid item xs={7} sm={7} md={7}>
                    <BasicSwitch
                      checked={feature.google_analytics_tracking}
                      onChange={() => handleChange('google_analytics_tracking')}
                      color={ThemeConstants.BLACK_COLOR}
                    />
                  </Grid>
                </Grid>

                <Grid container className={classes.contentContainer}>
                  <Grid item xs={5} sm={5} md={5}>
                    <TitleSubTitle
                      title={t('share_with_sites')}
                      subTitle={t('analytics_info_toast')}
                      titleVariant="h6medium"
                      subTitleVariant="h7regular"
                    />
                  </Grid>

                  <Grid item xs={7} sm={7} md={7}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                          <BasicSwitch
                            checked={
                              feature.article ||
                              feature.quiz ||
                              feature.vod ||
                              feature.poll
                            }
                            onChange={() => masterControl()}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                          <Box className={classes.subtitle}>
                            <Typography
                              variant="h5regular"
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {t('master_control')}
                            </Typography>
                            <Typography
                              variant="h7regular"
                              sx={{ textTransform: 'capitalize' }}
                            >
                              {t('master_control')}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                          <BasicSwitch
                            checked={feature.article}
                            onChange={() => handleChange('article')}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                          <Typography
                            variant="h5regular"
                            className={classes.subtitle2}
                          >
                            {t('article')}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                          <BasicSwitch
                            checked={feature.quiz}
                            onChange={() => handleChange('quiz')}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                          <Typography
                            variant="h5regular"
                            className={classes.subtitle2}
                          >
                            {t('quiz')}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                          <BasicSwitch
                            checked={feature.vod}
                            onChange={() => handleChange('vod')}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                          <Typography
                            variant="h5regular"
                            className={classes.subtitle2}
                          >
                            {t('vod')}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex' }}>
                          <BasicSwitch
                            checked={feature.poll}
                            onChange={() => handleChange('poll')}
                            color={ThemeConstants.BLACK_COLOR}
                          />
                          <Typography
                            variant="h5regular"
                            className={classes.subtitle2}
                          >
                            {t('poll')}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container className={classes.contentContainer}>
                  <Grid item xs={5} sm={5} md={5}>
                    <TitleSubTitle
                      title={t('snowplow_tracking')}
                      subTitle={t('analytics_info_toast')}
                      titleVariant="h6medium"
                      subTitleVariant="h7regular"
                    />
                  </Grid>
                  <Grid item xs={7} sm={7} md={7}>
                    <BasicSwitch
                      checked={feature.snowplow_tracking}
                      onChange={() => handleChange('snowplow_tracking')}
                      color={ThemeConstants.BLACK_COLOR}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CommonBoxWithNumber>
          </Box>
        </Box>
      </Box>
    </>
  )
}
