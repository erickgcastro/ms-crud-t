"use client"

import useLogout from "@/components/hooks/useLogout"
import ConfirmActionModal from "@/components/modals/ConfirmActionModal"
import EditUserModal from "@/components/modals/EditUserModal"
import { deleteAccountService } from "@/services/delete-account.service"
import { useAuthStore } from "@/stores/auth.store"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const UserAside = () => {
  const handleLogout = useLogout()
  const { user } = useAuthStore()

  const onDeleteAccount = async () => {
    await deleteAccountService()
    handleLogout()
    toast.success("Conta deletada")
  }

  return (
    <div className="max-h-max w-full lg:w-[250px] p-[20px] bg-white rounded-md border border-gray-200">
      <div>
        <div className="flex  items-center justify-center">
          <div className="bg-gray-200 h-[65px] border border-gray-200 aspect-square rounded-full flex items-center justify-center">
            <span className="font-bold text-base uppercase text-defaultText/70">
              {user?.name[0]}
              {user?.name[1]}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-[10px]">
          <span className="font-normal text-lg line-clamp-1">{user?.name}</span>
          <span className="font-normal text-xs line-clamp-1 text-defaultText/60">
            {user?.email}
          </span>
        </div>
      </div>

      <div className="mt-[40px] flex flex-row-reverse lg:flex-col gap-[20px] md:gap-[10px]">
        <EditUserModal
          trigger={
            <button className="bg-[#222]  border  border-[#222] w-full text-white text-xs font-medium px-[12px] rounded-md py-[10px]">
              Editar
            </button>
          }
        />
        <ConfirmActionModal
          title="Excluir Conta"
          onConfirm={onDeleteAccount}
          description="Tem certeza de que deseja excluir sua conta? Esta ação é permanente e todos os seus dados serão apagados. Não será possível recuperar sua conta após a exclusão"
          trigger={
            <button className="border border-red-500  w-full text-red-500 text-xs font-medium px-[12px] rounded-md py-[10px]">
              Excluir
            </button>
          }
        />
      </div>
    </div>
  )
}

export default UserAside
