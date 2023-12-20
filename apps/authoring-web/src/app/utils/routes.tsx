import ContentPreview from "../components/Common/ContentPreview";
import { CreatePoll } from "../components/Polls/CreatePoll";
import { CreateQuiz } from "../components/Quiz/CreateQuiz";
// import { ArticleListing } from '../pages/articles/article-list-view/ArticleListing';
// import ArticlePreview from '../pages/articles/article-preview/ArticlePreview';
import ArticlePreview from "../pages/Article/Components/ArticlePreview/ArticlePreview";

// import { CreateArticle } from '../pages/articles/CreateArticle';
import MainLayout from "../layouts/Dashboardlayout/component/MainLayout";
import DashboardLayout from "../layouts/Dashboardlayout/DashboardLayout";
import AccessDenied from "../pages/AccessDenied/AccessDenied";
import { CreateArticle } from "../pages/Article/CreateArticle/CreateArticle";
// import ArticlePreview from '../pages/articles/article-preview/ArticlePreview';
// import { CreateArticle } from '../pages/articles/CreateArticle';
import CreateSpace from "../components/Space/CreateSpace";
import AssetPicker from "../pages/assetPicker/AssetPicker";
import Assets from "../pages/assetPicker/Assets";
import CreateCourse from "../pages/Courses/CreateCourse";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import XDashboard from "../pages/Dashboard/X-Dashboard/index";
import HeaderCreation from "../pages/headerCreation";
import NavTreeCreation from "../pages/NavTree";
import EditPage from "../pages/Page/Components/EditPageContainer/EditPageContainer";
import PrelemPreview from "../pages/Page/PrelemPreview/PrelemPreview";
import PrelemSearch from "../pages/Page/PrelemSearch/SearchPrelem";
import PageListView from "../pages/PageList/PageList";
import PrelemInfo from "../pages/prelem-search/PrelemInfo";
import PrelemLayoutsList from "../pages/prelem-search/PrelemLayoutsList";
import PreviewPage from "../pages/previewPage";
import Content from "../pages/QuizPollEvents";
import SearchResults from "../pages/SearchResults/SearchResults";
import AddSite from "../pages/SiteCreation/AddSite/AddSite";
import SiteListing from "../pages/SiteCreation/SiteListing/SiteListing";
import CookieSetting from "../pages/SiteSetting/CookieSetting/CookieSetting";
import FooterSetting from "../pages/SiteSetting/FooterSetting/FooterSetting";
import GlobalSetting from "../pages/SiteSetting/GlobalSetting/GlobalSetting";
import HeaderSetting from "../pages/SiteSetting/HeaderSetting/HeaderSetting";
import MediaHandle from "../pages/SiteSetting/MediaHandle/MediaHandle";
import SocialShareList from "../pages/social-share/SocialShareList";
import Space from "../pages/SpaceManagement/Space";
import TaskList from "../pages/TaskListing/Index";
import TimeLineBlogs from "../pages/TimeLineBlogs/TimeLineBlogs";
import CreateUser from "../pages/UserManagement/CreateUser/CreateUser";
import Users from "../pages/UserManagement/Index";
import UserDetails from "../pages/UserManagement/Users/UserDetails";
import { CreateVod } from "../pages/vod/createVOD/CreateVod";
import VodPreview from "../pages/vod/vodPreview/VodPreview";
import WorkflowDetails from "../pages/Workflow/WorkflowDetails";
import WorkflowListing from "../pages/Workflow/WorkflowListing";
import ProtectedRoute from "../router/protectedRoute";
import { RouteConfig } from "../router/routes.types";
// import { DynamicContent } from '../pages/DynamicComponentBuilder/DynamicContent';
import Dashboard from "../pages/Dashboard/Index";
import { DynamicContentType } from "../pages/DynamicComponentBuilder/DynamicContentType";

const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        category='dashboard'
        subCategory=''
        allowedRoles={["admin", "author", "reviewer", "publisher", "editor"]}>
        <Dashboard />
        {/* <DynamicContent /> */}
        {/* <DynamicContentType/> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/x-dashboard",
    element: (
      <ProtectedRoute
        category='dashboard'
        subCategory=''
        allowedRoles={["admin", "author", "reviewer", "publisher", "editor"]}>
        <XDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/task-listing",
    element: (
      <ProtectedRoute
        category='Task Listing'
        subCategory=''
        hasSearch={false}
        allowedRoles={["admin", "author", "reviewer", "publisher", "editor"]}>
        <TaskList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/assets",
    element: (
      <ProtectedRoute category='public' subCategory='public' name='content'>
        <Assets />
      </ProtectedRoute>
    ),
  },
  {
    path: "/asset-picker",
    element: (
      <ProtectedRoute category='public' subCategory='public' name='content'>
        <AssetPicker />
      </ProtectedRoute>
    ),
  },

  {
    path: "page-list",
    element: (
      <ProtectedRoute name='pages' category='page' subCategory=''>
        <PageListView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-page",
    element: (
      <ProtectedRoute name='page' category='page' subCategory='' isSideBar={false} isHeader={false}>
        <EditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/preview-page/:device",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PreviewPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/layouts",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemLayoutsList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemSearch />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search/about",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemInfo />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prelem-search/preview",
    element: (
      <ProtectedRoute subCategory='' category='page' name='page' isSideBar={false} isHeader={false}>
        <PrelemPreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "content/create-article",
    element: (
      <ProtectedRoute
        name='article'
        category='content'
        subCategory='article'
        isSideBar={false}
        isHeader={false}>
        <CreateArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/article-update/:id",
    element: (
      <ProtectedRoute
        name='article'
        subCategory='article'
        category='content'
        isHeader={false}
        isSideBar={false}>
        <CreateArticle />
      </ProtectedRoute>
    ),
  },
  {
    path: "content/article",
    element: (
      <ProtectedRoute name='article' subCategory='article' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/article-preview",
    element: (
      <ProtectedRoute
        name='article'
        subCategory='article'
        category='content'
        isSideBar={false}
        isHeader={false}>
        <ArticlePreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-vod",
    element: (
      <ProtectedRoute
        subCategory='vod'
        name='vod'
        category='content'
        // isHeader={false}
        // isSideBar={false}
        hasSearch={false}>
        <CreateVod />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vod/create-vod/:id",
    element: (
      <ProtectedRoute name='vod' subCategory='vod' category='content' isHeader={false}>
        <CreateVod />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/vod",
    element: (
      <ProtectedRoute name='vod' subCategory='vod' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vod-preview",
    element: (
      <ProtectedRoute name='vod' subCategory='vod' category='content' isSideBar={false}>
        <VodPreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content-preview",
    element: (
      <ProtectedRoute
        name='content'
        category='content'
        subCategory='content-preview'
        isSideBar={false}
        isHeader={false}>
        <ContentPreview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-quiz",
    element: (
      <ProtectedRoute
        name='quiz'
        subCategory='quiz'
        category='content'
        // isHeader={false}
        // isSideBar={false}
        hasSearch={false}>
        <CreateQuiz />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/quiz",
    element: (
      <ProtectedRoute subCategory='quiz' name='quiz' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-poll",
    element: (
      <ProtectedRoute
        name='poll'
        subCategory='poll'
        category='content'
        // isHeader={false}
        // isSideBar={false}
        hasSearch={false}>
        <CreatePoll />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/poll",
    element: (
      <ProtectedRoute name='poll' subCategory='poll' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/quiz",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-event",
    element: (
      <ProtectedRoute
        name='event'
        subCategory='event'
        category='content'
        allowedRoles={["admin", "author", "content-manager", "editor"]}
        // isHeader={false}
        // isSideBar={false}
        hasSearch={false}>
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/event",

    element: (
      <ProtectedRoute
        name='event'
        subCategory='event'
        category='content'
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-course",
    element: (
      <ProtectedRoute
        name='course'
        subCategory=''
        category='content'
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}
        isHeader={false}
        isSideBar={false}>
        <CreateCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/course",
    element: (
      <ProtectedRoute
        name='course'
        subCategory=''
        category='content'
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/community",
    element: (
      <ProtectedRoute
        name='community'
        subCategory=''
        category='content'
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-navtree",
    element: (
      <ProtectedRoute name='navigation' category='menu' subCategory=''>
        <HeaderCreation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/navtree",
    element: (
      <ProtectedRoute
        name='navigation'
        category='menu'
        subCategory=''
        isSideBar={false}
        isHeader={true}>
        <NavTreeCreation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/social-share-list",
    element: (
      <ProtectedRoute name='page' category='public' subCategory='public'>
        <SocialShareList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-blog",
    element: (
      <ProtectedRoute
        name='page'
        category='public'
        subCategory='public'
        isHeader={false}
        isSideBar={false}>
        <TimeLineBlogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-management/user-list",
    element: (
      <ProtectedRoute name='user' category='UserManagement' subCategory='users' hasSearch={false}>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-management/user-create",
    element: (
      <ProtectedRoute
        name='user'
        category='UserManagement'
        subCategory=''
        isHeader={false}
        isSideBar={false}>
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "user-management/user-details",
    element: (
      <ProtectedRoute name='user' category='UserManagement' subCategory='users' hasSearch={false}>
        <UserDetails />
      </ProtectedRoute>
    ),
  },

  {
    path: "/site-setting/footer-setting",
    element: (
      <ProtectedRoute name='footer' category='SiteSetting' subCategory='FooterSetting'>
        <FooterSetting />
      </ProtectedRoute>
    ),
  },

  {
    path: "/site-setting/cookie-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='CookieSetting'>
        <CookieSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/media-handle",
    element: (
      <ProtectedRoute name='medis=a' category='SiteSetting' subCategory='MediaHandle'>
        <MediaHandle />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-listing",
    element: (
      <ProtectedRoute category='site' subCategory='Sites'>
        <SiteListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-creation",
    element: (
      <ProtectedRoute category='site' subCategory='Sites' isHeader={false} isSideBar={false}>
        <AddSite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sites/site-creation/:siteName",
    element: (
      <ProtectedRoute category='site' subCategory='Sites' isHeader={false} isSideBar={false}>
        <AddSite />
      </ProtectedRoute>
    ),
  },
  {
    path: "/site-setting/header-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='HeaderSetting'>
        <HeaderSetting />
      </ProtectedRoute>
    ),
  },

  {
    path: "/site-setting/global-setting",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
        <GlobalSetting />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/",
  //   element: (
  //      <ProtectedRoutename='page'
  //       allowedRoles={[
  //         "admin",
  //         "author",
  //         "content-manager",
  //         "reviewer",
  //         "publisher",
  //         "editor",
  //       ]}
  //     >
  //       <Home />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "access-denied",
    element: <AccessDenied />,
  },
  {
    path: "content",
    element: (
      <DashboardLayout>
        <MainLayout children={<Content />} />
      </DashboardLayout>
    ),
  },
  {
    path: "/search-results",
    element: (
      <ProtectedRoute category='public' subCategory='public'>
        <SearchResults />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-list",
    element: (
      <ProtectedRoute
        category='Workflow'
        subCategory=''
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}>
        <WorkflowListing />
      </ProtectedRoute>
    ),
  },
  {
    path: "/workflow/workflow-details",
    element: (
      <ProtectedRoute
        category='public'
        subCategory='public'
        isHeader={false}
        isSideBar={false}
        hasSearch={false}
        hasLogo={true}
        allowedRoles={["admin", "author", "content-manager", "reviewer", "publisher", "editor"]}>
        <WorkflowDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/community/space",
    element: (
      <ProtectedRoute
        name='space'
        category='Community'
        subCategory='spaces'
        hasSearch={false}
        allowedRoles={["admin"]}>
        <Space />
      </ProtectedRoute>
    ),
  },
  {
    path: "/community/create-space",
    element: (
      <ProtectedRoute
        name='space'
        category='public'
        subCategory='public'
        isHeader={false}
        isSideBar={false}>
        <CreateSpace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/:id",
    element: (
      <ProtectedRoute name='profile' subCategory='' category='content'>
        <Content />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create-profile",
    element: (
      <ProtectedRoute
        name='profile'
        subCategory=''
        category='content'
        // isHeader={false}
        // isSideBar={false}
        hasSearch={false}>
        <DynamicContentType />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: `/content/:id`,
  //   element: (
  //     <ProtectedRoute
  //       name='profile'
  //       subCategory=''
  //       category='content'
  //       // isHeader={false}
  //       // isSideBar={false}
  //       hasSearch={false}>
  //       <DynamicContentType />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/community/edit-space',
  //   element: (
  //     <ProtectedRoute
  //       name='space'
  //       category='public'
  //       subCategory='public'
  //       isHeader={false}
  //       isSideBar={false}
  //     >
  //       <CreateSpace />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/community/view-space',
  //   element: (
  //     <ProtectedRoute
  //       name='space'
  //       category='public'
  //       subCategory='public'
  //       isHeader={false}
  //       isSideBar={false}
  //     >
  //       <CreateSpace />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/community/members',
  //   element: (
  //     <ProtectedRoute
  //       name='member'
  //       category='public'
  //       subCategory='public'
  //       hasSearch={false}
  //     >
  //       <Members />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/community/create-member',
  //   element: (
  //     <ProtectedRoute
  //       name='space'
  //       category='public'
  //       subCategory='public'
  //       isHeader={false}
  //       isSideBar={false}
  //     >
  //       <CreateMember />
  //     </ProtectedRoute>
  //   ),
  // },
];
export default routes;
