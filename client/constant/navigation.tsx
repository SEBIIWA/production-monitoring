import { type ReactElement } from 'react'

import { LayoutDashboard, ListTodo, Users, BarChartBig, Cuboid, Component, Route, Backpack } from 'lucide-react'

export type SideBarNavigationType = {
  title: string
  icon: ReactElement
  path: string
  badge?: number
}

export type SideBarNavigationItem = {
  section: string
  children: SideBarNavigationType[]
}

const SIDEBAR_NAVIGATION: SideBarNavigationItem[] = [
  {
    section: 'Dashboard',
    children: [
      {
        title: 'Dashboard',
        icon: <LayoutDashboard size={18} />,
        path: '/dashboard',
      },
      {
        title: 'updates',
        icon: <BarChartBig size={18} />,
        path: '/dashboard/updates',
      },
    ],
  },
  {
    section: 'development',
    children: [
      {
        title: 'Products',
        icon: <Cuboid size={18} />,
        path: '/dashboard/products',
      },
      {
        title: 'Components',
        icon: <Component size={18} />,
        path: '/dashboard/ingredients',
      },
    ],
  },
  {
    section: 'Task',
    children: [
      {
        title: 'Assemblies',
        icon: <Route size={18} />,
        path: '/dashboard/board',
      },
      {
        title: 'Tasks',
        icon: <ListTodo size={18} />,
        path: '/dashboard/tasks',
        badge: 105,
      },
    ],
  },
  {
    section: 'settings',
    children: [
      {
        title: 'users',
        icon: <Users size={18} />,
        path: '/dashboard/users',
      },
      {
        title: 'categories',
        icon: <Backpack size={18} />,
        path: '/dashboard/categories',
      },
    ],
  },
]

export { SIDEBAR_NAVIGATION }
