"use client"

import InputText from "@/components/InputText"
import {
  Close as DialogClose,
  Title as DialogTitle,
  Description as DialogDescription,
} from "@radix-ui/react-dialog"
import { Check, X as Close } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { useMediaQuery } from "react-responsive"
import { motion } from "framer-motion"

import useDocumentFormModal from "./useDocumentFormModal"
import { ReactNode } from "react"
import classNames from "classnames"
import { twMerge } from "tailwind-merge"

type Props = {
  trigger: ReactNode
  docId?: string
  defaultValues?: {
    name: string
    status: boolean
  }
}

const DocumentFormModal = ({ trigger, defaultValues, docId }: Props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

  const {
    errors,
    isSubmitting,
    btnCloseRef,
    onSubmit,
    register,
    reset,
    watch,
    setValue,
  } = useDocumentFormModal({ docId, defaultValues })

  const status = watch("status")

  return (
    <Dialog.Root onOpenChange={(v) => !v && reset()}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="transition-opacity fixed inset-0 z-[100] bg-black/40" />
        <Dialog.Content
          className={twMerge(
            "z-[101] fixed focus:outline-none",
            classNames({
              " top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ": isDesktop,
              "bottom-0 left-0 h-[100%] w-[100%]  flex items-end": !isDesktop,
            })
          )}
        >
          <motion.div
            initial={{
              opacity: isDesktop ? 0 : undefined,
              height: !isDesktop ? 0 : undefined,
            }}
            animate={{ opacity: 1, height: !isDesktop ? "100%" : undefined }}
            className={classNames("bg-white  text-defaultText flex flex-col w-screen ", {
              [twMerge(
                "rounded-md max-h-screen border border-border-2 shadow-md overflow-hidden max-w-[500px] min-h-[450px]"
              )]: isDesktop,
            })}
          >
            <div className="p-[10px] py-[14px] h-[50px]  border-b border-border-2 relative flex items-center justify-center ">
              <DialogTitle className="text-sm text-defaultText font-semibold">
                Adicionar documento
              </DialogTitle>
              {!isSubmitting && (
                <DialogClose
                  className={classNames(
                    "p-[10px] right-1 absolute top-[50%] translate-y-[-50%]",
                    {
                      "right-0": isDesktop,
                      "left-0": !isDesktop,
                    }
                  )}
                >
                  <Close size={isDesktop ? 18 : 20} className="text-defaultText/80" />
                </DialogClose>
              )}
            </div>

            <DialogDescription className="hidden" />

            <form
              onSubmit={onSubmit}
              className={twMerge(
                "pt-[60px] px-[14px] relative flex-1 flex flex-col justify-between",
                classNames({
                  "pt-[40px]": isDesktop,
                })
              )}
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
                  <span className="font-xs font-medium">Status</span>
                  <div className="mt-[10px] flex flex-col ">
                    <button
                      type="button"
                      className="flex  items-center gap-[10px] py-[10px] "
                      onClick={() => setValue("status", true)}
                    >
                      <span
                        className={classNames(
                          "flex items-center justify-center h-[14px] bg-[#222] aspect-square rounded-full",
                          { "opacity-0": !status }
                        )}
                      >
                        <Check size={10} className="text-white" />
                      </span>
                      <span>True</span>
                    </button>
                    <button
                      type="button"
                      className="flex  items-center gap-[10px] py-[10px]"
                      onClick={() => setValue("status", false)}
                    >
                      <span
                        className={classNames(
                          "flex items-center justify-center h-[14px] bg-[#222] aspect-square rounded-full",
                          { "opacity-0": status }
                        )}
                      >
                        <Check size={10} className="text-white" />
                      </span>
                      <span>False</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="py-[10px]">
                <button
                  type="submit"
                  className="bg-[#222] w-full text-white text-sm font-medium px-[12px] rounded-md py-[12px]"
                >
                  Adicionar
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

export default DocumentFormModal
