import 'styles/globals.css'

import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  preload: true,
  subsets: ['latin'],
})

const interClassName = inter.className

export const metadata = {
  title: 'Create Next App',
  description: 'Admin Layout',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`h-full ${interClassName}`}>{children}</body>
    </html>
  )
}
