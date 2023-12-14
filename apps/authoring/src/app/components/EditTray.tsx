import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Icons from './Icons';

interface Props {
  listIndx: string;
  showIconsState: object;
  showMenu: boolean;
  handleClick(prelemIndex: string, operation: string): void;
}
const EditTray: React.FC<Props> = ({
  listIndx,
  showIconsState,
  showMenu,
  handleClick,
}) => {
  const trayContent: ReactNode[] = [];
  const styleobj = {
    '& svg': {
      fontSize: { xs: '20px', sm: '20px', md: '20px', lg: '25px' },
    },
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const expandStyleobj = {
    '& svg': {
      fontSize: { xs: '20px', sm: '20px', md: '20px', lg: '25px' },
    },
    color: showMenu ? '#FC4529' : '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  function createButtonIcon(
    icon: string,
    nameIcon: string,
    enableStatus: boolean
  ): React.ReactNode {
    return (
      <Icons
        key={`${icon  }:${  listIndx}`}
        listIndx={listIndx}
        styleObject={styleobj}
        nameIcon={nameIcon}
        enable={enableStatus}
        handleClick={handleClick}
      />
    );
  }
  //Forming try content based on object passed down
  Object.keys(showIconsState).map((icon) => {
    if (icon == 'showCreate') {
      trayContent.push(
        <Icons
          key={`${icon  }:${  listIndx}`}
          listIndx={listIndx}
          nameIcon='edit'
          styleObject={styleobj}
          enable={showIconsState[icon]}
          handleClick={handleClick}
        />
      );
    } else if (icon == 'showSpace') {
      trayContent.push(
        <Icons
          key={`${icon  }:${  listIndx}`}
          listIndx={listIndx}
          nameIcon='expand'
          styleObject={expandStyleobj}
          enable={showIconsState[icon]}
          handleClick={handleClick}
        />
      );
    } else if (icon == 'showVisible' && !showIconsState[icon]) {
      trayContent.push(
        createButtonIcon(icon, 'visibility', !showIconsState[icon])
      );
    } else if (icon == 'showVisible' && showIconsState[icon]) {
      trayContent.push(
        createButtonIcon(icon, 'visibilityOff', showIconsState[icon])
      );
    } else if (icon == 'showCopy') {
      trayContent.push(createButtonIcon(icon, 'copy', showIconsState[icon]));
    } else if (icon == 'showUp') {
      trayContent.push(createButtonIcon(icon, 'up', showIconsState[icon]));
    } else if (icon == 'showDown') {
      trayContent.push(createButtonIcon(icon, 'down', showIconsState[icon]));
    } else if (icon == 'showReset') {
      trayContent.push(createButtonIcon(icon, 'reset', showIconsState[icon]));
    } else if (icon == 'showDelete') {
      trayContent.push(createButtonIcon(icon, 'delete', showIconsState[icon]));
    } else if (icon == 'showSettings') {
      trayContent.push(
        createButtonIcon(icon, 'settings', showIconsState[icon])
      );
    }
  });
  /*Setting container of edit tray icons*/
  return (
    <Box
      key={`${listIndx  }tray`}
      sx={{
        backgroundColor: 'white',
        // zIndex: 'modal',
        position: 'absolute',
        top: { xs: '4%', md: '8%', lg: '8%' },
        right: { xs: '4%', md: '1%', lg: '5%' },
        maxWidth: { xs: '40px', lg: '400px' },
        display: 'flex',
        flexWrap: { xs: 'wrap' },
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: { xs: '32vh', lg: '4vh' },
        borderRadius: 2,
        zIndex: { xs: 1 },
      }}
    >
      {trayContent}
    </Box>
  );
};
export default EditTray;
