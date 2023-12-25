
import { Poppins } from "next/font/google";

//import globals.css
import "@/app/globals.css";

//import components
import { Navbar } from "@/components/shared";
import { Theme } from "@/containers";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className="dark:bg-[#020617] h-screen">
        <Theme>
          <Navbar />

          {children}
        </Theme>
      </body>
    </html>
  );
}
