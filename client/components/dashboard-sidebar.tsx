import { type FC } from 'react'

import { DashboardLogo } from '@/components/common/dashboard-logo'
import { DashboardSideBarItems } from '@/components/common/dashboard-sidebar-items'

interface ComponentProps {}

const DashboardSideBar: FC<ComponentProps> = ({}) => {
  return (
    <aside className='sticky inset-0'>
      <DashboardLogo />
      <div>
        <DashboardSideBarItems />
      </div>
    </aside>
  )
}

export { DashboardSideBar }
