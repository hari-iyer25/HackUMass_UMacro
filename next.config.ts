import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    missingSuspenseWithCSRBailout: false,
};

export default nextConfig;
