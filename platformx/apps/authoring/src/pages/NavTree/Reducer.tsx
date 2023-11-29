interface NavTreeInstance {
  Title: any;
  ParentId: any;
  URL: any;
  Tagging: any;
  Text: any;
  Label: any;
  Score: any;
  createdBy: any;
  LastModifiedBy?: string;
  Menu_State: any;
  Internal: any;
  IsHidden: any;
  HomePage: any;
}
interface InitialStateInstance {
  navTreeArray: NavTreeInstance[] | [];
  currentArray: NavTreeInstance | any;
}
export const navTreeInitialState: InitialStateInstance = {
  navTreeArray: [],
  currentArray: {},
};

const addMenu = (state, newMenu) => {
  const newMenuArray: NavTreeInstance[] = [...state.navTreeArray];
  //const articleid = newMenuArray.length;
  //newMenu.id = '';
  newMenuArray.push(newMenu);
  return { ...state, navTreeArray: newMenuArray, currentArray: newMenu };
};

// export const navTreeInitialState: InitialStateInstance = {
//   navTreeArray: [
//     {
//       "Id": 1,
//       "ParentId": 0,
//       "URL": "https://www.test.com",
//       "Heading": "Home",
//       "Internal": true,
//       "HomePage": false,
//       "IsHidden": false,
//       "Score": 1
//     },
//     {
//       "Id": 2,
//       "ParentId": 1,
//       "URL": "https://www.test.com",
//       "Heading": "Home 1",
//       "Internal": true,
//       "HomePage": false,
//       "IsHidden": false,
//       "Score": 1
//     },
//     {
//       "Id": 3,
//       "ParentId": 1,
//       "URL": "https://www.test.com",
//       "Heading": "Home 2",
//       "Internal": true,
//       "HomePage": false,
//       "IsHidden": false,
//       "Score": 2
//     },
//     {
//       "Id": 4,
//       "ParentId": 0,
//       "URL": "https://www.test.com",
//       "Heading": "About Us",
//       "Internal": true,
//       "HomePage": false,
//       "IsHidden": false,
//       "Score": 2
//     },
// ]
// };
const updateInitialState = (state, payload) => {
  return { ...(state || {}), navTreeArray: payload };
};
const updateNavTreeList = (state, payload) => {
  return {
    ...(state || {}),
    articleArray: [...(state?.articleArray || {}), ...(payload || {})],
  };
};
const deleteNavTreeItem = (state, payload) => {
  return {
    ...(state || {}),
    articleArray: [...(state?.articleArray || {}), ...(payload || {})],
  };
};
export const NavTreeReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_MENU':
      return addMenu(state, action.menu);
    case 'UPDATE_INITIAL_STATE_MENU':
      return updateInitialState(state, action.payload);
    case 'UPDATE_NAVTREE_LIST':
      return updateNavTreeList(state, action.payload);
    case 'DELETE_NAV_ITEM':
      return deleteNavTreeItem(state, action.payload);
    default:
      return state;
  }
};
