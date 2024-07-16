import React, { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Home } from 'lucide-react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

interface ComponentProps {}

const PathIndicator: FC<ComponentProps> = () => {
  const { asPath } = useRouter()

  const paths = asPath.split('/').filter((path) => path !== '')

  return (
    <Breadcrumb className='px-6'>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${paths.slice(0, index + 1).join('/')}`} className='capitalize'>
                  <div className='flex items-center gap-2'>
                    {path === 'dashboard' && <Home size={18} />}
                    {path}
                  </div>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { PathIndicator }
