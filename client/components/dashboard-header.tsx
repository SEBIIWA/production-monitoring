import { type FC } from 'react'
import { HeaderSidebarToggler } from '@/components/common/header-sidebar-toggler'

interface ComponentProps {}

const DashboardHeader: FC<ComponentProps> = ({}) => {
  return (
    <nav className='w-full h-full flex items-center justify-between px-4'>
      <HeaderSidebarToggler />
    </nav>
  )
}

export { DashboardHeader }
