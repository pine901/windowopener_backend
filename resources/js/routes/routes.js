import { lazy } from 'react';


export default [
  {
    path: 'dashboard',
    component: lazy(() => import('../pages/Dashboard')),
    exact: true,
  },
  {
    path: 'users',
    component: lazy(() => import('../pages/Users')),
    exact: true,
  },
  {
    path: 'user_logs',
    component: lazy(() => import('../pages/UserLogs')),
    exact: true,
  },
  {
    path: 'profile',
    component: lazy(() => import('../pages/Profile')),
    exact: true,
  },
  {
    path: 'devices',
    component: lazy(() => import('../pages/Devices')),
    exact: true,
  },
  {
    path: 'device_logs',
    component: lazy(() => import('../pages/DeviceLogs')),
    exact: true,
  },
]
