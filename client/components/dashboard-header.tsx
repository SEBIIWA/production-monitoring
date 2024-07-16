import { type FC } from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { HeaderSidebarToggler } from '@/components/common/header-sidebar-toggler'
import { HeaderFullScreenToggler } from '@/components/common/header-fullscreen-toggler'
import { HeaderNotifications } from '@/components/common/header-notifications'
import { HeaderAccountAvatar } from '@/components/common/header-account-avatar'
import { HeaderSettings } from '@/components/common/header-settings'

interface ComponentProps {}

const DashboardHeader: FC<ComponentProps> = ({}) => {
  return (
    <nav className='w-full h-full flex items-center justify-between px-4'>
      <div className='flex items-center gap-4'>
        <HeaderSidebarToggler />
        <div className='relative ml-auto flex-1 md:grow-0'>
          <Search size={18} className='absolute left-2.5 top-[47%] -translate-y-[47%] text-muted-foreground' />
          <Input type='search' placeholder='Search...' className='pl-8 w-[320px]' />
        </div>
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
