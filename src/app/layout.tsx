import type { Metadata } from 'next'
import './globals.css'

import { GeistMono } from 'geist/font/mono'
import { cn } from '@/lib/style-utils'

export const metadata: Metadata = {
    // Put your sites URL here
    metadataBase: new URL('https://nextjs-blog-starter-mu.vercel.app/'),
    title: 'NextJS Starter Blog',
    description: 'Deploy your own blog with Next Fast',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn(GeistMono.className)}
        >
            <body>{children}</body>
        </html>
    )
}
