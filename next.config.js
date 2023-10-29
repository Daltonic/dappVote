// next.config.js

module.exports = {
  images: {
    domains:['images.saymedia-content.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}
