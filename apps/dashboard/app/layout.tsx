import "./globals.css";
import { ReduxProvider } from "./providers/redux-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-transparent text-inherit ">
        <ReduxProvider>
          <main id="main-content">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
