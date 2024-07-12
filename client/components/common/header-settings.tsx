import { type FC } from 'react'
import { Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

interface ComponentProps {}

const HeaderSettings: FC<ComponentProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Settings size={21} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Setting Drawer?</SheetTitle>
          <SheetDescription>This is designated for Settgins Drawer.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export { HeaderSettings }
