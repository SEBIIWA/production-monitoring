import { type FC } from 'react'
import { Bell } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface ComponentProps {}

const HeaderNotifications: FC<ComponentProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Bell size={21} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This is designated for notificaiton center.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export { HeaderNotifications }
