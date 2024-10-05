import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { IFormDTO, formDTO } from "./form.dto"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { createDocumentService } from "@/services/create-document.service"
import { useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { updateDocumentService } from "@/services/update-document.service"

type Props = {
  docId?: string
  defaultValues?: {
    name: string
    status: boolean
  }
}
const useDocumentFormModal = ({ docId, defaultValues }: Props) => {
  const queryClient = useQueryClient()

  const btnCloseRef = useRef<HTMLButtonElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormDTO>({
    resolver: zodResolver(formDTO),
    defaultValues: {
      name: defaultValues?.name,
      status: defaultValues?.status ?? false,
    },
  })

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (docId) {
        await updateDocumentService({ id: docId, data: formData })
      } else {
        await createDocumentService(formData)
      }
      queryClient.invalidateQueries({ queryKey: ["documents"] })
      if (btnCloseRef.current) {
        btnCloseRef.current.click()
      }
      toast.success("Documento " + (docId ? "atualizado " : "criado"))
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
    watch,
    setValue,
    btnCloseRef,
  }
}

export default useDocumentFormModal
