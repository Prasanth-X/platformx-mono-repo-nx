import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  Box,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface ListHeaderProps {
  headertext?: string;
  returnBack?: any;
  dropDownList?: any;
  menuItem?: any;
  isDisableDone?: any;
  handleDone?: any;
  suggestiveSearchList?: any;
  handleResetInputFilter?: any;
  setSearchTerm?: any;
  setInputValue?: any;
  inputValue?: any;
  searchTerm?: any;
  handleSearchChange?: any;
}
const ListHeader = ({
  headertext,
  returnBack,
  dropDownList,
  menuItem,
  isDisableDone,
  handleDone,
  suggestiveSearchList,
  handleResetInputFilter,
  setSearchTerm,
  setInputValue,
  inputValue,
  searchTerm,
  handleSearchChange,
}: ListHeaderProps) => {
  const { t }= useTranslation();
  // const [isSearchHeaderOpen, setIsSearchHeaderOpen] = useState(false);
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: { sm: '15px', xs: '10px' },
        margin: '0px',
      }}
    >
      <Grid
        item
        // xs={isSearchHeaderOpen?6:11}
        // lg={3}
        // md={2.25}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Button
          variant='text'
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ minWidth: '0px', display: { xs: 'flex', sm: 'none' } }}
          onClick={returnBack}
        ></Button>
        <Typography variant='h4medium'>{headertext}</Typography>
      </Grid>
      {/* <Grid
        item
        xs={6}
        lg={6}
        md={6.75}
        sx={{ display: { xs: "none", sm: "flex" } }}
        alignItems="center"
      >
        <Box sx={{ width: { lg: "65%" } }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder={t("search")}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              // marginLeft: "auto",
              ".Platform-x-InputBase-root": {
                // height: "40px",
                fontSize: "14px",
                borderRadius: "3px 0px 0px 3px",
              },
              ".Platform-x-Input-root:before": {
                borderBottom: "2px solid #2d2d39",
              },
              ".Platform-x-Input-root:after": {
                borderBottom: "2px solid #000000",
              },
              ".Platform-x-Input-root.Mui-disabled:before": {
                borderBottom: "2px solid #c3c3cb",
              },
            }}
          />
        </Box>
        <Box>
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{
                height: "48px",
                borderRadius: "0px 3px 3px 0px",
                width: { lg: "150px" },
              }}
              value={menuItem}
              //   onChange={handleChangeMenu}
              IconComponent={() => <ExpandMoreIcon sx={{ mr: "10px" }} />}
            >
              {dropDownList.map((val) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid> */}
      <Grid
        item
        sm={3}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        alignItems='flex-end'
        justifyContent='flex-end'
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            className="sm"
            variant="secondaryButton"
            disableElevation
            onClick={returnBack}
          >
            {t('cancel')}
          </Button>

          <Button
            className='addnewpage sm'
            variant='primaryButton'
            disabled={isDisableDone}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              marginLeft: '12px',
            }}
            onClick={handleDone}
          >
            {t('done')}
          </Button>
        </Box>
      </Grid>
      {/* <Grid
        item
        xs={isSearchHeaderOpen?6:1}
        sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
      >
        {isSearchHeaderOpen ? (
                    <Box sx={{ marginLeft: "10px" }}>
                      <ContentSearchHeader
                       suggestiveSearchList={suggestiveSearchList}
                       handleResetInputFilter={handleResetInputFilter}
                       setSearchTerm={setSearchTerm}
                       setInputValue={setInputValue}
                       inputValue={inputValue}
                       searchTerm={searchTerm}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ marginRight: "13px" }}>
                      <SearchIcon
                        sx={{ verticalAlign: "middle" }}
                        onClick={() => setIsSearchHeaderOpen(true)}
                      />
                    </Box>
                  )}
      </Grid> */}
    </Grid>
  );
};
export default ListHeader;
