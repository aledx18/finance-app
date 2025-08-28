import Link from 'next/link'

export default function HeaderLogo() {
  return (
    <Link href='/'>
      <div className='items-center hidden lg:flex'>
        <h1>xd!</h1>
        <p className='font-semibold text-2xl ml-2.5'>Saas Finance</p>
      </div>
    </Link>
  )
}
