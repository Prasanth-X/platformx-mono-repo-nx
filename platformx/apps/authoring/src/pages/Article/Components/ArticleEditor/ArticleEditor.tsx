import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useStyles } from '../../CreateArticle/CreateArticle.styles';
import MediaTray from '../MediaTray/MediaTray';

interface ArticleRow {
  id: number;
  content: string;
}

const ArticleEditor = ({ showMediaOption, showGallery }) => {
  const [rows, setRows] = useState([{ id: 0, content: '' }]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const [addedRowIndex, setAddedRowIndex] = useState(0);
  const classes = useStyles();
  const handleContentChange = (event: any, id: number, index: number) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, content: event.target.value } : row
    );
    if (event.target.value === '') {
      setShowOptions(true);
      setAddedRowIndex(id);
      setRows(updatedRows);
      const prevRowRef = `row-${id}`;
      document.getElementById(prevRowRef).focus();
    }
    setRows(updatedRows);
  };

  const addRowInMiddle = (nextIndex, row) => {
    rows.splice(nextIndex, 0, row);
    for (let i = nextIndex + 1; i < rows.length; i++) {
      rows[i].id = i;
    }
  };
  const handleKeyDown = (event: any, id: number, index: number) => {
    const value = event.target.value;
    console.log('rows', rows);
    if (event.key === 'Enter') {
      if (id !== 0 && rows.length - 1 > index) {
        const row = rows.find((x) => x.id === id);
        addRowInMiddle(id + 1, row);
      } else {
        handleAddRow(id);
      }
      setShowOptions(true);
      setAddedRowIndex(id + 1);
    } else if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      value === ''
    ) {
      if (rows.length > 1) {
        handleRemoveRow(id);
      }
      setShowOptions(true);
      setAddedRowIndex(id - 1);
      const prevIndex = Math.max(0, id - 1);
      const prevRowRef = `row-${prevIndex}`;
      document.getElementById(prevRowRef).focus();
    }
  };

  const handleAddRow = (id: number) => {
    const newRowId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    const newRow: ArticleRow = { id: newRowId, content: '' };
    const index = rows.findIndex((row) => row.id === id);
    const updatedRows = [
      ...rows.slice(0, index + 1),
      newRow,
      ...rows.slice(index + 1),
    ];
    setRows(updatedRows);
  };

  const handleRemoveRow = (id: number) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOptionClick = (option: string) => {
    console.log('Selected option:', option);
  };

  const handleSave = () => {
    const content = rows.map((row) => row.content).join('\n');
    // onSave(content);
  };

  const handleOnClick = (id, index) => {
    if (rows?.find((x) => x.id === id).content === '') {
      setShowOptions(true);
      setAddedRowIndex(index);
    }
  };
  return (
    <div>
      {rows?.map((row, index) => (
        <div key={row.id}>
          <Box display='flex' alignItems={'center'} gap={1}>
            <Box sx={{ display: 'flex', flex: 1, alignItems: 'flex-end' }}>
              {showOptions &&
                row.content === '' &&
                addedRowIndex === row.id && (
                  <Box
                    sx={{
                      alignSelf: 'flex-end',
                      position: 'absolute',
                      left: { xs: '28px', md: '-40px' },
                    }}
                  >
                    <MediaTray showGallery={showGallery} />
                  </Box>
                )}

              <TextField
                variant='standard'
                margin='normal'
                required
                fullWidth
                id={`row-${index}`}
                placeholder={rows.length === 0 && 'Write your article here'}
                autoFocus
                onClick={() => handleOnClick(row.id, index)}
                onChange={(event) => handleContentChange(event, row.id, index)}
                onKeyDown={(event) => handleKeyDown(event, row.id, index)}
                value={row.content}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  '.Platform-x-InputBase-input': {
                    textTransform: 'capitalize',
                  },
                }}
              />
            </Box>
            {/* {showOptions && row.content === '' && addedRowIndex === row.id && (
              <IconButton
                aria-label='Add row'
                onClick={() => handleAddRow(row.id)}
                onMouseDown={handleMenuOpen}
              >
                <Add></Add>
              </IconButton>
            )} */}
            {/* <Box sx={{ flex: 1 }}></Box> */}

            {/* {addedRowIndex === index ||
              (index === rows.length - 1 && row.content === '' && (
                <IconButton
                  aria-label='Add row'
                  onClick={() => handleAddRow(row.id)}
                  onMouseDown={handleMenuOpen}
                >
                  <Add></Add>
                </IconButton>
              ))} */}
            {/* {row.content === '' && (
              <IconButton
                aria-label='Add row'
                onClick={handleAddRow}
                onMouseDown={handleMenuOpen}
              >
                <Add></Add>
              </IconButton>
            )} */}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default ArticleEditor;
