/** @type {import('next').NextConfig} */

const path = require('path');
const { i18n } = require('./next-i18next.config.js');


const nextConfig = {
  i18n,
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src')],
    prependData: `@import 'styles/mixin.scss';`,
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/nostr.json',
        destination: '/api/.well-known/nostr.json',
      },
    ];
  },
};

module.exports = nextConfig;
