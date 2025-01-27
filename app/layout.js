import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* MainHeader is used to give each page the same header, which is why it comes before {children}
        because {children} will contain the page
        */}
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
