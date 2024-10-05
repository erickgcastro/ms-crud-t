import { IDocument } from "@/types/document.type"
import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"

export const deleteDocumentService = async (id: string): Promise<IDocument> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.delete("/users/documents/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
