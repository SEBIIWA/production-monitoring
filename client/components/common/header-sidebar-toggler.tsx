import { type FC } from 'react'
import { PanelRightClose, PanelRightOpen } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useDrawer } from '@/provider/drawer.provider'

interface ComponentProps {}

const HeaderSidebarToggler: FC<ComponentProps> = ({}) => {
  const { sidebarState, toggleSidebar } = useDrawer()

  return (
    <Button size='icon' variant='ghost' onClick={toggleSidebar}>
      {sidebarState ? <PanelRightClose size={21} /> : <PanelRightOpen size={21} />}
    </Button>
  )
}

export { HeaderSidebarToggler }
