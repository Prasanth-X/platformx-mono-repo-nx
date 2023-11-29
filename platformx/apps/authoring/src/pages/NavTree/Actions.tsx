export const createMenu = (
  menuItemName,
  parentId,
  username,
  isHomePage,
  menuDescription,
  selectedIcon,
  selectedItem
) => {
  const newMenu = {
    Title: menuItemName,
    ParentId: parentId,
    URL: '/navMenu-01',
    Tagging: 'Navigation',
    Description: menuDescription,
    Label: menuItemName,
    Score: '',
    createdBy: username,
    LastModificationDate: new Date().toISOString(),
    Menu_State: '',
    Internal: false,
    IsHidden: false,
    HomePage: isHomePage,
    menuicon: selectedIcon,
    content_type_value: { ...selectedItem },
  };
  return {
    type: 'CREATE_MENU',
    menu: newMenu,
  };
};

export const updateInitialState = (updatedState: any) => {
  return {
    type: 'UPDATE_INITIAL_STATE_MENU',
    payload: updatedState, //.menu_content,
  };
};

export const updateNavTreeList = (navTreeList: any) => {
  return {
    type: 'UPDATE_NAVTREE_LIST',
    payload: navTreeList,
  };
};
export const deleteNavTreeItem = (navTreeList: any) => {
  return {
    type: 'DELETE_NAV_ITEM',
    payload: navTreeList,
  };
};
