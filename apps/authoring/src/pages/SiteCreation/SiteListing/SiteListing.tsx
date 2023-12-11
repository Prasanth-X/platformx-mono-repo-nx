import { Box, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router';
import SitePlaceholder from '../../../assets/site-placeholder.png';
import PeopleIcon from '../../../assets/svg/2PeopleIcon.svg';
import CopyIcon from '../../../assets/svg/CopyIcon.svg';
import EditIcon from '../../../assets/svg/Pencil.svg';
import Plus from '../../../assets/svg/Plus.svg';
import SettingIcon from '../../../assets/svg/settings.svg';
import { showToastSuccess } from '../../../components/toastNotification/toastNotificationReactTostify';
import { fetchMultisiteListing } from '../../../services/SiteSetting/SiteSetting.api';
import {
  capitalizeFirstLetter,
  getCurrentLang,
} from '../../../utils/helperFunctions';
import EmptyResult from './EmptyResult';
import {
  AddNewButton,
  SiteDesTypo,
  SiteDomainTypo,
  SiteLink,
  SiteNameBox,
  SiteNameTypo,
  SiteTypo,
  useSiteListingStyle,
} from './SiteListing.style';
import { SiteListingLoader } from './SiteListingLoader';

const SiteListing = () => {
  const navigate = useNavigate();
  const [datalist, setDatalist] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isFetchMore, setFetchMore] = useState(true);
  const ROWS = 20;
  const [viewMoreList, setViewMoreList] = useState(
    datalist.map(() => ({ isViewMore: false }))
  );
  const viewMoreChange = (index) => {
    const tempList = viewMoreList;
    tempList[index].isViewMore = !viewMoreList[index].isViewMore;
    setViewMoreList([...tempList]);
  };
  const classes = useSiteListingStyle();

  const copyDomainName = (domainName) => {
    navigator.clipboard.writeText(domainName);
    showToastSuccess(`${t('linkCopy')}`);
  };
  const generateDomain = (site) => {
    const domainName = site.domain_name.replace('.com.', '.com');
    return site.site_address
      ? `https://${site.site_address}.${domainName}`
      : `https://${domainName}`;
  };
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  const defaultSocialImage = `${gcpUrl}/${BucketName}/${defaultImage}`;
  const fetchMultiSiteListing = async (start = 0) => {
    try {
      const inputVariable = {
        pageFilter: 'ALL',
        pagination: {
          start: start,
          rows: ROWS,
        },
        sort: 'DESC',
      };
      const response: any = await fetchMultisiteListing({ ...inputVariable });

      if (response.authoring_getMultiSiteListItems) {
        setDatalist((prev) => [
          ...prev,
          ...response.authoring_getMultiSiteListItems,
        ]);
        if (response.authoring_getMultiSiteListItems?.length < ROWS) {
          setFetchMore(false);
        }
        const temp = response.authoring_getMultiSiteListItems.map(() => ({
          isViewMore: false,
        }));
        setViewMoreList((prev) => [...prev, ...temp]);
      }
    } catch (error) {
      console.log(error);
      setFetchMore(false);
    }
  };

  const fetchMore = () => {
    const nextIndex = startIndex + ROWS;
    setStartIndex(() => nextIndex);
    fetchMultiSiteListing(nextIndex);
  };

  const getUrl = (site) => {
    return `${process.env.REACT_APP_BASE_URL}/${
      site.site_title_url
    }/${getCurrentLang()}`;
  };

  const onDashBoardRedirect = (site) => {
    const dashboardUrl = `${getUrl(site)}/dashboard`;
    if (site?.status?.toLowerCase() == 'published') {
      window.open(dashboardUrl, '_self');
    }
    return;
  };

  useEffect(() => {
    fetchMultiSiteListing();
  }, []);

  return (
    <Box>
      {/* <Box>
        <SiteCreationHeader />
      </Box> */}

      <Box className={classes.container}>
        <Box className={classes.contentHeader}>
          <Box className={classes.headerBox}>
            {/* <Box
              className={classes.iconBox}
              component={'span'}
              onClick={() => navigate('/dashboard')}
            >
              <LongLeftArrow />
            </Box> */}
            <SiteTypo>{t('Sites')}</SiteTypo>
          </Box>
          <Box>
            <AddNewButton onClick={() => navigate('/sites/site-creation')}>
              <Box component='span' className={classes.createNewTypo}>
                {t('create_new')}
              </Box>
              <Box component='span' className={classes.plusIcon}>
                <img src={Plus} height={25} width={25} />
              </Box>
            </AddNewButton>
          </Box>
        </Box>
        {(datalist.length !== 0 || isFetchMore) && (
          <Box id='scrollableDiv' className={classes.scrollBox}>
            <InfiniteScroll
              dataLength={datalist.length}
              next={fetchMore}
              hasMore={isFetchMore}
              loader={<SiteListingLoader />}
              scrollableTarget='scrollableDiv'
              style={{ overflowX: 'hidden' }}
            >
              {datalist.length > 0 &&
                datalist.map((site, index) => {
                  const isNotPublished = !(
                    site?.status?.toLowerCase() === 'published'
                  );
                  return (
                    <Fragment key={`site${index + 1}`}>
                      <Box
                        sx={{
                          marginTop: index > 0 ? '20px' : '0',
                        }}
                        className={classes.imgBox}
                      >
                        <Grid container>
                          <Grid item xs={12} sm={2} md={2} lg={2}>
                            <Box
                              className={classes.imgContainer}
                              onClick={() => onDashBoardRedirect(site)}
                            >
                              <img
                                className={classes.siteImg}
                                src={
                                  site.header_logo
                                    ? `${process.env.REACT_APP_GCP_URL}/${process.env.REACT_APP_BUCKET_NAME}/${site.header_logo}`
                                    : SitePlaceholder
                                }
                                // src={SitePlaceholder}
                              />
                            </Box>
                          </Grid>
                          <SiteNameBox item xs={12} sm={8} md={8} lg={8}>
                            <SiteNameTypo> {site.site_title}</SiteNameTypo>
                            <Box className={classes.sitenameTypo}>
                              <Box
                                className={
                                  site?.status?.toLowerCase() == 'published'
                                    ? classes.statusPublish
                                    : site?.status?.toLowerCase() == 'draft'
                                    ? classes.statusDraft
                                    : classes.statusUnpublish
                                }
                              >
                                {capitalizeFirstLetter(site.status)}
                              </Box>
                              <SiteDomainTypo>
                                Domain:{' '}
                                <SiteLink
                                  className={classes.siteLinkType}
                                  href={generateDomain(site)}
                                  target='_blank'
                                >
                                  {`${generateDomain(site)?.replace(
                                    'https://',
                                    ''
                                  )}`}
                                </SiteLink>
                                <IconButton
                                  onClick={() =>
                                    copyDomainName(generateDomain(site))
                                  }
                                  aria-label='copy domain name'
                                >
                                  <img src={CopyIcon} width={18} height={18} />
                                </IconButton>
                              </SiteDomainTypo>
                            </Box>
                            <SiteDesTypo>
                              <Box
                                component='span'
                                className={classes.siteDesSmUp}
                              >
                                {site.about_site}
                              </Box>
                              {viewMoreList[index] && (
                                <Box
                                  component='span'
                                  className={classes.siteDesSx}
                                >
                                  <>
                                    {viewMoreList[index].isViewMore ? (
                                      <>{`${site.about_site} `}</>
                                    ) : (
                                      <>{`${site.about_site.slice(0, 50)}`}</>
                                    )}
                                    {site.about_site.length > 50 && (
                                      <Box
                                        onClick={() => viewMoreChange(index)}
                                        component='span'
                                        sx={{ color: '#4B9EF9' }}
                                      >
                                        {viewMoreList[index].isViewMore
                                          ? `View Less`
                                          : ` View More...`}
                                      </Box>
                                    )}
                                  </>
                                </Box>
                              )}
                            </SiteDesTypo>
                          </SiteNameBox>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            lg={2}
                            className={classes.settingIconBox}
                          >
                            <Stack
                              direction='row'
                              spacing={2}
                              sx={{
                                justifyContent: {
                                  xs: 'flex-start',
                                  md: 'flex-end',
                                },
                              }}
                            >
                              <Tooltip
                                title={t('Update')}
                                placement='top'
                                enterTouchDelay={0}
                              >
                                <IconButton
                                  onClick={() =>
                                    navigate(
                                      `/sites/site-creation/${site.site_title_url}`
                                    )
                                  }
                                >
                                  <img src={EditIcon} />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                title={t('User Management')}
                                placement='top'
                                enterTouchDelay={0}
                              >
                                <IconButton
                                  onClick={() =>
                                    window.open(
                                      `${getUrl(
                                        site
                                      )}/user-management/user-list`,
                                      '_self'
                                    )
                                  }
                                  disabled={isNotPublished}
                                  className={
                                    isNotPublished ? classes.opacity : ''
                                  }
                                >
                                  <img src={PeopleIcon} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title={t('Settings')}
                                placement='top'
                                enterTouchDelay={0}
                              >
                                <IconButton
                                  onClick={() =>
                                    window.open(
                                      `${getUrl(
                                        site
                                      )}/site-setting/global-setting`,
                                      '_self'
                                    )
                                  }
                                  disabled={isNotPublished}
                                  className={
                                    isNotPublished ? classes.opacity : ''
                                  }
                                >
                                  <img src={SettingIcon} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </Fragment>
                  );
                })}
            </InfiniteScroll>
          </Box>
        )}
        {datalist.length === 0 && !isFetchMore && <EmptyResult />}
      </Box>
    </Box>
  );
};

export default SiteListing;
