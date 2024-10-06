"use client"

import DashboardGuard from "@/components/guards/DashboardGuard"
import Header from "@/components/layouts/Header"
import LogoutButton from "@/components/LogoutButton"
import DocumentFormModal from "@/components/modals/DocumentFormModal"
import DocumentsTable from "@/components/pages/dash/DocumentsTable"
import UserAside from "@/components/pages/dash/UserAside"
import { Plus } from "lucide-react"

export default function Home() {
  return (
    <DashboardGuard>
      <div className="min-h-screen pb-[40px] bg-[#f5f5f5] ">
        <Header>
          <LogoutButton />
        </Header>

        <div className="flex flex-col lg:flex-row gap-[20px] py-[40px]  container mx-auto px-[8px] sm:px-[14px]">
          <UserAside />

          <div className="flex flex-col flex-1 gap-[20px]">
            <div className="flex-1 flex flex-col min-h-[300px] p-[20px]  bg-white rounded-md border border-gray-200">
              <div className="flex justify-between">
                <h2 className="font-medium text-base text-defaultText/70">Documentos</h2>

                <DocumentFormModal
                  trigger={
                    <button className="bg-[#222] hidden lg:flex   items-center gap-1 px-[30px]  rounded-md py-[10px]">
                      <span className="text-white text-xs font-medium">Adicionar</span>

                      <Plus size={16} className="text-white" />
                    </button>
                  }
                />
              </div>

              <div className="mt-[24px] flex-1">
                <DocumentsTable />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed left-0 bottom-0 w-full  lg:hidden flex items-center justify-center h-[70px] bg-white">
          <DocumentFormModal
            trigger={
              <button className="bg-[#222] w-[220px] text-white text-sm font-medium px-[12px] rounded-md py-[10px]">
                Adicionar
              </button>
            }
          />
        </div>
      </div>
    </DashboardGuard>
  )
}
