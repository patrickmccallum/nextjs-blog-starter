import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'logo.clearbit.com',
            port: '',
        }],
    }
}

const withMDX = createMDX({
    options: {},
})

export default withMDX(nextConfig)
