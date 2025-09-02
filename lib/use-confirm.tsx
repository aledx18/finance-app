import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { JSX, useState } from 'react'

export const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  function confirm(): Promise<unknown> {
    return new Promise(function (resolve) {
      setPromise({ resolve })
    })
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(true)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(false)
    handleClose()
  }

  function ConfirmationDialog() {
    return (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title ?? 'Confirm'}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return [ConfirmationDialog, confirm]
}
