export const NavndUnitFormatted = (nilai : string) => {
    if(!nilai) return ""
    //const bersih = nilai.replace(/[^0-9,]/g,"").replace(",",".")
    const angka = Number(nilai)
    if(isNaN(angka)) return ""
    return new Intl.NumberFormat("en-US",{
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    }).format(angka)
}

export const IDFormatted = (num: string) => {
    if(!num) return ""
    const angka = num.replace(/\D/g,"")
    return new Intl.NumberFormat("id-ID").format(Number(angka))
}