import { type FC } from 'react'

import { HeaderSidebarToggler } from '@/components/common/header-sidebar-toggler'
import { HeaderFullScreenToggler } from '@/components/common/header-fullscreen-toggler'
import { HeaderNotifications } from '@/components/common/header-notifications'
import { HeaderAccountAvatar } from '@/components/common/header-account-avatar'
import { HeaderSettings } from '@/components/common/header-settings'

interface ComponentProps {}

const DashboardHeader: FC<ComponentProps> = ({}) => {
  return (
    <nav className='w-full h-full flex items-center justify-between px-4'>
      <div>
        <HeaderSidebarToggler />
      </div>
      <div className='h-full flex items-center gap-4'>
        <HeaderNotifications />
        <HeaderSettings />
        <HeaderFullScreenToggler />
        <HeaderAccountAvatar />
      </div>
    </nav>
  )
}

export { DashboardHeader }
