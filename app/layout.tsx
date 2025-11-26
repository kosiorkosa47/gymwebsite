import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'APEX FITNESS - Transform Your Body',
  description: 'Premium fitness center with personal training, group classes, and modern equipment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  )
}
