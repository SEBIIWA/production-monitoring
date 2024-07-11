import { type FC } from 'react'
import { Bell } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface ComponentProps {}

const HeaderNotifications: FC<ComponentProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Bell size={21} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>this is designated for notificaiton center.</PopoverContent>
    </Popover>
  )
}

export { HeaderNotifications }
