import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';
import DeletePopup from '../../../pages/articles/deletePopup';
import {
  commonPostApiCall,
  commonPutApiCall,
} from '../../../services/config/request';
import { nullToArray } from '../../../utils/helperFunctions';
import BlogSearchBox from '../Blogs/BlogSearchBox';
import { timeSince } from '../helperBlogs';
import './BlogTimeline.css';

const BlogTimeline = (_props: any) => {
  const {
    eventPath = '',
    apiCountCall = 0,
    isBlogLoad = false,
    embeddURLValue = '',
    handleEdit = () => {},
  } = _props;

  const { t } = useTranslation();
  const rows = 20;

  const apiUrl = `${process.env.NX_BLOG_API_URI}blogging/fetch`;
  const updateApiUrl = `${process.env.NX_BLOG_API_URI}blogging/update`;

  const [presentId, setPresentId] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [searchTerm, setNewSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);

  const handleListClick = (
    event: React.MouseEvent<HTMLElement>,
    selectedId: any
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setListMenu(event.currentTarget);
    setPresentId(selectedId);
  };

  const handleListClose = () => {
    setListMenu(null);
  };

  const fetchMoreData = async () => {
    const data = {
      event_path: eventPath,
      is_published: true,
      is_soft_delete: false,
      start: nullToArray(selectedItem).length,
      rows: rows,
      sortOrder: 'desc',
      isSuggestive: false,
      pageSearch: searchTerm,
    };
    const response = await commonPostApiCall(apiUrl, data);

    if (response?.data?.data && response?.data?.data != 'No data found!') {
      //setSelectedItem(response?.data?.data);
      setSelectedItem([
        ...(selectedItem || []),
        ...(response?.data?.data || []),
      ]);
      if (
        nullToArray(response?.data?.data).length === 0 ||
        nullToArray(response?.data?.data).length < rows
      ) {
        setIsLazyLoad(false);
      }
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  const deleteCloseButtonHandle = () => {
    setIsDelete(true);
  };

  const handleDelete = () => {
    setIsDelete(true);
    handleListClose();
  };

  const fetchBlogData = async (searchTerm) => {
    try {
      const data = {
        event_path: eventPath,
        is_published: true,
        is_soft_delete: false,
        start: 0,
        rows: rows,
        sortOrder: 'desc',
        isSuggestive: false,
        pageSearch: searchTerm,
      };
      const response = await commonPostApiCall(apiUrl, data);

      if (response?.data?.data && response?.data?.data != 'No data found!') {
        setSelectedItem(response?.data?.data);

        if (
          nullToArray(response?.data?.data).length === 0 ||
          nullToArray(response?.data?.data).length < rows
        ) {
          setIsLazyLoad(false);
        }
      } else {
        setSelectedItem([]);
      }
    } catch (error) {
      showToastError(t('api_error_toast'));
    }
  };

  // Delete Blog function
  const handleDeleteContent = async () => {
    try {
      const data = {
        event_path: eventPath,
        is_soft_delete: true,
      };
      const response = await commonPutApiCall(
        `${updateApiUrl}/${presentId}`,
        data
      );
      const { data: { success = false } = {} } = response;
      if (success) {
        showToastSuccess('Blog deleted successfully.');
        fetchBlogData(searchTerm);
      } else {
        showToastError(t('api_error_toast'));
      }
    } catch (error) {
      showToastError(t('api_error_toast'));
    }
  };

  // Search Blog function
  const onSearch = (value) => {
    setNewSearchTerm(value);
  };

  const deleteConfirmButtonHandle = () => {
    handleDeleteContent();
    setIsDelete(false);
  };

  useEffect(() => {
    if (eventPath) {
      fetchBlogData(searchTerm);
    }
  }, [searchTerm, eventPath, apiCountCall]);

  return (
    <>
      <Box
        sx={{
          padding: { xs: '16px 16px 16px 16px', sm: '16px 16px 16px 26px' },
        }}
      >
        <Typography
          variant="h5semibold"
          component="h5"
          sx={{
            color: 'ThemeConstants.LIGHT_GREY3_COLOR',
            mb: 2,
            display: { xs: 'none', lg: 'block' },
          }}
        >
          Blogs Timeline
        </Typography>
        <BlogSearchBox
          onSearch={onSearch}
          style={{
            height: '40px',
            minHeight: '40px',
            width: '100%',
            marginBottom: '35px',
          }}
        />

        <Box
          sx={{
            overflowY: { xs: 'unset', lg: 'auto' },
            overflowX: 'hidden',
            height: { lg: 'calc(100vh - 275px)' },
          }}
          id="scrollableDiv"
        >
          <Timeline>
            {selectedItem?.length === 0 && searchTerm?.length > 0 ? (
              <Typography
                variant="h4regular"
                sx={{
                  color: 'Themeconstants.LIGHT_GREY3_COLOR',
                }}
              >
                {t('no_match_results')}{' '}
              </Typography>
            ) : null}

            {selectedItem?.length === 0 && searchTerm?.length === 0 ? (
              <Typography
                variant="h4regular"
                sx={{
                  color: 'Themeconstants.LIGHT_GREY3_COLOR',
                }}
              >
                We didn't find any Blog to show here.{' '}
              </Typography>
            ) : null}
            {selectedItem?.length > 0 && isBlogLoad ? (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot variant="outlined">
                    <RotateLeftIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      variant="h6medium"
                      component="h6"
                      sx={{ color: '#89909a' }}
                    >
                      Uploading...
                    </Typography>
                    <Typography
                      sx={{ color: '#5c6574', pb: 3 }}
                      variant="h6medium"
                      component="p"
                    >
                      Your blog is publishing. Please wait!
                    </Typography>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ) : null}

            <InfiniteScroll
              dataLength={nullToArray(selectedItem)?.length}
              next={fetchMoreData}
              hasMore={isLazyLoad}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {selectedItem &&
                selectedItem?.map((itemData: any, index) => {
                  let allDescData = '';
                  let allKeyHighligherData = '';
                  let allTextStatus = false;

                  let iframeVal = '';
                  let showIframeBox = false;
                  if (itemData?.embeded[0]?.code) {
                    iframeVal = itemData?.embeded[0]?.code;
                    showIframeBox = true;
                  }

                  if (itemData?.authors?.length > 0 && !itemData.title) {
                    if (itemData?.key_highlighter[0]?.highlighter) {
                      allKeyHighligherData = `${itemData?.key_highlighter[0]?.highlighter}`;
                    }
                    allTextStatus = true;
                    allDescData = `<span class="descBox">${DOMPurify.sanitize(
                      itemData.description
                    )}</span>`;
                  }

                  return (
                    <TimelineItem key={index} className="timelineItems">
                      {itemData?.modified_date ? (
                        <TimelineSeparator>
                          <TimelineDot variant="outlined">
                            <Typography
                              variant="h7regular"
                              sx={{ color: '#5c6574' }}
                            >
                              {timeSince(itemData?.created_date)}
                            </Typography>
                          </TimelineDot>
                          {selectedItem.length - 1 == index ? null : (
                            <TimelineConnector />
                          )}
                        </TimelineSeparator>
                      ) : null}
                      <TimelineContent
                        sx={{ py: '12px', px: 2, display: 'flex' }}
                      >
                        <Box sx={{ flexGrow: 1, width: { xs: '150px' } }}>
                          {itemData?.title || itemData?.description ? (
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              {!itemData?.key_highlighter[0]?.highlighter &&
                              itemData?.key_highlighter[0]
                                ?.time ? null : allTextStatus &&
                                itemData?.authors?.length > 0 ? (
                                <Typography
                                  variant="h7medium"
                                  dangerouslySetInnerHTML={{
                                    __html: allKeyHighligherData,
                                  }}
                                  sx={{
                                    fontStyle: allTextStatus
                                      ? 'italic'
                                      : 'normal',
                                  }}
                                  className="highlighterArea"
                                />
                              ) : (
                                <Typography
                                  variant="h7medium"
                                  className="highlighterArea"
                                  sx={{ color: '#5c6574', pr: '10px' }}
                                >
                                  {itemData?.key_highlighter[0]?.highlighter}
                                </Typography>
                              )}

                              {itemData?.key_highlighter[0]?.highlighter &&
                              itemData?.key_highlighter[0]?.time ? (
                                <span className="dotSeprator"></span>
                              ) : null}

                              <Typography
                                variant="h7semibold"
                                component="h6"
                                sx={{
                                  color: '#5c6574',
                                  pl:
                                    !itemData?.key_highlighter[0]
                                      ?.highlighter &&
                                    itemData?.key_highlighter[0]?.time
                                      ? '0px'
                                      : '10px',
                                }}
                              >
                                {itemData?.key_highlighter[0]?.time &&
                                  format(
                                    new Date(
                                      itemData?.key_highlighter[0]?.time
                                    ),
                                    'MMMMMM d, y | H:mm'
                                  )}
                              </Typography>
                            </Box>
                          ) : null}

                          <Typography
                            variant="h7regular"
                            sx={{
                              color: '#2d2d39',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              width: '270px !important',
                            }}
                          >
                            {itemData?.title}
                          </Typography>

                          {allTextStatus && itemData?.authors ? (
                            <Box
                              sx={{
                                color: '#5c6574',
                                display: 'block',
                                overflow: 'hidden',
                                fontSize: '12px',
                                fontStyle: allTextStatus ? 'italic' : 'normal',
                              }}
                              dangerouslySetInnerHTML={{
                                __html: `${
                                  allTextStatus && itemData?.authors?.length > 0
                                    ? allDescData
                                    : null
                                }`,
                              }}
                            ></Box>
                          ) : (
                            <Box
                              sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                                margin: 0,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  itemData?.description
                                ),
                              }}
                            ></Box>
                          )}

                          {/* in case of author */}
                          <Typography
                            variant="h7regular"
                            sx={{
                              color: '#5c6574',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textAlign:
                                allTextStatus && itemData?.authors?.length > 0
                                  ? 'end'
                                  : 'start',
                              mr:
                                allTextStatus && itemData?.authors?.length > 0
                                  ? '18px'
                                  : '0',
                            }}
                          >
                            {allTextStatus && itemData?.authors?.length > 0 ? (
                              <Typography
                                variant="h7regular"
                                dangerouslySetInnerHTML={{
                                  __html: `-${itemData?.authors}`,
                                }}
                                sx={{
                                  fontStyle: allTextStatus
                                    ? 'italic'
                                    : 'normal',
                                }}
                              ></Typography>
                            ) : (
                              <Typography
                                variant="h7regular"
                                dangerouslySetInnerHTML={{
                                  __html: itemData?.authors,
                                }}
                                sx={{
                                  fontStyle: allTextStatus
                                    ? 'normal'
                                    : 'italic',
                                }}
                              ></Typography>
                            )}
                          </Typography>

                          {showIframeBox ? (
                            <Box className="iframeBoxContainer">
                              <Link href={embeddURLValue}>
                                <Box
                                  dangerouslySetInnerHTML={{
                                    __html: iframeVal,
                                  }}
                                ></Box>
                              </Link>
                            </Box>
                          ) : null}
                          <Typography sx={{ pt: 3 }}> </Typography>
                        </Box>
                        <Box>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={(event) =>
                              handleListClick(event, itemData?._id)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            anchorEl={listMenu}
                            open={openListMenu}
                            onClose={handleListClose}
                            sx={{
                              '.Platform-x-Menu-paper': {
                                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.1)',
                                borderRadius: '7px',
                                marginTop: '5px',
                              },
                              '.Platform-x-Menu-list': {
                                borderRadius: '4px',
                                boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.1)',
                                border: 'solid 1px rgba(112, 112, 112, 0.1)',
                              },
                              '.Platform-x-MenuItem-root': {
                                '.Platform-x-SvgIcon-root': {
                                  fontSize: 20,
                                  marginRight: '10px',
                                },
                                paddingLeft: '18px',
                                fontSize: '16px',
                                zIndex: 999,
                              },
                              textTransform: 'capitalize',
                            }}
                          >
                            <MenuItem
                              disableRipple
                              onClick={() => {
                                handleEdit(presentId);
                                handleListClose();
                              }}
                            >
                              <EditIcon /> Edit
                            </MenuItem>
                            <MenuItem
                              disableRipple
                              onClick={() => {
                                handleDelete();
                              }}
                            >
                              <DeleteIcon /> Delete
                            </MenuItem>
                          </Menu>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
            </InfiniteScroll>
          </Timeline>
        </Box>
      </Box>

      {isDelete ? (
        <DeletePopup
          isDialogOpen={isDelete}
          title={t('delete_title')}
          subTitle={`${t('delete_confirm')} ${t('blog')}?. ${t(
            'process_undone'
          )}`}
          closeButtonText={t('no_keep_it')}
          confirmButtonText={t('yes_delete_it')}
          closeButtonHandle={deleteCloseButtonHandle}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      ) : null}
    </>
  );
};

export default React.memo(BlogTimeline);
