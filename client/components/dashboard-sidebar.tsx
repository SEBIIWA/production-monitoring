import { type FC } from 'react'

import { DashboardLogo } from '@/components/common/dashboard-logo'

interface ComponentProps {}

const DashboardSideBar: FC<ComponentProps> = ({}) => {
  return (
    <aside className='sticky inset-0'>
      <DashboardLogo />
    </aside>
  )
}

export { DashboardSideBar }
