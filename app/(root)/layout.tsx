//import components
import { Navbar } from "@/components/shared";
import { Theme } from "@/containers";

//import styles
import "@/app/globals.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-[#020617] h-screen">
        <Theme>
          <Navbar />

          {children}
        </Theme>
      </body>
    </html>
  );
}
