import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { fbGray, inGray, inGreen, fbGreen } from "@platformx/utilities"

const SocialShareStep1 = ({ selectedSocial, setSelectedSocial }: any) => {
  const { t } = useTranslation();
  const handelNetworkSelect = (network: any) => {
    setSelectedSocial({
      ...selectedSocial,
      [network]: !selectedSocial[network],
    });
  };

  return (
    <Box>
      <Grid>
        {/* <Grid item xs={6}></Grid> */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              // padding: {
              //   xs: '150px 0px 0px 50px',
              //   md: '20px 0px 20px 10px',
              // },
              // marginLeft: {xs: '0', md:'60px'},
              textAlign: { xs: 'center', md: 'initial' },
            }}
          >
            <Box sx={{ width: { md: '250px' } }}>
              <Typography variant="h3medium">{t('network')}</Typography>
            </Box>
            <Box
              sx={{
                marginTop: { xs: '25px', md: '23px' },
                marginBottom: { xs: '225px', md: '0px' },
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
                // marginLeft: { xs: '110px', md: '0px' },
              }}
            >
              <Box
                sx={{
                  cursor: 'pointer',
                  paddingRight: '20px',
                }}
                onClick={() => handelNetworkSelect('fb')}
              >
                <img
                  src={selectedSocial?.fb ? fbGreen : fbGray}
                  alt="Facbook"
                />
              </Box>
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'none',
                }}
                onClick={() => handelNetworkSelect('in')}
              >
                <img
                  src={selectedSocial?.in ? inGreen : inGray}
                  alt="Linedin"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SocialShareStep1;
