import { IDocument } from "@/types/document.type"
import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"

type Props = {
  id: string
  data: {
    name?: string
    status?: boolean
  }
}

export const updateDocumentService = async (props: Props): Promise<IDocument> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.put("/users/documents/" + props.id, props.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
