import './globals.css'
import type { Metadata } from 'next'
import LayoutChildren from './layout_children'
import QueryProvider from 'lib/query-provider'

export const metadata: Metadata = {
  title: 'NAVI',
  description: '소아암 커뮤니티',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <LayoutChildren>
            {children}
          </LayoutChildren>
        </QueryProvider>
      </body>
    </html>
  )
}
