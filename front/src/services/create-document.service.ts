import { IDocument } from "@/types/document.type"
import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"

type Props = {
  name: string
  status: boolean
}

export const createDocumentService = async (props: Props): Promise<IDocument> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.post("/users/documents", props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
