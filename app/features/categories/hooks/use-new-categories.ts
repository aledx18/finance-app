import { create } from 'zustand'

interface NewCategoriesState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewCategories = create<NewCategoriesState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
