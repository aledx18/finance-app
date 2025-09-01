'use client'

import z from 'zod'
import { accountsSelectSchema } from '@/db/schema'
import { useNewAccount } from '@/app/features/accounts/hooks/use-new-account'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetHeader
} from '@/components/ui/sheet'
import AccountForm from './account-form'
import { useCreateAccount } from '@/app/features/accounts/api/use-create-account'

const formSchema = accountsSelectSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount()

  const mutation = useCreateAccount()

  function onSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account</SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: '' }}
        />
      </SheetContent>
    </Sheet>
  )
}
