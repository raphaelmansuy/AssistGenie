import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Exclude files or directories from being processed by Next.js
    if (!isServer) {
      config.module.rules.push({
        test: /\.(stories|test)\.(tsx?|ts?)$/,
        loader: 'ignore-loader',
      })
    }

    return config
  },
  images: {
    domains: ['images.unsplash.com', 'tailwindui.com','avatars.githubusercontent.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
}

export default withContentlayer(nextConfig)
