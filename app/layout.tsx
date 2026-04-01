import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider, theme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - Admin Panel",
  description: "Responsive Admin Dashboard with Next.js and Ant Design",
};

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  // This is a client component wrapper for the server layout
  return <AntdRegistry>{children}</AntdRegistry>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeWrapper>
          <ConfigProvider
            theme={{
              algorithm: undefined, // Will be controlled by CSS classes
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 6,
                fontFamily: 'inherit',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}
