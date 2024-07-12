import { type FC } from 'react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'

import { SideBarNavigationItem, SideBarNavigationType, SIDEBAR_NAVIGATION } from '@/constant'

interface ComponentProps {}

const DashboardSideBarItems: FC<ComponentProps> = ({}) => {
  return (
    <nav className='p-4 grid gap-6'>
      {SIDEBAR_NAVIGATION.map((item: SideBarNavigationItem, index) => (
        <div key={index}>
          <p className='text-[#53565e] capitalize mb-1 text-sm'>{item.section}</p>
          <div>
            {item.children.map((item: SideBarNavigationType, index: number) => (
              <Link key={index} href={item.path} className='flex h-11 capitalize items-center gap-3 px-3 py-2 text-[#b6b9c8] hover:text-white text-sm animate-in animate-out transition-all'>
                {item.icon}
                {item.title}
                {item.badge && (
                  <Badge variant='destructive' className='ml-auto flex h-5 px-1 shrink-0 items-center justify-center rounded text-[10px]'>
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

export { DashboardSideBarItems }
