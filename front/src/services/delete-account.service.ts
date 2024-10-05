import { IDocument } from "@/types/document.type"
import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"

export const deleteAccountService = async (): Promise<IDocument> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
