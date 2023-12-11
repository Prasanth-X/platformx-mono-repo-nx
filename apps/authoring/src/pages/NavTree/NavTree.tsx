import { useLazyQuery, useMutation } from '@apollo/client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SettingIcon from '../../assets/svg/settingIcon.svg';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import '../../layouts/Dashboardlayout/component/Header/Header.css';
import {
  delete_menu,
  fetch_menu_list,
  menu_reorder,
  publish_menu,
  update_menu,
} from '../../services/navTree/navTree.api';
import { Store } from '../../store/ContextStore';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { updateInitialState } from './Actions';
import DeleteDialog from './DeleteDialog';
import { Drag, DragAndDrop, Drop } from './drag-and-drop';
import { updateMainMenuScoreAndReorder } from './helper';
import './styles.css';
import { MenulistProps } from './utils/types';
interface ProductType {
  name: string;
  icon?: any;
}
interface ContentType {
  name: string;
  url: string;
  icon?: any;
}
interface ProductTypeList {
  handleSelectedType: (data: ProductType) => void;
}

interface MenupublishedProps {
  Title?: any;
  Menu_Id?: any;
  ParentId?: any;
}
export default function NavTree({
  handleSelectedType,
  setEditData,
  setOpenCreateMenu,
  editDone,
  setisedit,
  isConfirm,
  setIsCreate,
}) {
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
  const [value, setValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const { state, dispatch } = useContext(Store);
  const { datamenu } = state;
  const [leftSideBarContent, setLeftSideContent] = useState(
    state.navTree?.navTreeArray
  );
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const [openRenameDialog, setRenameDialog] = useState(false);
  const [rename, setRename] = useState('');
  const [listSubMenu, setListSubMenu] = useState<null | HTMLElement>(null);
  const [subMenu, setSubMenu] = React.useState('');
  const openListMenu = Boolean(listMenu);
  const openListSubMenu = Boolean(listSubMenu);
  const [currentButton, setCurrentButton] = React.useState(null);
  const [hideClicked, setHideClicked] = React.useState(false);
  const [hideTextId, setHideTextId] = React.useState(0);
  const [a, setA] = React.useState([hideTextId]);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [items, setItem] = useState([]);
  const [mutateDeleteMenu] = useMutation(delete_menu);
  const [mutateReOrderMenu] = useMutation(menu_reorder);
  const [selectedItem, setSelectedItem] = useState<MenulistProps>();
  const [updatemutate] = useMutation(update_menu);
  const [runFetchMenuList] = useLazyQuery(fetch_menu_list);
  const [publishmutate] = useMutation(publish_menu);
  const [row, setRow] = useState(state.navTree?.navTreeArray?.length);
  const [isrenamed, setIsrenamed] = useState(false);
  const [isDeleteDialog, setisdeleteDialog] = useState(false);
  const reorderMenu: any = JSON.parse(JSON.stringify(leftSideBarContent));
  const menuCount = useRef(0);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const newMenu = useRef<any>([]);
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const [isLoaded, setIsLoaded] = useState(false);
  const [menus, setMenus] = useState<any>();
  const [menuToPublish, setMenuToPublish] = useState<
    {
      Title: string;
      Menu_Id: string;
      ParentId: string;
    }[]
  >([]);
  const handleListClose = () => {
    setListMenu(null);
    setCurrentButton(null);
    setTimeout(() => {
      menuCount.current = 0;
    }, 500);
  };
  const handleSubListClose = () => {
    setListSubMenu(null);
  };
  const handleChangeSetMenu = (event) => {
    setSubMenu(event.target.value);
  };
  const handleListClick = (event: React.MouseEvent<HTMLElement>, itemList) => {
    event.stopPropagation();
    setListMenu(event.currentTarget);
    setSelectedItem(itemList);
    if (itemList.ParentId === '0') {
      for (let i = 0; i < leftSideBarContent.length; i++) {
        if (leftSideBarContent[i].ParentId === itemList.Menu_Id) {
          menuCount.current++;
        }
      }
    }
  };
  const handleSubListClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setListSubMenu(event.currentTarget);
    // setSelectedArticle(selectedArticle);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    // const sortedNavtreeArray=state.navTree?.navTreeArray.sort((currentItem,nextItem)=>currentItem.Score - nextItem.Score);
    // setLeftSideContent(sortedNavtreeArray);
    setLeftSideContent(state.navTree?.navTreeArray);
    setMenuToPublish([]);
    state.navTree?.navTreeArray.map((values) => {
      // setMenuToPublish(prevEmployees => [
      //     ...prevEmployees,{"Title": values.Title, "Menu_Id":values.Menu_Id,"ParentId": values.ParentId }]);
      if (values.ParentId == '0') {
        setMenuToPublish((prevEmployees) => [
          ...prevEmployees,
          {
            Title: values.Title,
            Menu_Id: values.Menu_Id,
            ParentId: values.ParentId,
          },
        ]);
      }

      state.navTree?.navTreeArray.map((value1) => {
        if (value1.ParentId == values.Menu_Id) {
          setMenuToPublish((prevEmployees) => [
            ...prevEmployees,
            {
              Title: value1.Title,
              Menu_Id: value1.Menu_Id,
              ParentId: value1.ParentId,
            },
          ]);
        }
      });
    });
  }, [state.navTree?.navTreeArray]);
  const onButtonClicked = (id) => {
    setIsOpen(!isOpen);
    if (currentButton === id) {
      setCurrentButton(null);
    } else {
      setCurrentButton(id);
      setHideTextId(id);
    }
  };
  const onHideClicked = () => {
    // a.shift();
    setHideClicked(true);
    for (let i = 0; i <= hideTextId; i++) {
      if (hideTextId == i) {
        a[i] = 1;
      } else if (a[i] !== 1) {
        a[i] = 0;
      }
    }
    // setIsOpen(!isOpen);
    // if(currentButton === id )
    // setCurrentButton(null);
    // else
    // setCurrentButton(id);
  };
  const onDelete = () => {
    const a1 = leftSideBarContent.splice(
      leftSideBarContent.findIndex((val, i) => i == hideTextId),
      1
    );
  };
  const navigate = useNavigate();

  const onRename = (label) => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const isItemExist = tempArr.find((val) => {
      return val
        ? val.Label.toLowerCase() === label.toLowerCase() &&
            val.Menu_Id !== selectedItem.Menu_Id
        : '';
    });
    if (isItemExist) {
      showToastError(t('menu_exist'));
    } else {
      tempArr.forEach((value, i) => {
        if (value.Menu_Id === selectedItem?.Menu_Id) {
          tempArr[i].Label = label;
          tempArr[i].Status = 'DRAFT';
        }
      });

      const { created_by: createdBy } = menus;
      const menuToUpdate = {
        lastModifiedBy: username,
        createdBy,
        menu_content: tempArr,
      };

      // const menuToSend = {
      //   Title: selectedItem?.Title,
      //   Tagging: 'Navigation',
      //   Text: selectedItem?.Text,
      //   ParentId: selectedItem?.ParentId,
      //   Label: label,
      //   Internal: selectedItem?.Internal,
      //   Score: selectedItem?.Score,
      //   IsHidden: false,
      //   Menu_State: 'DRAFT',
      //   HomePage: selectedItem?.HomePage,
      //   LastModifiedBy: username,
      //   URL: selectedItem?.URL,
      // };
      updatemutate({
        variables: {
          input: menuToUpdate,
        },
      })
        .then((resp) => {
          setRename('');
          showToastSuccess(`${t('menu')} ${t('updated_toast')}`);
        })
        .catch((error) => {
          if (error.graphQLErrors[0]) {
            showToastError(error.graphQLErrors[0].message);
          } else {
            showToastError(t('api_error_toast'));
          }
        });
    }
  };
  const onSetSubMenu = (parent_Id) => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));

    tempArr.forEach((value, i) => {
      if (value.Menu_Id === selectedItem?.Menu_Id) {
        tempArr[i].ParentId = parent_Id;
        tempArr[i].Status = 'DRAFT';
      }
    });

    const { created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy: username,
      createdBy,
      menu_content: tempArr,
    };

    // const menuToSend = {
    //   Title: selectedItem?.Title,
    //   Tagging: 'Navigation',
    //   Text: selectedItem?.Text,
    //   ParentId: parent_Id,
    //   Label: selectedItem?.Label,
    //   Internal: selectedItem?.Internal,
    //   Score: selectedItem?.Score,
    //   IsHidden: false,
    //   Menu_State: 'DRAFT',
    //   HomePage: selectedItem?.HomePage,
    //   LastModifiedBy: username,
    //   URL: selectedItem?.URL,
    // };
    updatemutate({
      variables: {
        input: menuToUpdate,
      },
    })
      .then((resp) => {
        // setIsrenamed(!isrenamed);
        setSubMenu('');
        showToastSuccess(`${t('menu')} ${t('updated_toast')}`);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };

  const publishMenu = () => {
    const defaultTimeZone = `${
      Intl.DateTimeFormat().resolvedOptions().timeZone
    }`;
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const isHomePage = tempArr.find((val) => {
      if (val.HomePage === true) {
        return true;
      } else {
        return false;
      }
    });
    if (isHomePage) {
      handleReorderMenu(defaultTimeZone);
    } else {
      showToastError('Please select Home Page');
    }
  };
  const onEdit = () => {
    setEditData(selectedItem);
    setOpenCreateMenu(true);
    setisedit(true);
    setIsCreate(false);
  };

  const handlePageList = (item) => {
    handleSelectedType(item);
  };
  const handlePagesType = (item) => {
    setSelectedType(item.name);
    handlePageList(item);
  };
  const handleClick = (url) => {
    navigate(url);
  };
  const handleClose = () => {
    setIsOpen(false);
    setCurrentButton(null);
    setHideClicked(false);
  };
  const handleReorderMenu = (defaultTimeZone) => {
    const { created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy: username,
      createdBy,
      menu_content: reorderMenu,
    };
    setIsLoaded(true);
    updatemutate({
      variables: {
        input: menuToUpdate,
      },
    })
      .then((resp) => {
        setRename('');
        // showToastSuccess(`${t('menu')} ${t('reordered_toast')}`);
        publishmutate({
          variables: {
            input: {
              timeZone: defaultTimeZone,
            },
          },
        })
          .then((resp) => {
            setIsLoaded(false);

            showToastSuccess(`${t('menu')} ${t('published_toast')}`);
          })
          .catch((error) => {
            if (error.graphQLErrors[0]) {
              showToastError(error.graphQLErrors[0].message);
            } else {
              showToastError(t('api_error_toast'));
            }
          });
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const handleDragEnd = (result) => {
    const { type, source, destination } = result;
    if (!destination) return;
    const sourceleftSideBarContentId = source.droppableId;
    const destinationleftSideBarContentId = destination.droppableId;
    // Reordering items
    if (type === 'droppable-item') {
      if (sourceleftSideBarContentId === destinationleftSideBarContentId) {
        const updatedCategories = updateMainMenuScoreAndReorder(
          leftSideBarContent,
          source?.index,
          destination?.index
        );
        if (updatedCategories) {
          setLeftSideContent(updatedCategories);
          const menu = [
            {
              Menu_Id: updatedCategories[source?.index].Menu_Id,
              Score: updatedCategories[source?.index].Score,
              ParentId: updatedCategories[source?.index].ParentId,
            },
            {
              Menu_Id: updatedCategories[destination?.index].Menu_Id,
              Score: updatedCategories[destination?.index].Score,
              ParentId: updatedCategories[destination?.index].ParentId,
            },
          ];
          newMenu.current.value = menu;
        }
        reorderMenu.forEach((value, i) => {
          if (value.Menu_Id === newMenu.current.value[i]?.Menu_Id) {
            reorderMenu[i].Score = newMenu.current.value[i].Score;
            reorderMenu[i].ParentId = newMenu.current.value[i].ParentId;
          }
        });
      }
    }
    // Reordering categories
    if (type === 'droppable-category') {
      const updatedCategories = updateMainMenuScoreAndReorder(
        leftSideBarContent,
        source?.index,
        destination?.index
      );
      if (updatedCategories) {
        console.log('cate', updatedCategories);

        setLeftSideContent(updatedCategories);
        const menu = [
          {
            Menu_Id: updatedCategories[source?.index].Menu_Id,
            Score: updatedCategories[source?.index].Score,
            ParentId: updatedCategories[source?.index].ParentId,
          },
          {
            Menu_Id: updatedCategories[destination?.index].Menu_Id,
            Score: updatedCategories[destination?.index].Score,
            ParentId: updatedCategories[destination?.index].ParentId,
          },
        ];
        newMenu.current.value = menu;
      }
      reorderMenu.forEach((value, i) => {
        if (value.Menu_Id === newMenu.current.value[i]?.Menu_Id) {
          reorderMenu[i].Score = newMenu.current.value[i].Score;
          reorderMenu[i].ParentId = newMenu.current.value[i].ParentId;
        }
      });
      console.log('temp', reorderMenu);
    }
  };
  useEffect(() => {
    runFetchMenuList({
      variables: {
        pagePath: '',
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_getNavigation) {
          setMenus(resp?.data?.authoring_getNavigation);

          dispatch(
            updateInitialState(
              resp?.data?.authoring_getNavigation?.menu_content
            )
          );
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      });
  }, [row, rename, editDone, isConfirm, subMenu]);
  const handleDeleteMenu = () => {
    const tempArr: any = JSON.parse(JSON.stringify(leftSideBarContent));
    const itemToDelete = tempArr.filter(
      (value) =>
        value.Menu_Id !== selectedItem?.Menu_Id &&
        value.ParentId !== selectedItem?.Menu_Id
    );
    const { created_by: createdBy } = menus;
    const menuToUpdate = {
      lastModifiedBy: username,
      createdBy,
      menu_content: itemToDelete,
    };
    console.log('delete', menuToUpdate, selectedItem?.Menu_Id);

    mutateDeleteMenu({
      variables: {
        input: menuToUpdate,
      },
    })
      .then(() => {
        // getArticle(0, article?.articleArray?.length - 1);
        setRow(row - 1);
        showToastSuccess(`${t('menu')} ${t('deleted_toast')}`);
        // setLoading(false);
      })
      .catch(() => {
        showToastError(t('api_error_toast'));
      });
  };

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'none',
            em: 'flex',
            lg: 'flex',
          },
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Box
          id="scrollableDiv"
          className="navTreeMenuBox"
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'none',
              em: 'block',
              lg: 'block',
            },
            height: 'calc(100vh - 124px)',
            overflowY: leftSideBarContent?.length > 5 ? 'auto' : 'none',
          }}
        >
          {/* <InfiniteScroll
                      dataLength={leftSideBarContent?.length > 0 ? leftSideBarContent?.length : 0}
                      next={()=>{}}
                      hasMore={true}
                      loader={<></>}
                      scrollableTarget="scrollableDiv"
                    > */}
          <DragAndDrop onDragEnd={handleDragEnd}>
            <Drop id="droppable" type="droppable-category">
              {leftSideBarContent?.length > 0 &&
                leftSideBarContent?.map((item, index) => {
                  {
                    /* {leftSideBarContent?.map((item, index) => { */
                  }
                  return (
                    <div key={index}>
                      {item.ParentId == '0' && (
                        <Drag
                          className="draggable-category"
                          key={item.Menu_Id + item.Score}
                          id={item.Menu_Id + item.Score}
                          index={index}
                          // style={{display:'flex',alignItems:'flex-start'}}
                        >
                          <div className="category-container">
                            {/* {item.ParentId == "0" &&  */}
                            <Box
                              sx={{
                                boxShadow: 'none',
                                // padding: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                // width:'90%',
                                position: 'relative',
                              }}
                            >
                              {/* <DragHandleIcon
                          sx={{
                            // color: a == index ? '#89909a' : '#2d2d39',
                            color: '#89909a',
                            cursor: 'pointer',
                            marginRight: '10px',
                            width: '16px',
                          }} /> */}
                              <Typography variant="h6regular">
                                {item.Label}
                              </Typography>
                              <Box className="NavTreeHomeIcon">
                                {item.HomePage === true ? (
                                  <HomeOutlinedIcon
                                    sx={{
                                      color: ThemeConstants.BLUE_COLOR,
                                      fontSize: ThemeConstants.FONTSIZE_H3,
                                    }}
                                  />
                                ) : (
                                  ''
                                )}
                              </Box>
                              <Box
                                id={String(index)}
                                onClick={(event) =>
                                  handleListClick(event, item)
                                }
                                className="NavTreeSettingIcon"
                              >
                                <img
                                  src={SettingIcon}
                                  alt="Setting Icon"
                                  onClick={() => onButtonClicked(index)}
                                />
                              </Box>
                            </Box>
                            {/* } */}

                            {/* <DragAndDrop onDragEnd={handleDragEnd}> */}
                            <Drop
                              key={index.toString()}
                              id={index.toString()}
                              type="droppable-item"
                            >
                              {leftSideBarContent?.length > 0 &&
                                leftSideBarContent?.map((item1, index1) => {
                                  return (
                                    <>
                                      {item1.ParentId == item.Menu_Id && (
                                        <Drag
                                          className="draggable"
                                          key={item1.Label + item1.Menu_Id}
                                          id={item1.Label + item1.Menu_Id}
                                          index={index1}
                                        >
                                          {/* {item1.ParentId==item.Menu_Id &&     */}
                                          <Box
                                            sx={{
                                              boxShadow: 'none',
                                              // padding: '10px',
                                              display: 'flex',
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                              position: 'relative',
                                              width: '100%',
                                            }}
                                            onClick={() =>
                                              handlePagesType(item1)
                                            }
                                          >
                                            <Typography
                                              variant="h6regular"
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                // width: '100%'
                                                // fontSize: '15px',
                                              }}
                                            >
                                              {/* <DragHandleIcon
                                    sx={{
                                      color: '#89909a',
                                      cursor: 'pointer',
                                      marginRight: '10px',
                                      marginLeft: '15px',
                                      width: '16px',
                                    }}
                                  /> */}
                                              {item1.Label}
                                            </Typography>
                                            <Box
                                              id={String(index)}
                                              onClick={(event) =>
                                                handleListClick(event, item1)
                                              }
                                              className="NavTreeSettingIcon"
                                            >
                                              <img
                                                src={SettingIcon}
                                                alt="Setting Icon"
                                                onClick={() =>
                                                  onButtonClicked(index1)
                                                }
                                              />
                                            </Box>
                                          </Box>

                                          {/* // } */}
                                        </Drag>
                                      )}
                                    </>
                                  );
                                })}
                            </Drop>
                            {/* </DragAndDrop> */}
                          </div>
                        </Drag>
                      )}
                      {/* {item.ParentId == '0' && <Divider />} */}
                    </div>
                  );
                })}
            </Drop>
          </DragAndDrop>
          {/* </InfiniteScroll> */}
        </Box>
        <Box
          sx={{
            display: 'block',
            padding: '0 15px 15px 15px',
            width: '100%',
          }}
        >
          <LoadingButton
            disabled={menuToPublish.length > 0 ? false : true}
            loading={isLoaded}
            loadingPosition="end"
            startIcon={<TelegramIcon />}
            variant="contained"
            sx={{
              height: '47px',
              width: '100%',
            }}
            disableElevation
            onClick={publishMenu}
          >
            {/* <SaveOutlinedIcon
              sx={{ marginRight: '5px', width: '18px', height: '18px' }}
            /> */}
            {t('publish')}
          </LoadingButton>
          {/* <Button
            disabled={menuToPublish.length > 0 ? false : true}
            sx={{ width: '100%'}}
            variant='contained'
            disableElevation
            onClick={publishMenu}
          >
            {t('publish')}
          </Button> */}
        </Box>
      </Box>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={listMenu}
        open={openListMenu}
        onClose={handleListClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
            marginTop: '5px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '18px',
            fontSize: ThemeConstants.FONTSIZE_XS,
          },
          left: 195,
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            setRenameDialog(true);
            setRename(selectedItem?.Label);
            handleListClose();
            // setListMenu(null);
          }}
        >
          {t('rename')}
        </MenuItem>
        <MenuItem disableRipple disabled>
          {t('hide')}
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            handleListClose();
            onEdit();
          }}
        >
          {t('edit')}
        </MenuItem>
        <MenuItem
          disableRipple
          disabled={menuCount.current > 0 ? true : false}
          onClick={(e) => {
            handleSubListClick(e);
          }}
          sx={{ color: listSubMenu ? '#e83527' : '' }}
        >
          {t('set_as_sub_menu')}
          <ArrowForwardIosIcon
            sx={{
              width: '11px',
              height: '11px',
              ml: '6px',
              color: listSubMenu ? '#e83527' : '#2d2d39',
            }}
          />
        </MenuItem>
        <MenuItem
          disableRipple
          disabled
          //   onClick={() => {
          //     handleListClose();
          //     handleDeleteArticle();
          //   }}
        >
          {t('duplicate')}
        </MenuItem>
        <MenuItem
          disableRipple
          disabled={selectedItem?.HomePage ? true : false}
          onClick={() => {
            handleListClose();
            setisdeleteDialog(true);
            // handleDeleteMenu();
          }}
        >
          {t('delete')}
        </MenuItem>
      </Menu>
      <Dialog
        open={openRenameDialog}
        onClose={() => setRenameDialog(false)}
        sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'none',
            em: 'block',
            lg: 'block',
          },
          '.Platform-x-Dialog-paper': {
            maxWidth: '600px',
            maxHeight: '350px',
            // bottom: 50,left:{md:50}
          },
          // width: '790px',
          // height: 500,
          margin: '150px 238.9px 150px 288px',
          // padding: '39px 39.6px 56px 56px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              margin: '55px 358px 0px 348px',
            }}
          >
            {t('rename')}
          </Typography>
          <TextField
            size="small"
            value={rename}
            onChange={(e) => {
              setRename(e.target.value);
            }}
            sx={{ width: '400px', mt: '30px' }}
          ></TextField>
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                em: 'block',
                lg: 'block',
              },
              padding: '15px',
              textAlign: 'right',
              mt: '50px',
              mb: '50px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: ThemeConstants.BLACK_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.BLACK_COLOR,
                },
                width: '68px',
                height: '45px',
                marginRight: '15px',
                border: '1px solid #000000',
                borderRadius: '3px',
              }}
              disableElevation
              onClick={() => setRenameDialog(false)}
            >
              <CancelIcon
                sx={{ marginRight: '5px', width: '14px', height: '14px' }}
              />
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                // minWidth: '130px',
                width: '68px',
                height: '45px',
                borderRadius: '3px',
              }}
              disableElevation
              onClick={() => {
                onRename(rename);
                setRenameDialog(false);
              }}
            >
              <SaveOutlinedIcon
                sx={{ marginRight: '5px', width: '18px', height: '18px' }}
              />
              {t('done')}
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={listSubMenu}
        open={openListSubMenu}
        onClose={handleSubListClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
            marginTop: '5px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '18px',
            fontSize: ThemeConstants.FONTSIZE_XS,
          },
          left: 320,
          height: 500,
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              cursor: 'default',
              // color: ThemeConstants.BLACK_COLOR,
            },
          }}
        >
          {t('select_menu_item')}
        </MenuItem>
        <MenuItem
          disableRipple
          sx={{
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
            },
          }}
        >
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // disabled={radioSelected=='Main Menu'?true:false}
              size="small"
              sx={{ width: '250px', mt: '5px' }}
              value={subMenu}
              onChange={handleChangeSetMenu}
              // IconComponent={() => <ExpandMoreIcon/>}
            >
              {leftSideBarContent.map(
                (val) =>
                  val.ParentId === '0' &&
                  val.Menu_Id !== selectedItem?.Menu_Id &&
                  val.Menu_Id !== selectedItem?.ParentId && (
                    <MenuItem value={val.Menu_Id} key={val.Menu_Id}>
                      {val.Label}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem
          disableRipple
          sx={{
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              cursor: 'default',
            },
          }}
        >
          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                em: 'block',
                lg: 'block',
              },
              padding: '15px',
              textAlign: 'right',
              mt: '120px',
              mb: '0px',
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: ThemeConstants.BLACK_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.BLACK_COLOR,
                },
                width: '80px',
                height: '40px',
                marginRight: '15px',
                border: '1px solid #000000',
              }}
              disableElevation
              onClick={handleSubListClose}
            >
              <CancelIcon
                sx={{ marginRight: '5px', width: '14px', height: '14px' }}
              />
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                // minWidth: '130px',
                width: '80px',
                height: '40px',
              }}
              disableElevation
              onClick={() => {
                onSetSubMenu(subMenu);
                handleSubListClose();
                handleListClose();
              }}
            >
              <DoneOutlinedIcon
                sx={{ marginRight: '5px', width: '18px', height: '18px' }}
              />
              {t('done')}
            </Button>
          </Box>
        </MenuItem>
      </Menu>
      {isDeleteDialog && (
        <DeleteDialog
          handleListClose={handleListClose}
          handleDeleteMenu={handleDeleteMenu}
          isDeleteDialog={isDeleteDialog}
          setisdeleteDialog={setisdeleteDialog}
          title={t('delete_title')}
          subTitle={`${t('delete_confirm')} ${t('menu_item')}?. ${t(
            'process_undone'
          )}`}
        />
      )}
    </>
  );
}
