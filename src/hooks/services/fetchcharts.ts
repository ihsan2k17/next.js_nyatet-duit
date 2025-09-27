import { ChartData } from "@/models/ichartsportfoliord";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const fetchDatacharts = async (
    setalert: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>

) => {
    try {
        setLoading(true)
        const res = await axios.get("/api/portfolio/charts", {withCredentials: true})
        //const json: { data: ChartData[] } = await res.json();
        setLoading(false)
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setLoading(false)
            setalert(error.response.data.message)
        } else {
            setLoading(false)
            setalert("Server error, coba lagi nanti")
        }
    }
}