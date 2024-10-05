"use client"

import classnames from "classnames"

import type { IDocument } from "@/types/document.type"
import useInfiniteScrollQuery from "@/components/hooks/useInfiniteScrollQuery"
import { getDocumentsByUserService } from "@/services/get-documents-by-user.service"
import ConfirmActionModal from "@/components/modals/ConfirmActionModal"
import { useQueryClient } from "@tanstack/react-query"
import { deleteDocumentService } from "@/services/delete-document.service"
import DocumentFormModal from "@/components/modals/DocumentFormModal"

const DocumentsTable = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, hasNextPage, inViewRef } = useInfiniteScrollQuery<IDocument>({
    queryFn: ({ pageParam = 1 }) =>
      getDocumentsByUserService({ page: pageParam, limit: 10 }),
    queryKey: ["documents"],
    pageLimit: 10,
    initialPageParam: 1,
  })

  const handleDeleteDocument = async (id: string) => {
    await deleteDocumentService(id)
    queryClient.invalidateQueries({ queryKey: ["documents"] })
  }

  if (isLoading) {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="loader" style={{ width: 35, height: 35 }}></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <span className="text-center text-defaultText/90">
          Looks like you don&apos;t have any documents yet
        </span>
      </div>
    )
  }

  return (
    <div>
      <table className="w-full">
        <thead className="">
          <tr className="">
            <th className="text-xs pl-[10px] text-start text-defaultText font-semibold  py-[10px]">
              Name
            </th>
            <th className="text-xs text-start text-defaultText font-semibold">Status</th>
            <th className="text-xs text-defaultText font-semibold pr-[10px]"></th>
          </tr>
        </thead>

        <tbody>
          {data.map((doc, i) => {
            return (
              <tr key={i} className="border-t border-gray-200">
                <td className="pl-[10px] py-[12px] min-w-[200px] w-[250px]">
                  <span className=" font-medium text-sm ">{doc.name}</span>
                </td>

                <td className=" py-[12px]  w-[50px]">
                  <span
                    className={classnames(" text-sm font-semibold", {
                      "text-red-500": !doc.status,
                      "text-green-500": doc.status,
                    })}
                  >
                    {String(doc.status)}
                  </span>
                </td>

                <td className=" py-[12px] w-[150px]  min-w-[150px] max">
                  <div className="flex w-full items-center gap-[10px] justify-end ">
                    <DocumentFormModal
                      docId={doc.id}
                      defaultValues={{ name: doc.name, status: doc.status }}
                      trigger={
                        <button className="px-[14px] text-sm font-normal hover:underline">
                          editar
                        </button>
                      }
                    />
                    <ConfirmActionModal
                      title="Excluir Documento"
                      description="Tem certeza de que deseja excluir este documento? Esta ação é irreversível e o documento será permanentemente removido."
                      onConfirm={() => handleDeleteDocument(doc.id)}
                      trigger={
                        <button className="px-[14px] text-sm font-normal hover:underline">
                          excluir
                        </button>
                      }
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {hasNextPage && (
        <div ref={inViewRef} className="flex pt-[30px] items-center justify-center">
          <div className="loader" style={{ width: 25, height: 25 }}></div>
        </div>
      )}
    </div>
  )
}

export default DocumentsTable
