import React, { useState, useEffect, useCallback } from "react";
import { TextField, Autocomplete, Box, InputAdornment } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { debounce } from "../../utils/helperFns";
import SearchIcon from "assets/svgIcon/SearchIcon.svg";
import "./BlogSearchBox.css";

interface Content {
  title: string;
}

function BlogSearchBox({ style, onSearch, sortOrder, sendShowFlag, eventUrl, secondaryArgs }: any) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [options, setOptions] = useState<Content[]>([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = useState("");
  // const eventUrl = "testing-demo-1";
  // http://localhost:3000/en/content/create-blog?path=test76545
  // const apiUrl = "https://platx-blogging-dev.fanuep.com/platform-x/blogging/fetch";
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const eventUrl = urlParams.get('path');
  // const apiUrl = process.env.REACT_APP_BLOG_API_URI + 'blogging/fetch';
  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      if (active) {
        try {
          const data = {
            event_path: eventUrl,
            is_published: true,
            is_soft_delete: false,
            start: 0,
            rows: 1000,
            sortOrder: sortOrder,
            isSuggestive: true,
            pageSearch: inputValue,
          };
          const response = await axios.post(secondaryArgs?.prelemBaseEndpoint?.blogEndPoint, data);
          if (response?.data?.data?.length > 0) {
            setOptions(response?.data?.data.filter((item: any) => item.title && item.title));
          } else {
            setOptions([]);
            setOpen(false);
          }
        } catch (error) {
          setOptions([]);
          setOpen(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const emptyOptions = () => {
    setOptions([]);
  };

  const debouncedCall = useCallback(debounce(emptyOptions, 500), []);

  const onInputChange = (e: any, value: any) => {
    setInputValue(value);
    debouncedCall();
  };

  const onEnter = (e: any) => {
    if (e.keyCode === 13) {
      onSearch(inputValue);
      //setOpen(false);
    }
  };

  const onSelect = (e: any, value: any) => {
    if (value) onSearch(value);
  };

  const resetSearch = () => {
    onSearch("");
    setInputValue("");
  };

  const searchIconClicked = () => {
    setShowSearch(!showSearch);
    sendShowFlag(showSearch);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: showSearch ? "none" : "block", md: "none" },
          marginRight: "13px",
        }}>
        <img
          alt='searchicon'
          src={SearchIcon}
          style={{ verticalAlign: "middle", cursor: "pointer" }}
          onClick={searchIconClicked}
        />
      </Box>
      <Autocomplete
        id='asynchronousSearch'
        freeSolo
        forcePopupIcon={false}
        sx={{ display: { xs: showSearch ? "block" : "none", md: "block" } }}
        style={style}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        inputValue={inputValue}
        value={inputValue}
        onInputChange={onInputChange}
        onChange={onSelect}
        onKeyDown={onEnter}
        filterOptions={(x) => x}
        options={options.map((option) => (option.title ? option.title : ""))}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`${t("searchBlog")}...`}
            sx={{
              ".Platform-x-InputBase-root": {
                height: "48px",
                fontSize: "14px",
                minHeight: "inherit",
                marginLeft: "0px",
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
                fieldset: {
                  borderColor: "transparent",
                },
                ".Platform-x-InputBase-input": {
                  textTransform: "capitalize",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: <img alt='searchicon' src={SearchIcon} />,
              endAdornment: (
                <InputAdornment position='end'>
                  {inputValue && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}>
                      <CloseRoundedIcon
                        onClick={resetSearch}
                        sx={{
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

export default BlogSearchBox;
