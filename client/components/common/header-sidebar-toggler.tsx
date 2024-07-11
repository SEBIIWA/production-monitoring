import { type FC } from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDrawer } from '@/provider/drawer.provider'

interface ComponentProps {}

const HeaderSidebarToggler: FC<ComponentProps> = ({}) => {
  const { toggleSidebar } = useDrawer()

  return (
    <Button size='icon' variant='ghost' onClick={toggleSidebar}>
      <Menu size={21} />
    </Button>
  )
}

export { HeaderSidebarToggler }
