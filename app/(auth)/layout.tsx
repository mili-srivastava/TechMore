import { Poppins} from "next/font/google";

const metadata = {
  title: "TechMore",
  description:
    "TechMore is a blog application for developers and tech enthusiasts.",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight:["400","500","600","700","800","900"],
  variable: "--font-poppins",
});

import "@/app/globals.css";

import { Theme } from "@/containers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"  className={poppins.variable}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="dark:bg-[#020617] h-screen">
      <Theme>{children}</Theme>
        </body>
    </html>
  );
}
