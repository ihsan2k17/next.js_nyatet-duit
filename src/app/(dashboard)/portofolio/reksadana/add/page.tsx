import Loading40 from '@/components/animations/loading40'
import React, { Suspense } from 'react'
import RDAddClient from './rdaddclient'

export const metadata = {
  title: "Reksadana",
  openGraph: {
    title: "Reksadana | Add",
    description: "Tambah Data Reksadana",
    type:"website",
  },
}
// mau bikin add jenis trans nya di bikin dropdown,
// rd_produk_id di bikin dropdown dari tabel rd_produk yg udh user tambahin sendiri dia mau invest di produk rd apa
// type dibikin statis aja isi nya PEMBELIAN, PENJUALAN, DIVIDEN
// rdn id nya ada di MASTER_REKENING bisa dibikin dropdown buat milih rekening dana nasabah nya di master rekening
const AddReksadana = () => {
    return (
        <Suspense fallback={<Loading40/>}>
            <RDAddClient/>
        </Suspense>
    )
}

export default AddReksadana
