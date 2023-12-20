import ApprovalStatus from "../../../assets/svg/ApprovalStatusIcon.svg";
import EventsIcon from "../../../assets/svg/Event.svg";
import HamburgerMenuIcon from "../../../assets/svg/HamburgerMenuIcon.svg";
import PollIcon from "../../../assets/svg/PollIcon.svg";
import PostIconMenu from "../../../assets/svg/PostsIconmenu.svg";
import QuizIcon from "../../../assets/svg/QuizIcon.svg";
import CourseIcon from "../../../assets/svg/ReadBook.svg";
import SitesIcon from "../../../assets/svg/SitesIcon.svg";
import UsersIcon from "../../../assets/svg/UsersIcons.svg";
import VideoIcon from "../../../assets/svg/VODIcon.svg";
import ArticleIcon from "../../../assets/svg/articleIcon.svg";
import CookieIcon from "../../../assets/svg/cookieIcon.svg";
import FooterMenuUpdated from "../../../assets/svg/footermenuupdated.svg";
import HeaderMenuUpdated from "../../../assets/svg/headermenuupdated.svg";
import MediaIcon from "../../../assets/svg/mediaIcon.svg";
import MyDashboardIcon from "../../../assets/svg/myDashboardIcon.svg";
import PagesIcon from "../../../assets/svg/pagesIcon.svg";

export const MenuData = [
  {
    Title: "dashboard",
    id: "dashboard",
    category: "dashboard",
    subCategory: "",
    Menu: [
      {
        MenuName: "My Dashboard",
        Icon: MyDashboardIcon,
        url: "/dashboard",
        id: "dashboard",
        category: "dashboard",
        subCategory: "",
      },
    ],
  },
  // not moving this changes to staging

  // {
  //   url: '/task-listing',
  //   Title: 'tasklisting',
  //   id: 'tasklisting',
  //   // roles: ['author'],
  //   category: 'tasklisting',
  //   subCategory: '',
  //   Menu: [
  //     {
  //       MenuName: 'Task Listing',
  //       Icon: task,
  //       url: '/task-listing',
  //       id: 'Task Listing',
  //       category: 'tasklisting',
  //       subCategory: '',
  //     },
  //   ],
  // },
  {
    Title: "pages",
    id: "page",
    url: "/page-list",
    Menu: [
      {
        MenuName: "Pages",
        Icon: PagesIcon,
        url: "/page-list",
        id: "pages",
        category: "page",
        subCategory: "",
      },
    ],
  },
  {
    url: "",
    Title: "content",
    id: "content",
    Menu: [
      {
        MenuName: "Article",
        Icon: ArticleIcon,
        url: "/content/article",
        id: "article",
        category: "content",
        subCategory: "article",
      },
      {
        MenuName: "VOD",
        Icon: VideoIcon,
        url: "/content/vod",
        category: "content",
        subCategory: "vod",
        id: "vod",
      },
      {
        MenuName: "Quiz",
        Icon: QuizIcon,
        url: "/content/quiz",
        category: "content",
        subCategory: "quiz",
        id: "quiz",
      },
      {
        MenuName: "Poll",
        Icon: PollIcon,
        url: "/content/poll",
        category: "content",
        subCategory: "poll",
        id: "poll",
      },
      {
        MenuName: "Events",
        Icon: EventsIcon,
        url: "/content/event",
        category: "content",
        subCategory: "event",
        id: "events",
      },
      {
        MenuName: "Courses",
        Icon: CourseIcon,
        url: "/content/course",
        category: "content",
        subCategory: "",
        id: "course",
      },
      // {
      //   MenuName: 'Community',
      //   Icon: Community,
      //   url: '/content/community',
      //   category: 'content',
      //   subCategory: '',
      //   id: 'Community',
      // },
    ],
  },
  {
    Title: "Community",
    id: "community",
    roles: ["admin", "Super Admin"],
    Menu: [
      // {
      //   MenuName: 'Community',
      //   Icon: usersIcon3,
      //   url: '/community/members',
      //   id: 'community_member',
      //   category: 'Community',
      //   subCategory: 'members',
      // },
      {
        MenuName: "Community",
        Icon: SitesIcon,
        url: "/community/space",
        id: "community_space",
        category: "Community",
        subCategory: "spaces",
        roles: ["admin", "Super Admin"],
      },
      // {
      //   MenuName: 'Community',
      //   Icon: SitesIcon,
      //   url: '/community/reports',
      //   id: 'community_reports',
      //   category: 'Community',
      //   subCategory: 'reports',
      //   roles: ['admin', 'Super Admin'],
      // },
    ],
  },
  {
    url: "",
    Title: "post",
    id: "post",

    Menu: [
      {
        MenuName: "All Posts",
        Icon: PostIconMenu,
        url: "/post/social-share-list",
        id: "all_posts",
        category: "Post",
        subCategory: "",
      },
    ],
  },
  {
    url: "/user-management/user-list",
    Title: "user_management",
    id: "usermanagement",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Users",
        Icon: UsersIcon,
        url: "/user-management/user-list",
        id: "users",
        category: "UserManagement",
        subCategory: "users",
      },
    ],
  },
  {
    url: "/workflow/workflow-list",
    Title: "workflow",
    id: "workflow",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "workflow management",
        Icon: ApprovalStatus,
        url: "/workflow/workflow-list",
        id: "workflow_management",
        category: "Workflow",
        subCategory: "",
      },
    ],
  },
  {
    url: "",
    Title: "menu",
    id: "menu",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Menu",
        Icon: HamburgerMenuIcon,
        url: "/navtree",
        id: "menu",
        category: "Menu",
        subCategory: "",
        roles: ["admin"],
      },
    ],
  },
  {
    url: "",
    Title: "site_setting",
    id: "sitesetting",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Footer Setting",
        Icon: FooterMenuUpdated,
        url: "/site-setting/footer-setting",
        id: "Footer_Setting",
        category: "SiteSetting",
        subCategory: "FooterSetting",
      },
      {
        MenuName: "Media Handle",
        Icon: MediaIcon,
        url: "/site-setting/media-handle",
        id: "media_handle",
        category: "SiteSetting",
        subCategory: "MediaHandle",
      },
      {
        MenuName: "Cookie Policy",
        Icon: CookieIcon,
        url: "/site-setting/cookie-setting",
        id: "cookie_policy",
        category: "SiteSetting",
        subCategory: "CookieSetting",
      },
      {
        MenuName: "Header Setting",
        Icon: HeaderMenuUpdated,
        url: "/site-setting/header-setting",
        id: "header_setting",
        category: "SiteSetting",
        subCategory: "HeaderSetting",
      },
      {
        MenuName: "Global Setting",
        Icon: HeaderMenuUpdated,
        url: "/site-setting/global-setting",
        id: "global_setting",
        category: "SiteSetting",
        subCategory: "GlobalSetting",
      },
    ],
  },
  {
    Title: "Sites",
    id: "site",
    roles: ["admin"],
    Menu: [
      {
        MenuName: "Sites",
        Icon: SitesIcon,
        url: "/sites/site-listing",
        id: "Sites",
        roles: ["admin"],
        category: "Site",
        subCategory: "Sites",
      },
    ],
  },
];
export const headerMenus = ["dashboard", "pages", "user_management", "post", "menu", "sites"];
export const tagData = [
  { title: "Fifa" },
  { title: "Cricket" },
  { title: "Australia" },
  { title: "Fifa" },
  { title: "Cricket" },
  { title: "Australia" },
];

export const categoryData = [
  { title: "Article" },
  { title: "VOD (Video on Demand)" },
  { title: "Quiz" },
  { title: "Poll" },
  { title: "Events" },
];

export const DrawerWidth = 250;
