import { type FC } from 'react'

interface ComponentProps {}

const DashboardSideBarItems: FC<ComponentProps> = ({}) => {
  return (
    <nav className=''>
      <button>
        <p>Overview</p>
      </button>
    </nav>
  )
}

export { DashboardSideBarItems }
