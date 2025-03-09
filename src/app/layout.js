import "./globals.css";

export const metadata = {
  title: "UXIa Volume Control",
  description: "A useless volume control UI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
