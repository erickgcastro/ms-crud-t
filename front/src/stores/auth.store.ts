import { IUser } from "@/types/user.type"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type Props = {
  user: IUser | null
  isAuthenticated: boolean
  isFetching: boolean
}

type Actions = {
  setUser: (data: IUser | null) => void
  updateUser: (data: Partial<IUser>) => void
  setIsFetching: (v: boolean) => void
}

export const useAuthStore = create(
  immer<Props & Actions>((set) => ({
    user: null,
    hasAnonymousToken: null,
    isAuthenticated: false,
    isBlocked: false,
    isFetching: true,

    setIsFetching: (v) =>
      set((state) => {
        state.isFetching = v
      }),
    setUser: (data) =>
      set((state) => {
        state.user = data
        state.isAuthenticated = !!data?.id
      }),
    updateUser: (data) =>
      set((state) => {
        if (state.user === null) return
        state.user = { ...state.user, ...data }
      }),
  }))
)
