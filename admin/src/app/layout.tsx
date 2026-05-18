import "./globals.css";

export const metadata = {
  title: "NomNom Admin",
  description: "NomNom food delivery administration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
