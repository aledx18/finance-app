import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import HeaderLogo from './header-logo'
import Navigation from './navigation'
import { Loader2 } from 'lucide-react'

export default function Header() {
  return (
    <header className='bg-gradient-to-b from-blue-400 to-cyan-500 px-4 py-8 lg:px-14 pb-36'>
      <div className='max-w-screen-2xl mx-auto'>
        <div className='flex w-full items-center justify-between mb-14'>
          <div className='flex items-center lg:gap-x-16'>
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoading>
            <Loader2 className='animate-spin size-6 text-slate-50' />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSwitchSessionUrl='/' />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}
