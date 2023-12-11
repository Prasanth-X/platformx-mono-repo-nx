import React, { useState, useEffect } from "react";
import "./Blogs.css";
import BlogContent from "./BlogContent";
import Grid from "@mui/material/Grid";
import BlogTimeline from "./BlogTimeline";
import { nullToObject } from "../../utils/helperFns";
import { useCustomStyle } from "./Blogs.style";

function Blogs({ eventUrl, secondaryArgs, content = {} }: any) {
  const classes = useCustomStyle();
  const { prelemBaseEndpoint = {} } = nullToObject(secondaryArgs);
  const { query: { blogShareId = "" } = {} } = nullToObject(prelemBaseEndpoint);
  const [loading, setLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState("desc");
  const [, setIsLazyLoad] = useState<boolean>(true);
  const [list, setList] = useState([]);
  const [clickeditem, setClickeditem] = useState("");
  const [, setSelectedlist] = useState([]);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const rows = 1000;

  const searchIconClickedChild = (value: any) => {
    setShowTitle(value);
  };

  const getEventUrl = () => {
    const id = content?.current_page_url;
    if (secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint) {
      return `${secondaryArgs?.prelemBaseEndpoint?.PublishEndPoint}${secondaryArgs?.prelemBaseEndpoint?.language}/event${id}`;
    } else {
      return `/event${id}`;
    }
  };

  const fetchBlog = async (index: any) => {
    setLoading(true);
    const article = {
      event_path: eventUrl,
      is_published: true,
      is_soft_delete: false,
      start: index,
      rows: rows,
      sortOrder: sortOrder,
      isSuggestive: false,
      pageSearch: searchText,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    };
    const res = await fetch(secondaryArgs?.prelemBaseEndpoint?.blogEndPoint, requestOptions);
    const blogdata = await res.json();
    setLoading(false);
    return blogdata;
  };

  const getBlog = (index: any) => {
    setLoading(true);
    const article = {
      event_path: eventUrl,
      is_published: true,
      is_soft_delete: false,
      start: index,
      rows: rows,
      sortOrder: sortOrder,
      isSuggestive: false,
      pageSearch: searchText,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    };
    fetch(secondaryArgs?.prelemBaseEndpoint?.blogEndPoint, requestOptions)
      .then((response) => response.json())
      .then((data: any) => {
        setLoading(false);
        setInitialLoad(true); //if landing from fb share help to scroll to that blog
        setList(data.data);
      });
  };

  const fetchMoreData = async () => {
    const nextIndex = startIndex + 1;
    setStartIndex(() => nextIndex);
    const blogRes = await fetchBlog(nextIndex);
    const blogresdata = await blogRes.data;
    if (blogRes.data.length === 0) {
      setIsLazyLoad(false);
    } else {
      setList([...list, ...blogresdata]);
    }
  };
  const detailedItem = (selectedItem: any) => {
    setSelectedlist(selectedItem);
    setClickeditem(selectedItem._id);
  };

  const clickingUpArrow = () => {
    setSortOrder("asc");
    if (clickeditem) {
      setClickeditem("");
    }
  };

  const clickingDownArrow = () => {
    setSortOrder("desc");
    if (clickeditem) {
      setClickeditem("");
    }
  };

  const onSearch = (value: any) => {
    setSearchText(value);
    if (clickeditem) {
      setClickeditem("");
    }
  };

  useEffect(() => {
    if (blogShareId && typeof blogShareId === "string") {
      setClickeditem(blogShareId);
    }
  }, [initialLoad, blogShareId]);

  useEffect(() => {
    getBlog(0);
  }, [sortOrder, searchText]);

  return (
    <>
      <Grid className={`${classes.blogPageWrapper} blogPageWrapperBg`} container>
        <Grid item xs={12} md={4} em={3} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
          <BlogTimeline
            searchIconClickedChild={searchIconClickedChild}
            showTitle={showTitle}
            clickingUpArrow={clickingUpArrow}
            clickingDownArrow={clickingDownArrow}
            sortOrder={sortOrder}
            onSearch={onSearch}
            eventUrl={eventUrl}
            secondaryArgs={secondaryArgs}
            list={list}
            fetchMoreData={fetchMoreData}
            detailedItem={detailedItem}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={8} em={8} lg={6}>
          <BlogContent
            getEventUrl={getEventUrl()}
            secondaryArgs={secondaryArgs}
            selectedBlogDetail={list}
            selectedId={clickeditem}
          />
        </Grid>
      </Grid>
    </>
  );
}

Blogs.defaultProps = {};

export default Blogs;
