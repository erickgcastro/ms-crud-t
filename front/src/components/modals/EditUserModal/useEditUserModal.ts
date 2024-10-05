import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { formDTO, IFormDTO } from "./form.dto"
import { useAuthStore } from "@/stores/auth.store"
import { updateUserService } from "@/services/update-user.service"

const useEditUserModal = () => {
  const { user, updateUser } = useAuthStore()
  const btnCloseRef = useRef<HTMLButtonElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormDTO>({
    resolver: zodResolver(formDTO),
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  })

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await updateUserService(formData)
      updateUser(formData)
      if (btnCloseRef.current) {
        btnCloseRef.current.click()
      }
      toast.success("Perfil atualizado")
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    }
  })

  return {
    errors,
    isSubmitting,
    register,
    reset,
    onSubmit,
    btnCloseRef,
  }
}

export default useEditUserModal
