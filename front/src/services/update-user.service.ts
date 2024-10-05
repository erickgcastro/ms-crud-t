import { IDocument } from "@/types/document.type"
import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"

type Props = {
  name?: string
  email?: string
}

export const updateUserService = async (props: Props): Promise<IDocument> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.put("/users", props, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
