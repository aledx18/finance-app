'use client'

import z from 'zod'
import { accountsSelectSchema } from '@/db/schema'
import AccountForm from './account-form'
import { useOpenAccount } from '@/app/features/accounts/hooks/use-open-account'
import { useEditAccount } from '@/app/features/accounts/api/use-edit-account'
import { useGetAccount } from '@/app/features/accounts/api/use-get-account'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader
} from '@/components/ui/sheet'
import { Loader2 } from 'lucide-react'
import { useDeleteAccount } from '../api/use-delete-account'
import { useConfirm } from '@/lib/use-confirm'

const formSchema = accountsSelectSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this transaction'
  )

  const accountQuery = useGetAccount(id)
  const editMutation = useEditAccount(id)
  const deleteMutation = useDeleteAccount(id)

  const isPending = editMutation.isPending || deleteMutation.isPending

  function onSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const isLoading = accountQuery.isLoading

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name
      }
    : {
        name: ''
      }

  const onDelete = async () => {
    const ok = await confirm()
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='animate-spin size-4' />
            </div>
          ) : (
            <AccountForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
