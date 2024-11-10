import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "UMacro",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full bg-[#971B2F]">
            <body
                className={`antialiased h-full`}
            >
                {children}
            </body>
        </html>
    );
}
