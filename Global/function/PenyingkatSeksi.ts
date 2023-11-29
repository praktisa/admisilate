interface PenyingkatSeksi {
    [key: string]: string
}

export default function PenyingkatSeksi(Seksi: any) {



    const SeksiPanjang: PenyingkatSeksi =
    {
        'Subbagian Umum dan Kepatuhan Internal': 'SUKI',
        'Seksi Penjaminan Kualitas Data': 'PKD',
        'Seksi Pemeriksaan, Penilaian, dan Penagihan': 'P3',
        'Seksi Pelayanan': 'PLYN',
        'Fungsional Pemeriksa Pajak': 'FPP',
        'Seksi Pengawasan I': 'WAS I',
        'Seksi Pengawasan II': 'WAS II',
        'Seksi Pengawasan III': 'WAS III',
        'Seksi Pengawasan IV': 'WAS IV',
        'Seksi Pengawasan V': 'WAS V',
        'Seksi Pengawasan VI': 'WAS VI',
    }


    let HasilSingkat = SeksiPanjang[Seksi]

    // return HasilSingkat

    if (HasilSingkat) {

        return HasilSingkat
    } else {
        return 'Seksi Tidak Ditemukan'
    }
}