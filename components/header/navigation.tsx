'use client'

import { usePathname, useRouter } from 'next/navigation'
import NavButton from '@/components/header/navButton'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { useMedia } from 'react-use'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'

const routes = [
  { name: 'Overview', href: '/' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Invoices', href: '/invoices' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Categories', href: '/categories' },
  { name: 'Settings', href: '/settings' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMedia('(max-width: 1024px)', false)

  const onCick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='font-normal bg-white/10 hover:bg-white/20
            hover:text-white outline-none text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent transition'
            onClick={() => setIsOpen(!isOpen)}>
            <Menu className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='px-2'>
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => (
              <Button
                className='w-full justify-start'
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                key={route.name}
                onClick={() => onCick(route.href)}>
                {route.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className='hidden items-center lg:flex gap-x-2 overflow-x-auto'>
      {routes.map((route) => (
        <NavButton
          key={route.name}
          href={route.href}
          label={route.name}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
}
