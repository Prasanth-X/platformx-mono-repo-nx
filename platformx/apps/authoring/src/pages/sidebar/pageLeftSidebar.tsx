import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/platform-x-logo.png';
import { MiniHeader } from '../../components/Header/MiniHeader';
import PlateformXDialog from '../../components/Modal';
import { saveWarningMessage } from './Helper';
import { leftSideBarContent } from './menus';
import { mainStyle } from './sidebar.style';
import SidebarMenus from './SidebarMenus';
import { PageTypesList } from './types';

export default function PageLeftSidebar({
  handleSelectedType,
  setIsSideMenuOpen,
}: PageTypesList) {
  const { t } = useTranslation();
  const searchPageUrl = new URL(window.location.href);
  const [defaultPageState, setDefaultPageState] = useState(
    searchPageUrl?.pathname
  );

  const [selectedType, setSelectedType] = useState<string>(
    searchPageUrl.searchParams.get('searchCat')
      ? (searchPageUrl.searchParams.get('searchCat') as string)
      : 'All'
  );

  const navigate = useNavigate();

  const [hasSaveWarning, setHasSaveWarning] = React.useState<boolean>(false);

  const { saveWarnTitle, saveWarnSubtitle, saveWarnSave, saveWarnReject } =
    saveWarningMessage;

  const handlePageList = (item) => {
    if (handleSelectedType) handleSelectedType(item);
  };

  const handlePagesType = (item) => {
    setSelectedType(item.name);
    handlePageList(item);
    setIsSideMenuOpen(false);
  };

  const handleClick = (url: any) => {
    if (
      url !== defaultPageState &&
      url !== '/content' &&
      url !== '/post' &&
      url !== '/event' &&
      url !== '/user-management' &&
      url !== '/dashboard'&&
      url !== '/site-setting'
    ) {
      navigate(url);
    } else {
      setDefaultPageState(url);
    }
  };

  /**
   *
   * @param arrayData array
   */
  const useStyles = makeStyles(() => ({
    expanded: { '& svg': { transform: 'rotate(270deg)' } },
    content: {
      margin: '15px 0 ',
      '&$expanded': {
        margin: '15px 0 ',
      },
    },
  }));

  const onCloseSaveWarningHandler = () => {
    setHasSaveWarning(false);
  };
  const unsavedCrossButtonHandle = () => {
    setHasSaveWarning(false);
  };

  return (
    <>
      <style>{mainStyle}</style>
      <Box
        sx={{
          width: { sm: '150px', md: '180px', lg: '250px' },
          height: '100vh',
          display: 'flex',
          background: '#fbfaff',
          borderRight: '1px solid #e6eaed',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box
            sx={{
              display: { xs: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 18px',
              borderBottom: '1px solid #e6eaed',
            }}
          >
            <Box
              onClick={() => navigate('/dashboard')}
              sx={{ cursor: 'pointer', display: 'flex' }}
            >
              <img src={Logo} height='30' />
            </Box>

            <Box
              onClick={() => {
                setIsSideMenuOpen(false);
              }}
              sx={{
                display: { md: 'none', xs: 'flex' },
                color: '#89909a',
              }}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                maxHeight: 'calc(100vh - 130px)',
                padding: '10px 18px',
                overflowY: 'auto',
              }}
            >
              {leftSideBarContent?.map((item, index) => {
                return (
                  <SidebarMenus
                    id={item.id}
                    url={item.url}
                    index={index}
                    roles={item.roles}
                    name={t(item.name)}
                    subMenus={item.subMenus}
                    selectedType={selectedType}
                    setDefaultPageState={setDefaultPageState}
                    handlePagesType={handlePagesType}
                    defaultPageState={defaultPageState}
                    contentType={item.contentType}
                    key={item.name}
                  ></SidebarMenus>
                );
              })}
            </Box>
            {hasSaveWarning ? (
              <PlateformXDialog
                isDialogOpen={hasSaveWarning}
                title={saveWarnTitle}
                subTitle={saveWarnSubtitle}
                closeButtonText={saveWarnReject}
                confirmButtonText={saveWarnSave}
                confirmButtonHandle={onCloseSaveWarningHandler}
                closeButtonHandle={() => handleClick}
                crossButtonHandle={unsavedCrossButtonHandle}
                modalType='unsavedChanges'
              />
            ) : null}
          </Box>
        </Box>
        <div className='authorwp'>
          <MiniHeader />
        </div>
      </Box>
    </>
  );
}
