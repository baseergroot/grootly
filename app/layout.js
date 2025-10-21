
import "./globals.css";
import 'remixicon/fonts/remixicon.css'

export const metadata = {
  title: "Grootly",
  description: "Generate Short Link",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
