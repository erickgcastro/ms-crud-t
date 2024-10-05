import InputText from "@/components/InputText"
import {
  Close as DialogClose,
  Title as DialogTitle,
  Description as DialogDescription,
} from "@radix-ui/react-dialog"
import { Check, X as Close } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"

import { ReactNode } from "react"
import useEditUserModal from "./useEditUserModal"

type Props = {
  trigger: ReactNode
}

const EditUserModal = ({ trigger }: Props) => {
  const { errors, isSubmitting, btnCloseRef, onSubmit, register, reset } =
    useEditUserModal()

  return (
    <Dialog.Root onOpenChange={(v) => !v && reset()}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="transition-opacity fixed inset-0 z-[100] bg-black/40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] z-[101] translate-y-[-50%] focus:outline-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className=" w-screen max-w-[500px] min-h-[400px]  h-max relative flex flex-col gap-[50px] justify-between  bg-white shadow-md rounded-md border  border-border-2"
          >
            <div className="p-[10px] py-[14px] h-[50px]  border-b border-border-2 relative flex items-center justify-center ">
              <DialogTitle className="text-sm text-defaultText font-semibold">
                Editar perfil
              </DialogTitle>
              {!isSubmitting && (
                <DialogClose className="p-[10px]  absolute top-[50%] translate-y-[-50%] right-0">
                  <Close size={20} className="text-defaultText/80" />
                </DialogClose>
              )}
            </div>

            <DialogDescription className="hidden" />

            <form
              onSubmit={onSubmit}
              className="px-[14px] relative flex-1 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-[20px]">
                <div>
                  <InputText
                    placeholder="Name"
                    error={!!errors.name}
                    id="name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="pl-[5px] text-red-500 text-[11px] font-medium">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <InputText
                    placeholder="Email"
                    error={!!errors.email}
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="pl-[5px] text-red-500 text-[11px] font-medium">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="py-[10px]">
                <button
                  type="submit"
                  className="bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[12px]"
                >
                  Salvar
                </button>
              </div>

              {isSubmitting && (
                <div className="absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center">
                  <div className="loader"></div>
                </div>
              )}
            </form>
          </motion.div>

          <Dialog.Close ref={btnCloseRef} className="hidden" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default EditUserModal
