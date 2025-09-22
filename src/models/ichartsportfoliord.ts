// Struktur data mentah dari API
export interface ChartData {
  bulan: number;           // bulan (contoh: 10)
  tahun: number;           // tahun (contoh: 2023)
  nominal_uang: number;    // nilai uang
  nama_sekuritas: string;  // nama sekuritas
  portfolio: string;       // nama portfolio (contoh: Dana Ihsan)
}