
import { Theme } from "@/containers";

//import styles
import "@/app/globals.css";

export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-[#020617] h-screen">
        <Theme>
          

          {children}
        </Theme>
      </body>
    </html>
  );
}
