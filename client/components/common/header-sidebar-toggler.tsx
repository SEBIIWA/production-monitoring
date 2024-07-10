import { type FC } from 'react'
import { BiMenu } from 'react-icons/bi'

import { Button } from '@/components/ui/button'

import { useDrawer } from '@/provider/drawer.provider'

interface ComponentProps {}

const HeaderSidebarToggler: FC<ComponentProps> = ({}) => {
  const { toggleSidebar } = useDrawer()

  return (
    <Button size='icon' variant='ghost' onClick={toggleSidebar}>
      <BiMenu size={21} />
    </Button>
  )
}

export { HeaderSidebarToggler }
