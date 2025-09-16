import { InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<
  (typeof client.api.categories)[':id']['$delete']
>

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.categories[':id']['$delete']({
        param: { id }
      })
      return await response.json()
    },
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['category', { id }] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      //todo : invalidate summary and transactions
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return mutation
}
