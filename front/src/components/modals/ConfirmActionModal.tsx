"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useRef, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

type Props = {
  trigger?: ReactNode
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => Promise<any>
}

const ConfirmActionModal = ({
  trigger,
  isOpen,
  defaultOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
}: Props) => {
  const btnCloseRef = useRef<HTMLButtonElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await onConfirm()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      if (btnCloseRef.current) btnCloseRef.current?.click()
      setIsLoading(false)
    }
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen} defaultOpen={defaultOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="transition-opacity fixed inset-0 z-[100] bg-black/40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] z-[101] translate-y-[-50%] focus:outline-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-[380px] min-h-[300px]  h-max relative flex flex-col gap-[50px] justify-between py-[30px] p-[40px] bg-white shadow-md rounded-md border  border-border-2"
          >
            <div className="pt-[20px]">
              <Dialog.Title className="text-xl text-center font-medium">
                {title}
              </Dialog.Title>

              <Dialog.Description className="text-center mt-[20px] text-sm text-defaultText/80">
                {description}
              </Dialog.Description>
            </div>

            <div className="flex gap-[10px]">
              <Dialog.Close
                ref={btnCloseRef}
                className="border border-[#222] w-full  text-sm font-medium px-[12px] rounded-md py-[10px]"
              >
                Cancel
              </Dialog.Close>
              <button
                onClick={handleSubmit}
                className="bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[10px]"
              >
                Confirm
              </button>
            </div>

            {isLoading && (
              <div className="absolute top-0 left-0 h-full w-full z-10 bg-white flex items-center justify-center">
                <div className="loader"></div>
              </div>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ConfirmActionModal
