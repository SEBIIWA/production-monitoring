import { type FC } from 'react'
import { Factory } from 'lucide-react'

interface ComponentProps {}

const DashboardLogo: FC<ComponentProps> = ({}) => {
  return (
    <div className='flex items-center justify-center gap-2 h-16 border-b border-dashed border-background/30 p-4 text-primary-foreground'>
      <p className='uppercase font-bold -tracking-tight'>Chainly</p>
    </div>
  )
}

export { DashboardLogo }
