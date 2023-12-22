import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Tags({ handleTags }) {
  const [tags, setTags] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    handleTags(tags);
  }, [tags]);

  const handleKeydown = (e) => {
    if (e.keyCode == 70) {
      e.stopPropagation();
    }
  };
  return (
    
      <Autocomplete
        sx={{
          '& .Platform-x-Chip-root': {
            background: '#fff',
            margin: '5px 10px 5px 0',
            color: '#14142B',
            border: '1px solid #14142B',
            borderRadius: '4px',
            height: '28px',
          },
          '& .Platform-x-SvgIcon-root': {
            fontSize: '18px',
            marginRight: '5px',
          },
          '& .Platform-x-Chip-label': {
            paddingLeft: '5px',
            paddingRight: '5px',
          },
          '& .Platform-x-InputBase-root': {
            flexWrap: 'wrap',
            width: 'auto',
          },
          '& .Platform-x-InputBase-input': {
            width: 0,
            minWidth: '150px',
          },
        }}
        multiple
        id='tags-filled'
        options={[]}
        onChange={(event: object, value) => {
          const result = value.filter((str) => str.trim().length != 0);
          const updatedtags = result.filter((c, index) => {
            return result.indexOf(c) === index;
          });
          setTags(() => updatedtags);
        }}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip   label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t('add_tag')}
            onKeyDown={(e) => handleKeydown(e)}
          />
        )}
      />
     
  );
}
