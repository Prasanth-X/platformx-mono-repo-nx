import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import ThemeConstants from "../../themes/authoring/lightTheme/lightThemeVariable";

const AutoCompleteText = ({ socialShareInfo, setSocialShareInfo }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Autocomplete
        multiple
        id='tags-filled'
        value={
          socialShareInfo?.tagsSocialShare?.length > 0
            ? [...socialShareInfo.tagsSocialShare]
            : []
        }
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim()?.length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          const pageInfoUpdated = { ...socialShareInfo };
          pageInfoUpdated.tagsSocialShare = updatedtags;
          setSocialShareInfo(pageInfoUpdated);
        }}
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map(
            (option: string, index: number) =>
              option &&
              <Chip
                variant='outlined'
                label={option}
                deleteIcon={
                  <DeleteIcon
                    sx={{ color: ThemeConstants.PRIMARY_MAIN_COLOR, cursor: 'pointer' }}
                  />
                }
                sx={{
                  '.Platform-x-Chip-deleteIcon': {
                    color: ThemeConstants.BLACK_COLOR,
                  },
                }}
                {...getTagProps({ index })}
              />

          )}
        renderInput={(params) =>
        (<TextField
          {...params}
          variant='outlined'
          placeholder={
            socialShareInfo?.tagsSocialShare?.length > 0
              ? ''
              : t('quiz_tags_placeholder')
          }
        />)
        }
        sx={{
          '.Platform-x-OutlinedInput-root ': {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px',
          },
          '.Platform-x-Autocomplete-tag': {
            height: '40px',
            margin: '0 5px 5px 0',
          },
          '.Platform-x-Chip-label': {
            padding: '0 5px',
          },
          '.Platform-x-InputBase-input': {
            padding: 0,
            width: '200px',
          },
        }}
      />
    </Box>
  );
};
export default AutoCompleteText;
