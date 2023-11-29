import { FETCH_MENU_LIST_ALL } from '../../graphql/navTree/navTreeFetchQuerie';
import {
  MENU_CREATE_UPDATE_DELETE_REORDER,
  MENU_LIST_REORDER,
  PUBLISH_MENU,
} from '../../graphql/navTree/navTreeMutateQueries';

//fetch queries
export const fetch_menu_list = FETCH_MENU_LIST_ALL;

//mutate queries
export const save_menu = MENU_CREATE_UPDATE_DELETE_REORDER;
export const delete_menu = MENU_CREATE_UPDATE_DELETE_REORDER;
export const update_menu = MENU_CREATE_UPDATE_DELETE_REORDER;
export const publish_menu = PUBLISH_MENU;
export const menu_reorder = MENU_LIST_REORDER;
