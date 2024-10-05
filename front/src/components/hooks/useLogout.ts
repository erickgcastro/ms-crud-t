"use client"

import { useAuthStore } from "@/stores/auth.store"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useQueryClient } from "@tanstack/react-query"

const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { setUser } = useAuthStore()

  const handleLogout = () => {
    router.push("/")
    Cookies.remove("access-token")
    setUser(null)
    queryClient.invalidateQueries()
  }

  return handleLogout
}

export default useLogout
