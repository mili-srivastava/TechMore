
import { Poppins } from "next/font/google";

//import globals.css
import "@/app/globals.css";

//import components

import { Theme } from "@/containers";
const metaDatas = {
  title: "Techie",
  description:
    "Techie is a blogging platform for developers to share their knowledge and connect with other developers.",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-poppins",
});

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content={metaDatas.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metaDatas.title}</title>
      </head>
      <body className="dark:bg-[#020617] h-screen">
        <Theme>
          

          {children}
        </Theme>
      </body>
    </html>
  );
}
