import { ChartData, TransformedData } from "@/models/ichartsportfoliord";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const fetchDatacharts = async (
    setalert: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>

) => {
    try {
        setLoading(true)
        const res = await axios.get("/api/portfolio/charts", {withCredentials: true})
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

// Transform raw API data → bentuk sesuai untuk Recharts
export const transformData = (raw: ChartData[]) :TransformedData[] => {
    const grouped: Record<string, TransformedData> = {};

    for (let i = 0; i < raw.length; i++) {
        const item = raw[i];
        const key = `${item.bulan}/${item.tahun}`;

        // Kalau bulan belum ada, inisialisasi dulu
        if (!grouped[key]) {
        grouped[key] = { bulan: key };
        }

        // Masukin portfolio + nominal ke bulan tsb
        grouped[key][item.portfolio] = item.nominal_uang;
    }

    // Balikin hasil dalam bentuk array
    return Object.values(grouped);
}