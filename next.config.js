/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'xuafikoxwdyzfuppnifu.supabase.co'
        ],
        unoptimized: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        missingSuspenseWithCSRError: false
    }
}

module.exports = nextConfig
