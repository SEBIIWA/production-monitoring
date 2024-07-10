'use client'

import type { JSX, ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { drawerStore, DrawerStoreType } from '@/provider/store/drawer.store'

interface ComponentProps {
  children: ReactNode
}

const DrawerContext = createContext<DrawerStoreType>(drawerStore)

function DashboardProvider({ children }: ComponentProps): JSX.Element {
  const [sidebarState, setSidebarState] = useState<boolean>(drawerStore.sidebarState)

  const toggleSidebar = () => {
    setSidebarState(!sidebarState)
    window.localStorage.setItem('sidebarState', JSON.stringify(!sidebarState))
    console.log('sidebarState', sidebarState)
  }

  return <DrawerContext.Provider value={{ sidebarState, toggleSidebar }}>{children}</DrawerContext.Provider>
}

const useDrawer = () => useContext(DrawerContext)

export { DashboardProvider, useDrawer }
