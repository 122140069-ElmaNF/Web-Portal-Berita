// app/layout.tsx
import './globals.css';
import Navbar from "../../components/Navbar";
import Providers from "../../components/Providers";
import ToastProvider from "../../components/ToastProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>News Portal</title>
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Navbar />
          <ToastProvider />
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
