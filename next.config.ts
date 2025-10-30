import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com", // For Google profile images
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com", // For GitHub profile images
                port: "",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
