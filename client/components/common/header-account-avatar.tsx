import { type FC } from 'react'
import Image from 'next/image'
import { FolderLock, ListTodo, LogOut, Settings, UserRound } from 'lucide-react'

import { useAuth } from '@/provider/auth.provider'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut } from '@/components/ui/dropdown-menu'

interface ComponentProps {}

const HeaderAccountAvatar: FC<ComponentProps> = ({}) => {
  const { currentUser, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none' asChild>
        <div className='flex items-center gap-4 h-full px-2 cursor-pointer'>
          <div className='flex items-center gap-2 rounded-full border-[2px]'>
            <Image className='w-9 h-9 rounded-full' src='https://randomuser.me/api/portraits/women/10.jpg' width={40} height={40} alt='avatar' />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-48'>
        <DropdownMenuLabel>
          <div className='flex flex-col items-start'>
            <p className='text-sm font-semibold capitalize'>{currentUser.username}</p>
            <p className='text-xs text-gray-500'>{currentUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          Profile
          <DropdownMenuShortcut>
            <UserRound size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          Tasks
          <DropdownMenuShortcut>
            <ListTodo size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          Settings
          <DropdownMenuShortcut>
            <Settings size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          Lock Screen
          <DropdownMenuShortcut>
            <FolderLock size={18} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={logout}>
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
