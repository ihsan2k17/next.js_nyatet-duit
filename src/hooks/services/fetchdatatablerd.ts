import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const fetchDataReksadana = async (
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const res = await axios.get("/api/portfolio/tables/reksadana", {
      withCredentials: true,
    })
    setLoading(false)
    return res.data?.data?.data || []
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      setError(error.response.data.message)
    } else {
      setError("Server error, coba lagi nanti")
    }
    setLoading(false)
    return []
  }
}
