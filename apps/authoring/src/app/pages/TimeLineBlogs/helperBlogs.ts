import { format } from 'date-fns';
import { commonPutApiCall } from '../../services/config/request';
import { nullToString } from '../../utils/helperFunctions';

const updateApiUrl = `${process.env.NX_BLOG_API_URI}blogging/update`;

export const timeSince = (publishDate: any) => {
  if (publishDate) {
    const date = new Date(publishDate);
    const curDate = new Date();
    const seconds = Math.floor((curDate.getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval)}years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)}months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)}d ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      //return Math.floor(interval) + " h ago";
      return format(new Date(date), 'H:mm');
    }
    interval = seconds / 60;
    if (interval > 1) {
      //return Math.floor(interval) + " m ago";
      return format(new Date(date), 'H:mm');
    }
    return `${Math.floor(seconds)}s ago`;
  }
  return '';
};

export const updateBlogApiCall = async (blogData: any = {}) => {
  const data = {
    title: blogData?.BlogTitle,
    description: `<span style="word-wrap: break-word" class="onlydesc">${
      nullToString(blogData?.BlogTextArea) + nullToString(blogData.mediaUrl)
    } </span>`,
    content_type: 'Blog',
    event_path: blogData.eventPath,
    page: blogData.eventPath,
    assets: blogData.assetstosend,
    item_path: blogData.contentTypeData,
    embeded: [{ code: blogData?.BlogEmbed }],
    // authors: [username],
    authors: blogData?.BlogAuthorName ? [blogData?.BlogAuthorName] : [],
    key_highlighter: [
      {
        highlighter: blogData?.BlogKeyHighlighter,
        time: blogData?.BlogTimeStamp,
      },
    ],
    is_published: true,
    created_date: blogData.savedBlogData?.created_date,
    is_soft_delete: false,
    created_by: blogData.savedBlogData?.created_by,
    last_published_date: new Date(),
    last_published_by: blogData.username,
    modified_date: new Date(),
    modified_by: blogData.username,
  };

  return commonPutApiCall(`${updateApiUrl}/${blogData.savedBlogId}`, data);
};
