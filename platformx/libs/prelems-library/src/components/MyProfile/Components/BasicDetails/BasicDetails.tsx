import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { useStyles } from "./BasicDetails.styles";

const data = {
  language: {
    label: "Language",
    MenuItems: [
      { value: "Romansh", label: "Romansh" },
      { value: "German", label: "German" },
      { value: "French", label: "French" },
      { value: "Italian", label: "Italian" },
    ],
  },
  country: {
    label: "Country",
    MenuItems: [
      { value: "India", label: "India" },
      { value: "USA", label: "USA" },
      { value: "UK", label: "UK" },
    ],
  },
};

const BasicSelect = ({ type = "" }) => {
  const [selectType, setSelectType] = React.useState("");

  return (
    <Box sx={{ minWidth: 120, px: 2, py: 1 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{data[type].label}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={selectType}
          label={data[type].label}
          onChange={(e) => setSelectType(e.target.value)}>
          {data[type].MenuItems.map((item: any) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
const BasicDetails = () => {
  const classes = useStyles();
  const textBox = (textHoler = "", multiline = false) => {
    const [value, setValue] = React.useState("");
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <TextField
          fullWidth
          value={value}
          variant='outlined'
          placeholder={textHoler}
          className={`custom-textbox string-textbox `}
          rows={5}
          multiline={multiline ? true : false}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    );
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12} className={classes.basicText}>
        <Typography variant='h4bold' className={classes.typoMargin}>
          Basic Details
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {textBox("Paul")}
      </Grid>
      <Grid item xs={6}>
        {textBox("Dev")}
      </Grid>
      <Grid item xs={6}>
        {textBox("paul@jocdk.com")}
      </Grid>
      <Grid item xs={6}>
        <BasicSelect type='language' />
      </Grid>
      <Grid item xs={6}>
        <BasicSelect type='country' />
      </Grid>
      <Grid item xs={6}>
        {textBox("965 471 8443")}
      </Grid>
      <Grid item xs={12}>
        {textBox("Heading, ie Instructor, Coach, Fitness Trainer")}
      </Grid>
      <Grid item xs={12}>
        {textBox("Description", true)}
      </Grid>
      <Stack p={2}>
        <Button variant='blackbutton' className={classes.editButton}>
          Save
        </Button>
      </Stack>
    </Grid>
  );
};

export default BasicDetails;
