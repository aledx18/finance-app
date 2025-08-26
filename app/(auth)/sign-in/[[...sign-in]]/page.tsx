import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader } from 'lucide-react'

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <ClerkLoading>
        <Loader className='animate-spin text-muted-foreground' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </div>
  )
}
