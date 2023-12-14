import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CardListing from './cardListing';
import { getSelectedSite } from '../../utils/helperFunctions';
import { SiteDesTypo, SiteDomainTypo, SiteLink, SiteNameBox, SiteNameTypo, useSiteListingStyle } from '../../pages/SiteCreation/SiteListing/SiteListing.style';
//import { DialogList } from '../../utils/embedTypes';

export type DialogList = {
    isDialogOpen? : boolean;
    closeButtonHandle? : any;
    selectedContent? : any;
    contentType? : any;
    sitelist: any;
    duplicateToSite?: any;
    titledata?: any;
  };

export default function ShareContentWithSiteDialog({
  isDialogOpen,
  closeButtonHandle,
  contentType,
  sitelist,
  duplicateToSite,
  titledata,
  selectedContent
}: DialogList) {
  const selectedSite = getSelectedSite();
  const classes = useSiteListingStyle();
  // Function to remove items based on site_title_url
function removeSiteByTitle(title) {
  return sitelist.filter(site => site.site_title_url !== title);
}
const updatedSiteList = removeSiteByTitle(selectedSite);

  return (
    <Box className='embedmodal'>
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          sx: {
            maxWidth: { xs: '97%', sm: '1080px' },
            width: '97%',
            margin: { xs: '0px' },
            overflow: 'hidden',
          },
        }}
        sx={{
          display: { xs: 'block', md: 'block' },
        }}
      >
        <Box
          className={classes.cardListingDialog}
        >
          {/* <Box
            sx={{ textAlign: 'right', cursor: 'pointer', zIndex: '99999' }}
            mt={1}
            mr={3}
            onClick={closeButtonHandle}
          >
            <CloseIcon />
          </Box> */}
        </Box>
       {sitelist?.length > 0 && 
       <CardListing 
       selectedItem={selectedContent} 
       contentType={contentType} 
       sitelist={updatedSiteList} 
       duplicateToSite={duplicateToSite}
       titledata={titledata}
       onClose={closeButtonHandle}
       />}
      </Dialog>
    </Box>
  );
}