

const metadata = {
  title: "TechMore",
  description:
    "TechMore is a blog application for developers and tech enthusiasts.",
};

import "@/app/globals.css";

import { Theme } from "@/containers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
