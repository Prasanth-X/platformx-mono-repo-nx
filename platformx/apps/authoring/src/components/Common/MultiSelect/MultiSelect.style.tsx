import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  typoViewMoreOrLess: {
    color: '#374fd5',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'capitalize',
    height: '35px',
    margin: '5px',
    padding: '10px',
  },
  typo: { textTransform: 'capitalize' },
  listItem: {
    display: 'flex',
    width: 'auto !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    height: '37px',
    borderRadius: '5px',
    padding: '0 !important',
    margin: '0 0 10px 0',
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));

export const siteSettingTagInlineCss = `
textarea::placeholder {
  color: #ced3d9;  
  margin-top: 20px;
  font-size: 14px;
}
input::placeholder {
  color: #ced3d9;
  font-size: 14px;
}
textarea:focus{
outline: none;
}
textarea {
font-size:16px
}
.Platform-x-InputBase-root {
}
.vod-cat .Platform-x-FormControlLabel-label{
padding: 6px 12px !important;
border-radius: 3px;
margin: 0px;
font-size: 12px;
background-color: #EFF0F7;
border-radius: 5px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
}
.Platform-x-FormControlLabel-root.vod-cat{

}
.makeStyles-listItem-3 .vod-cat .Mui-checked + .Platform-x-FormControlLabel-label {
color: #fff;
border-radius: 5px;
background-color: #14142B;
}

.vod-cat .Platform-x-ButtonBase-root.Platform-x-Checkbox-root{
display: none;
}
.makeStyles-listItem-3 .vod-cat .Platform-x-ButtonBase-root.Platform-x-Checkbox-root.Mui-checked{
display: none;
color: #fff;
border-radius: 0;
padding-left: 0;
padding-top: 6px;
padding-bottom: 6px;
background-color: #14142B;
}
.vod-cat .Platform-x-SvgIcon-root{
font-size: 12px;
}
`;
