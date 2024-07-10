export interface DrawerStoreType {
  sidebarState: boolean
  toggleSidebar: () => void
}

export const drawerStore: DrawerStoreType = {
  sidebarState: true,
  toggleSidebar: () => {},
}
