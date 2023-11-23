/** @type {import('next').NextConfig} */
const nextConfig = {
     async redirects() {
    return [
      {
        source: '/App/KendaraanDinas',
        destination: '/App/KendaraanDinas/Daftar',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
