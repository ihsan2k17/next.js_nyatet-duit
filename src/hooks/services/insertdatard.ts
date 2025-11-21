import { Dispatch, SetStateAction } from "react";
import axios from "axios"
import {capitalize} from "../iscapitalize";
import { IDFormatted } from "../isformatted";

export const InsertDataRD = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError : Dispatch<SetStateAction<string>>,
    setSuccess: Dispatch<SetStateAction<string>>,
    rdnid? : number|null,
    produkrdid? :number|null,
    tanggal? :Date|null,
    tahun?: number|null,
    norekrdn? : number|null,
    namaportfolio? :string|null,
    nominaluang?: number|string|null,
    nav?: number|string|null,
    jumlahunit? :number|string|null,
    type? : string|null,
    idportfolio? :number|null
) => {
    try {
        setLoading(true)
        let jenistransrdid: number|null = null;
        if(type === capitalize('Pembelian')) {
            jenistransrdid = 2
        } else if(type === capitalize('Penjualan')) {
            jenistransrdid = 1
        } else if(type === capitalize('Dividen')) {
            jenistransrdid = 2
        }
        const payload = {
            rdnid: rdnid ?? null,
            jenistransrdid : jenistransrdid ?? null,
            produkrdid: produkrdid ?? null,
            tgl: tanggal,
            tahun: tahun ?? null,
            norekrdn: norekrdn ?? null,
            namaportfolio: namaportfolio ?? null,
            nominaluang : nominaluang ?? null,
            nav: nav ?? null,
            jumlahunit : jumlahunit ?? null,
            type : type ?? null,
            idportfolio: idportfolio ?? null
        }
        const res = await axios.post("/api/portfolio/reksadana/add",
            payload,{withCredentials: true})
        setLoading(false)
        if(res.data.status === 'success') {
            setSuccess(`${namaportfolio}, sebesar "${IDFormatted(String(nominaluang))}". Berhasil di tambahin!`)
        } else {
            setError(`${namaportfolio} Gagal, coba cek lagi!`)
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message)
        } else {
        setError("Server error, coba lagi nanti")
        }
        setLoading(false)
    }
}