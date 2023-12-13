import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import Loader from '../../Common/Loader';
import NoSearchResult from '../../Common/NoSearchResult';
import SitePlaceholder from '../../assets/site-placeholder.png';
import {
  SiteDesTypo,
  SiteDomainTypo,
  SiteLink,
  SiteNameBox,
  SiteNameTypo,
  useSiteListingStyle,
} from '../../pages/SiteCreation/SiteListing/SiteListing.style';
import {
  capitalizeFirstLetter,
  getCurrentLang,
} from '../../utils/helperFunctions';
import PlateformXDialog from '../Modal';

const CardListing = ({
  selectedItem,
  contentType,
  sitelist,
  duplicateToSite,
  titledata,
  onClose,
}) => {
  const navigate = useNavigate();
  const [sitename, setSitename] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [filteredSiteList, setFilteredSiteList] = useState(sitelist);
  const searchQuery = useRef('');

  const classes = useSiteListingStyle();
  const [duplicateTitle, setDuplicateTitle] = useState('');

  const gcpUrl = process.env.NX_GCP_URL;
  const BucketName = process.env.NX_BUCKET_NAME;
  const defaultImage = process.env.NX_DEFAULT_IMAGE;
  const defaultSocialImage = `${gcpUrl}/${BucketName}/${defaultImage}`;

  const handleBoxHover = (index) => {
    setHoveredIndex(index);
  };

  const handleBoxClick = (index, site_title_url) => {
    setSitename(site_title_url);
    setClickedIndex(index);
  };
  const handleNextClick = () => {
    setIsLoading(true);
    if (sitename && sitename !== '') {
      duplicateToSite(false, titledata, selectedItem, sitename)
        .then((res) => {
          setDuplicateTitle(titledata);
          setIsLoading(false);
          const message = res?.data?.authoring_createContent?.message;
          message && setShowSuccessPopup(true);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };
  const closeButtonClick = () => {
    setShowSuccessPopup(false);
    onClose();
  };
  const siteName = `https://${sitename}.hcl-x.com/`;
  const subTitle = `${t('draft_site_success')} ${siteName}`;

  function createUrlFromTitle(title: string): string {
    const lowercaseTitle = title?.toLowerCase();
    const urlFriendlyTitle = lowercaseTitle
      ?.replace(/\s+/g, '-')
      ?.replace(/[^a-z0-9-]/g, '');
    return urlFriendlyTitle;
  }

  const handleInputChange = (event) => {
    const text = event.target.value;
    searchQuery.current = text;
    //setSearchText(text);
    // Filter the site list based on site_title
    const filteredList = sitelist.filter((site) =>
      site.site_title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSiteList(filteredList);
  };

  const handleClear = () => {
    searchQuery.current = '';
    setFilteredSiteList(sitelist);
  };

  return (
    <Box>
      {isLoading && <Loader />}
      <Box className={classes.container}>
        <Box
          className={classes.contentHeader}
          sx={{ marginTop: { xs: '50px', md: '0px' } }}
        >
          <Box className={classes.headerBox}>
            <Box component="span"></Box>
            <Typography variant="h5bold">{t('select_the_site')}</Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box
              component="span"
              className={classes.cancelBtn}
              onClick={onClose}
            >
              {t('cancel')}
            </Box>
            <Box
              component="span"
              className={classes.doneBtn}
              onClick={handleNextClick}
            >
              {t('done')}
            </Box>
          </Box>
        </Box>
        <Box className={classes.siteSearchBox}>
          <TextField
            placeholder="Search for Sites"
            variant="outlined"
            onChange={handleInputChange}
            value={searchQuery.current}
            InputProps={{
              startAdornment: (
                <IconButton edge="start">
                  <SearchIcon />
                </IconButton>
              ),
              endAdornment: searchQuery.current && (
                <IconButton edge="end" onClick={handleClear}>
                  <CloseRoundedIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box className={classes.SiteShareScrollBox}>
          <Box className={classes.itemBoxWrap}>
            {filteredSiteList.length > 0 &&
              filteredSiteList.map((site, index) => (
                <Fragment key={`site${index + 1}`}>
                  <Box
                    className={classes.itemBox}
                    onMouseEnter={() => handleBoxHover(index)}
                    onMouseLeave={() => handleBoxHover(null)}
                    onClick={() => handleBoxClick(index, site.site_title_url)}
                    sx={{
                      //   border: index === hoveredIndex ? '1px solid #4E4B66' : '', // Border on hover
                      border: index === clickedIndex ? '1px solid #4E4B66' : '', // Border on click
                      marginTop: index > 0 ? '20px' : '0',
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sm={2} md={2} lg={2}>
                        <Box className={classes.imgContainer}>
                          <img
                            className={classes.siteImg}
                            src={
                              site.header_logo
                                ? `${process.env.NX_GCP_URL}/${process.env.NX_BUCKET_NAME}/${site.header_logo}`
                                : SitePlaceholder
                            }
                            //src={SitePlaceholder}
                            onClick={() =>
                              navigate(
                                `/sites/site-creation/${site.site_title}`
                              )
                            }
                          />
                        </Box>
                      </Grid>
                      <SiteNameBox item xs={12} sm={10} md={10} lg={10}>
                        <SiteNameTypo> {site.site_title}</SiteNameTypo>

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
                            href={`https://${
                              site.site_address
                            }.${site.domain_name.replace('.com.', '.com')}`}
                            target="_blank"
                          >{`${site.site_address}.${site.domain_name.replace(
                            '.com.',
                            '.com'
                          )}`}</SiteLink>
                        </SiteDomainTypo>

                        <SiteDesTypo>
                          <Box component="span" className={classes.siteDesSmUp}>
                            {site.about_site}
                          </Box>
                        </SiteDesTypo>
                      </SiteNameBox>
                    </Grid>
                  </Box>
                </Fragment>
              ))}
            {filteredSiteList.length == 0 && <NoSearchResult />}
          </Box>
        </Box>
      </Box>
      {showSuccessPopup ? (
        <PlateformXDialog
          isDialogOpen={showSuccessPopup}
          title={t('save_as_draft')}
          subTitle={subTitle}
          closeButtonText={t('skip')}
          confirmButtonText={t('edit_draft')}
          closeButtonHandle={closeButtonClick}
          confirmButtonHandle={() =>
            window.open(
              `${
                process.env.NX_BASE_URL
              }/${sitename}/${getCurrentLang()}/content/create-${contentType?.toLowerCase()}?path=${createUrlFromTitle(
                duplicateTitle
              )}`,
              '_self'
            )
          }
          crossButtonHandle={closeButtonClick}
          modalType="draft"
        />
      ) : null}
    </Box>
  );
};

export default CardListing;
