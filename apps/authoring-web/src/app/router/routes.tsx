import { Dashboard } from '@platformx/dashboard'
import { CreateUser, UserListing } from '@platformx/user-management'
import {
  WorkflowDetails,
  WorkflowManagement,
} from '@platformx/workflow-management'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteConfig } from './routes.type'
import { SitePage } from '@platformx/site-page'

import { CreateContent } from "@platformx/content"
import { FeatureFlagSetting } from "@platformx/site-setting"
import { GlobalSetting } from '../../../../../libs/site-setting/src'
export const routes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <Dashboard />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/Sitepage',
    element: (
      <ProtectedRoute
        category="dashboard"
        subCategory="dashboard"
        name="dashboard"
      >
        {' '}
        <SitePage />{' '}
      </ProtectedRoute>
    ),
  },
  {
    path: '/user-management/user-list',
    element: (
      <ProtectedRoute
        category="user-list"
        subCategory="user-list"
        name="user-list"
      >
        {' '}
        <UserListing></UserListing>
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
  {
    path: "/site-setting/feature-flag",
    element: (
      <ProtectedRoute category='SiteSetting' subCategory='GlobalSetting'>
        <FeatureFlagSetting />
      </ProtectedRoute>
    ),
  },
  {
    path: '/workflow/workflow-list',
    element: (
      <ProtectedRoute name="article" subCategory="article" category="content">
        <WorkflowManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: '/workflow/workflow-details',
    element: (
      <ProtectedRoute name="article" subCategory="article" category="content">
        <WorkflowDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: 'user-management/user-create',
    element: (
      <ProtectedRoute
        name="user"
        category="UserManagement"
        subCategory=""
        isHeader={false}
        isSideBar={false}
      >
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/content/create",
    element: (
      <ProtectedRoute name='quiz' subCategory='quiz' category='content'>
        <CreateContent />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/content",
  //   element: <ProtectedRoute category="content" subCategory="content" name="page" >  <Content></Content> </ProtectedRoute>,

  // },
  // {
  //   path: "/dashboard",
  //   element: <ProtectedRoute category="dashboard" subCategory="dashboard" name="dashboard" >  Dashboard </ProtectedRoute>,

  // },
  // {
  //   path: "content/article",
  //   element: (
  //     <ProtectedRoute name='article' subCategory='article' category='content'>
  //       <Content />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/error",
  //   element: <Error errorCode={404} errorMessage="Page not found" />,
  // }
]
