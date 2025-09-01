'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { accountsSelectSchema } from '@/db/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const formSchema = accountsSelectSchema.pick({
  name: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
  id?: string
  defaultValues?: FormValues
  onSubmit: (values: FormValues) => void
  onDelete?: () => void
  disabled?: boolean
}

export default function AccountForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled
}: Props) {
  const form = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema)
  })

  function handleDelete() {
    onDelete?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder='Enter name'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full' disabled={disabled}>
          {id ? 'Update Account' : 'Create Account'}
        </Button>
        {!!id && (
          <Button
            className='w-full'
            onClick={handleDelete}
            disabled={disabled}
            variant='outline'>
            <Trash className='mr-2 inline-block' />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  )
}
