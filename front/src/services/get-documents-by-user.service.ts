import { serverApi } from "./api/server.api"
import Cookies from "js-cookie"
import { objectToQueryParams } from "@/components/helpers/object-to-query-params"
import { type IDocument } from "@/types/document.type"

type Props = {
  page: number
  limit: number
}

export const getDocumentsByUserService = async ({
  page,
  limit,
}: Props): Promise<IDocument[]> => {
  const token = Cookies.get("access-token")

  const { data } = await serverApi.get(
    "/users/documents" + objectToQueryParams({ page, limit }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return data
}
