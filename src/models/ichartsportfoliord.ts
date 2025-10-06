// Struktur data mentah dari API
// export interface ChartData {
//   bulan: number;           // bulan (contoh: 10)
//   tahun: number;           // tahun (contoh: 2023)
//   nominal_uang: number;    // nilai uang
//   nama_sekuritas: string;  // nama sekuritas
//   portfolio: string;       // nama portfolio (contoh: Dana Ihsan)
// }
// export interface TransformedData {
//   bulan: string; 
//   [portfolio: string]: string | number; 
// }

export interface ChartData {
  tanggal:string              // hari (contoh: 25)
  bulan: number;           // bulan (contoh: 10)
  tahun: number;           // tahun (contoh: 2023)
  nominal_uang: number;    // nilai uang
  nama_sekuritas: string;  // nama sekuritas
  portfolio: string;       // nama portfolio (contoh: Dana Ihsan)
}
export interface TransformedData {
  tanggal: string
  hari: number
  bulan: number
  tahun: number
  [portfolio: string]: string | number
}