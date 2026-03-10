import type { Metadata } from "next";
import { Inter, Syne, Bebas_Neue } from 'next/font/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import EnhancedCursor from "@/components/EnhancedCursor";
import { PageTransitionProvider } from "@/components/PageTransition";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const syne = Syne({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-syne',
    weight: ['400', '500', '600', '700', '800'],
});

const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-bebas',
    weight: '400',
});

export const metadata: Metadata = {
    title: "PATRICK — Data Analyst",
    description: "Data Analyst specializing in data cleaning, analysis, visualization, and business intelligence. Open to remote opportunities.",
    keywords: ["data analyst", "remote data analyst", "data visualization", "Excel", "SQL", "Python", "Power BI", "business intelligence", "portfolio"],
    authors: [{ name: "Patrick" }],
    icons: {
        icon: '/icon.png',
        apple: '/icon.png',
    },
    openGraph: {
        title: "PATRICK — Data Analyst",
        description: "Data Analyst specializing in turning raw data into actionable insights. Open to remote opportunities.",
        type: "website",
        locale: "en_US",
        siteName: "Patrick's Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "PATRICK — Data Analyst",
        description: "Data Analyst specializing in turning raw data into actionable insights. Open to remote opportunities.",
    },
    robots: {
        index: true,
        follow: true,
    },
    metadataBase: new URL('https://yourportfolio.com'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable} ${bebasNeue.variable}`}>
            <body className={`${inter.className} antialiased min-h-screen relative`} suppressHydrationWarning>
                {/* Global Backgrounds */}
                <div className="fixed inset-0 z-[-1] bg-grid pointer-events-none" aria-hidden="true" />


                <PageTransitionProvider>
                    <LoadingScreen />
                    <EnhancedCursor />
                    <SmoothScroll>
                        {children}
                    </SmoothScroll>
                </PageTransitionProvider>
            </body>
        </html>
    );
}
