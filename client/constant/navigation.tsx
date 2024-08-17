import { type ReactElement } from 'react'

import { Calendar, LayoutDashboard, ListTodo, Mail, Users, SquareKanban, BarChartBig, Cuboid, Component } from 'lucide-react'

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
        path: '/dashboard/components',
      },
    ],
  },
  {
    section: 'Task',
    children: [
      {
        title: 'Board',
        icon: <SquareKanban size={18} />,
        path: '/dashboard/board',
      },
      {
        title: 'Calendar',
        icon: <Calendar size={18} />,
        path: '/dashboard/calendar',
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
    section: 'Communication',
    children: [
      {
        title: 'messages',
        icon: <Mail size={18} />,
        path: '/dashboard/messages',
        badge: 3,
      },
    ],
  },
  {
    section: 'Users',
    children: [
      {
        title: 'users',
        icon: <Users size={18} />,
        path: '/dashboard/users',
      },
    ],
  },
]

export { SIDEBAR_NAVIGATION }
