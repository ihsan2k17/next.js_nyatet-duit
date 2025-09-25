import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const fetchDatacard = async (
    setmodalalert: Dispatch<SetStateAction<boolean>>,
    setalert: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>

) => {
    try {
        setLoading(true)
        const res = await axios.get("/api/portfolio/rekening", {withCredentials: true})
        setLoading(false)
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
        setmodalalert(true)
        setLoading(false)
        setalert(error.response.data.message)
      } else {
        setmodalalert(true)
        setLoading(false)
        setalert("Server error, coba lagi nanti")
      }
    }
}