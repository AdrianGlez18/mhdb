import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/shared/Theme-provider";
import { RecoilRoot } from 'recoil'

const IBM = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#9f7aea' }
    }}>
      {/* <RecoilRoot> */}
        <html lang="en">
          <body className={cn("font-IBMPlex antialiased root overflow-x-hidden", IBM.variable)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <Header />
            <MobileNav /> */}
              {children}
            </ThemeProvider>
          </body>
        </html>
      {/* </RecoilRoot> */}
    </ClerkProvider>
  );
}
