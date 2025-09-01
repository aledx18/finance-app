import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']

export const useCreateAccount = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json })
      console.log('Posting to:', response.url)
      return await response.json()
    },
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  return mutation
}
