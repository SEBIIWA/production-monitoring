import { type ReactElement } from 'react'

import { Calendar, LayoutDashboard, ListTodo, Mail, Users, SquareKanban } from 'lucide-react'

export type SideBarNavigationType = {
  title: string
  icon: ReactElement
  path: string
  badge?: number
  ability: string[]
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
        ability: ['*'],
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
        ability: ['*'],
      },
      {
        title: 'Calendar',
        icon: <Calendar size={18} />,
        path: '/dashboard/calendar',
        ability: ['*'],
      },
      {
        title: 'Tasks',
        icon: <ListTodo size={18} />,
        path: '/dashboard/tasks',
        badge: 105,
        ability: ['*'],
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
        ability: ['*'],
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
        ability: ['*'],
      },
    ],
  },
]

export { SIDEBAR_NAVIGATION }
