import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoCompleteMultiSelect } from '@platformx/utilities';
import { userManagementAPI } from '@platformx/authoring-apis';
// import { getAllExoMembersList } from '../../SpaceManagement/SpacesHelper';
import './InviteUserPopup.css';

interface DialogList {
  titledata: string;
  isDialogOpen: boolean;
  closeButtonHandle: () => void;
  doneButtonHandle: (value: any) => void;
  contentType?: string;
  language?: any;
  setLanguage?: (value: any) => void;
  defaultValues?: any;
  limitTags?: number;
  optionFormat: string;
  getOptionLabel: any;
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function InviteUserPopup({
  titledata = '',
  isDialogOpen,
  closeButtonHandle,
  doneButtonHandle,
  contentType = '',
  defaultValues = [],
  limitTags = -1,
  getOptionLabel,
  optionFormat = 'username',
}: DialogList) {
  const { t } = useTranslation();
  // const [title, setTitle] = useState(titledata);
  const filterOptions = (options: any) => {
    return ['Select all', ...options];
  };
  const [value, setValue] = useState(defaultValues);
  const [users, setUsers] = useState([]);
  const getUsers = async (
    isAuthoringUser: boolean,
    isRenderingUser: boolean,
    isCommunityUser: boolean
  ) => {
    try {
      const response: any = await userManagementAPI.fetchUsers({
        start: 0,
        rows: 5000,
        isAuthoringUser,
        isRenderingUser,
        isCommunityUser,
      });
      if (
        response?.authoring_userList &&
        response?.authoring_userList?.length > 0
      ) {
        const userList = [...(response?.authoring_userList || [])];
        const sortedUserList: any = userList?.sort(
          (a, b) => b?.created_timestamp - a.created_timestamp
        );
        setUsers(sortedUserList);
      }
    } catch (err: any) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    if (contentType === 'Spaces') {
      // TODO: Need to check with backend team
      // const getAllExoMembersListResponse = async () => {
      //   const allExoMemberResponse = await getAllExoMembersList();
      //   setUsers([...(allExoMemberResponse || [])]);
      // };
      // getAllExoMembersListResponse();
    } else if (contentType === 'courses') {
      getUsers(true, false, false);
    }
  }, [contentType]);

  const handleSelectUser = (e: React.SyntheticEvent, value: any[]) => {
    console.log('select', value.indexOf('Select all'), value);
    // if (value.indexOf('Select all') >= 0) {
    //   setValue(names);
    // } else {
    setValue(value);
    //}
  };
  console.log('users', value);

  return (
    <div>
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="duplicateContentPopupModal"
        sx={{
          '.Platform-x-Dialog-paper': {
            margin: { xs: '0', md: '20px', xl: '30px' },
            alignSelf: { xs: 'flex-end', md: 'center' },
            padding: { xs: '20px 15px', md: '25px' },
            width: { xs: '100%' },
            borderBottomLeftRadius: { xs: 0, md: '4px' },
            borderBottomRightRadius: { xs: 0, md: '4px' },
          },
        }}
      >
        <Box className="mainBox">
          <DialogTitle
            id="alert-dialog-title"
            component="h2"
            variant="h2medium"
          >
            {titledata}
          </DialogTitle>
          <Box
            sx={{
              marginBottom: '35px',
              '.Platform-x-InputBase-root': {
                flexWrap: 'wrap',
                '.Platform-x-ButtonBase-root': {
                  margin: '5px 2px',
                },
              },
            }}
          >
            {/* <Autocomplete
              // sx={{ m: 1, width: 500 }}
              multiple
              options={names}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder='Select Users'
                />
              )}
            />
          </Box> */}
            <AutoCompleteMultiSelect
              className="inviteMembersAutoComplete"
              options={users}
              placeholder="Select Users"
              values={value}
              onChange={handleSelectUser}
              getOptionLabel={getOptionLabel}
              optionFormat={optionFormat}
              limitTags={limitTags}
            />
            {/* <Autocomplete
              multiple
              // limitTags={4}
              id='checkboxes-tags-demo'
              options={users}
              disableCloseOnSelect
              // filterOptions={filterOptions}
              getOptionLabel={(option) => option?.username}
              value={value}
              onChange={handleSelectUser}
              classes={{
                popper: 'autocompleteMultiSelectPopper',
                paper: 'autocompleteMultiSelectPapper',
                inputRoot: 'autocompleteMultiSelectInputRoot',
                tag: 'autocompleteMultiSelectTag',
                root: 'autocompleteMultiSelectroot',
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option?.username}
                </li>
              )}
              // style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} placeholder='Select Users' />
              )}
            /> */}
          </Box>
          <DialogActions className="actionsButtons">
            <Button
              variant="secondaryButton"
              className="buttonsBottom"
              sx={{
                marginRight: '8px',
              }}
              startIcon={<ClearRoundedIcon />}
              onClick={closeButtonHandle}
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={value?.length > 0 ? false : true}
              variant="primaryButton"
              className="buttonsBottom"
              onClick={() => doneButtonHandle(value)}
              autoFocus
              startIcon={<CheckRoundedIcon />}
            >
              {t('send_invite')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
