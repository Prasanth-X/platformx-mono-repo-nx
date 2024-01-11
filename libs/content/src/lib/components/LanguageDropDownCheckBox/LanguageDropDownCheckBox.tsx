import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, ListItemIcon, Select, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { LanguageList, getCurrentLang } from '@platformx/utilities'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
      // right: '438px'
    },
  },
}

export default function LanguageDropDownCheckBox({
  language,
  setLanguage,
}: any) {
  const handleChange = (
    event: any, //SelectChangeEvent<typeof language>
  ) => {
    const {
      target: { value },
    } = event
    setLanguage(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  React.useEffect(() => {
    LanguageList()?.map((lang: any) => {
      if (getCurrentLang() === lang.id) {
        setLanguage(
          typeof lang.label === 'string' ? lang.label.split(',') : lang.label,
        )
      }
    })
  }, [])
  return (
    <FormControl
      // fullWidth
      sx={{
        width: '-webkit-fill-available',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingTop: '4px',
      }}
    >
      <Select
        size="medium"
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={language}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        IconComponent={ExpandMoreIcon}
        // IconComponent={() => (
        //   <ExpandMoreIcon sx={{ mr: "10px", color: "#2d2d39" }} />
        // )}
      >
        {LanguageList().map((l: any) => (
          <MenuItem
            key={l.label}
            value={l.label}
            sx={{
              minWidth: '230px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '50px !important',
              pt: '0px',
              pb: '0px',
            }} //onClick={() => handleLanguageChange(l.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              >
                {/* <img // To DO Need to check
                  alt=""
                  src={require(`../../../assets/${l.id}_flag.png`)}
                  style={{
                    objectFit: 'cover',
                    width: '24px',
                    height: '24px',
                  }}
                /> */}
              </Box>
              <Typography variant="h6regular">{l.label}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* {getCurrentLang() === l.id && */}
              <ListItemIcon sx={{ minWidth: 'auto' }}>
                <Checkbox checked={language?.indexOf(l.label) > -1} />
              </ListItemIcon>
              {/* } */}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  )
}
