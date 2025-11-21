import axios from "axios"
import { Dispatch, SetStateAction } from "react"

export const fetchDDLreksadana = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError : Dispatch<SetStateAction<string>>,
    state : string,
    rdnid? : number | null,
    portfid? :number | null,
) => {
    try {
        setLoading(true)
        const res = await axios.post("/api/portfolio/reksadana/ddl",
            {
                state,
                rdnid :rdnid ?? null,
                portfid: portfid ?? null}, 
            {withCredentials: true}
        )
        setLoading(false)
        return res.data
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