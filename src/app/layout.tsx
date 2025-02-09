import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Header from "~/components/header";
import Sidebar from "~/components/sidebar";
import { Separator } from "~/components/ui/separator";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "fis manage",
  description: "manage content",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} light`}>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex grow flex-row items-stretch">
              <Sidebar />
              <div>
                <Separator orientation="vertical" />
              </div>
              <main className="w-full">{children}</main>
            </div>
          </div>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
