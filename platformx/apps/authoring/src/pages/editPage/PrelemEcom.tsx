import React, { useState } from 'react';
import { Button, Typography, Box, Tooltip } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ThemeConstants from '../../theme/variable';
import { useTranslation } from 'react-i18next';

interface Props {
  index: string;
  EcomHandle: IEcomHandle;
  handleSave(sectionToUpdate: string, data: SavedData, index: string): void;
  sectionToUpdate?: string;
}
interface IEcomHandle {
  ApiEndPoint: string;
  OauthEndPoint: string;
  Username: string;
  Password: string;
}
interface SavedData {
  apiEndPoint: string;
  oauthEndPoint: string;
  userName: string;
  password: string;
}

const PrelemEcom: React.FC<Props> = ({
  index,
  EcomHandle,
  handleSave,
  sectionToUpdate = 'EcomHandle',
}) => {
  const { ApiEndPoint, OauthEndPoint, Username, Password } = EcomHandle;
  const [apiEndPoint, setApiEndPoint] = useState(ApiEndPoint);
  const [oauthEndPoint, setOuthEndPoint] = useState(OauthEndPoint);
  const [userName, setUserName] = useState(Username);
  const [password, setPassword] = useState(Password);

  const savedData = {
    apiEndPoint: apiEndPoint,
    oauthEndPoint: oauthEndPoint,
    userName: userName,
    password: password,
  };
  const { t } = useTranslation();
  return (
    <AccordionDetails>
      {
        <>
          <Box key={`${index  }_content`}>
            <Typography variant="subtitle1" mb={1}>
              {t('ecom_prelem_setting_text1')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className="drawer-label"
            >
              {t('ecom_prelem_setting_text2')}
              <Tooltip
                title={
                  <Box m={1}>
                    <Typography
                      sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                      mb={1}
                    >
                      {t('ecom_prelem_setting_text3')}
                    </Typography>
                  </Box>
                }
                placement="right"
              >
                <Box>
                  <InfoOutlinedIcon
                    sx={{
                      marginLeft: '10px',
                      '&:hover': {
                        color: '#fd0c0d',
                      },
                    }}
                  />
                </Box>
              </Tooltip>
            </Typography>
            <TextField
              multiline
              value={apiEndPoint}
              error={apiEndPoint?.length === 0}
              onChange={(e: any) => setApiEndPoint(e.target.value)}
              // variant="standard"
              placeholder="API Endpoint"
              inputProps={{ maxLength: 250 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
                margin: '10px',
              }}
            />
            <Typography
              variant="subtitle1"
              placeholder="Ecom"
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className="drawer-label"
            >
              {t('ecom_prelem_setting_text4')}
            </Typography>
            <TextField
              multiline
              value={oauthEndPoint}
              error={oauthEndPoint?.length === 0}
              onChange={(e: any) => setOuthEndPoint(e.target.value)}
              // variant="standard"
              placeholder="O Auth Endpoint"
              inputProps={{ maxLength: 250 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
                margin: '10px',
              }}
            />
            <Typography
              variant="subtitle1"
              placeholder="Ecom"
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className="drawer-label"
            >
              {t('ecom_prelem_setting_text5')}
            </Typography>
            <TextField
              multiline
              value={userName}
              error={userName?.length === 0}
              onChange={(e: any) => setUserName(e.target.value)}
              // variant="standard"
              placeholder="User Name"
              inputProps={{ maxLength: 100 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
                margin: '10px',
              }}
            />
            <Typography
              variant="subtitle1"
              placeholder="Ecom"
              sx={{ display: 'flex', alignimageInstances: 'center' }}
              className="drawer-label"
            >
              {t('ecom_prelem_setting_text6')}
            </Typography>
            <TextField
              type="password"
              value={password}
              error={password?.length === 0}
              onChange={(e: any) => setPassword(e.target.value)}
              // variant="standard"
              placeholder="Password"
              inputProps={{ maxLength: 100 }}
              sx={{
                width: '100%',
                '.Platform-x-Input-root:after': {
                  borderBottom: '1px solid #000000',
                },
                margin: '10px',
              }}
            />
            <Button
              variant="contained"
              disabled={
                apiEndPoint?.length === 0 ||
                oauthEndPoint?.length === 0 ||
                userName?.length === 0 ||
                password?.length === 0
              }
              sx={{
                backgroundColor: ThemeConstants.BLACK_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                },
              }}
              onClick={() => handleSave(sectionToUpdate, savedData, index)}
            >
              {t('ecom_prelem_setting_text7')}
            </Button>
          </Box>
        </>
      }
    </AccordionDetails>
  );
};
export default PrelemEcom;
