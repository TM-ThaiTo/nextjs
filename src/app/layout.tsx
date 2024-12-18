import '@/style/style_css/global.css'
import ThemeContextProviders from "@/theme";
import { Inter } from "next/font/google";
import { Providers, authOptions } from "@/session";
import { getServerSession } from 'next-auth';
import { ClientLayout } from "@/components/layout/client-layout/clientLayout";
import { SocketProvider } from "@/utils/socket/socket.context";
import { SnackbarProvider } from '@/utils/snackbar/SnackbarContext';
import NextTopLoader from '@/components/next-load/NextTopLoader';
import { action_dataMyUser } from '@/actions/user/actions';
import { NavBarNoAuth } from '@/components/layout/no-auth.layout/nav-no-auth';
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <html lang='en'>
        <head>
          <link rel="icon" href="/static/Logo.png" type="image/png" />
          <meta name="description" content="Alex Trinh Social copyright by Trinh Minh Thai To" />
          <title>Alex Trinh Social</title>
        </head>
        <SnackbarProvider>
          <body className={`main-container`}>
            <NavBarNoAuth>
              {children}
            </NavBarNoAuth>
          </body>
        </SnackbarProvider>
      </html>
    );
  }

  const token = session?.backendTokens?.accessToken || ""
  const { data, error } = await action_dataMyUser();
  const user = data?.data;
  const { lang } = user || 'en';
  return (
    <html lang={lang}>
      <ThemeContextProviders user={user}>
        <SocketProvider token={token}>
          <SnackbarProvider>
            <Providers>
              <body >
                <NextTopLoader />
                <ClientLayout myUser={user} >
                  {children}
                </ClientLayout>
              </body>
            </Providers>
          </SnackbarProvider>
        </SocketProvider>
      </ThemeContextProviders>
    </html>
  );
}
