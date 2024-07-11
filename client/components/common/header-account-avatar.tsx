import { type FC } from 'react'
import Image from 'next/image'
import { FolderLock, ListTodo, LogOut, Settings, UserRound } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut } from '@/components/ui/dropdown-menu'

interface ComponentProps {}

const HeaderAccountAvatar: FC<ComponentProps> = ({}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='min-w-40 outline-none' asChild>
        <div className='flex items-center gap-4 border-l border-r bg-muted h-full px-2'>
          <div className='flex items-center gap-2'>
            <Image className='w-10 h-10 rounded-full' src='https://randomuser.me/api/portraits/women/10.jpg' alt='avatar' />
            <div className='flex flex-col items-start'>
              <p className='text-sm font-semibold'>Amira Bjaoui</p>
              <p className='text-xs text-gray-500'>Moderator</p>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-40'>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>
            <UserRound size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Tasks
          <DropdownMenuShortcut>
            <ListTodo size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>
            <Settings size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Lock Screen
          <DropdownMenuShortcut>
            <FolderLock size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>
            <LogOut size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { HeaderAccountAvatar }
