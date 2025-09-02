'use client'
import { DataTable } from '@/components/data-table'
import { useGetAccounts } from '@/app/features/accounts/api/use-getAccounts'
import { useDeleteAccount } from '@/app/features/accounts/api/use-delete-acount'
import { useNewAccount } from '@/app/features/accounts/hooks/use-new-account'
import { columns } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
  const newAccount = useNewAccount()
  const accountsQuery = useGetAccounts()
  const deleteAccount = useDeleteAccount()
  const accounts = accountsQuery.data || []

  const isDisabled = accountsQuery.isLoading || deleteAccount.isPending

  if (accountsQuery.isLoading) {
    return (
      <div className='max-w-screen-2xl mx-auto w-full -mt-28'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='h-[300px] w-full flex items-center justify-center'>
              <Loader2 className='size-6 animate-spin' />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='max-w-screen-2xl mx-auto w-full -mt-28'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gapy-y-2 lg:items-center flex justify-between'>
          <CardTitle className='text-xl font-bold line-clamp-1'>
            Accounts
          </CardTitle>
          <Button onClick={newAccount.onOpen} size='sm'>
            <Plus className='h-5 w-5' />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteAccount.mutate({ ids })
            }}
            disabled={isDisabled}
            filterkey='name'
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  )
}
