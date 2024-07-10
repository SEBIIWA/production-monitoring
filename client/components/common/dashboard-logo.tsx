import { type FC } from 'react'

interface ComponentProps {}

const DashboardLogo: FC<ComponentProps> = ({}) => {
  return (
    <div className='flex items-start h-16 border-b border-dashed border-background/30 p-4 text-primary-foreground'>
      <p>LOGO</p>
    </div>
  )
}

export { DashboardLogo }
